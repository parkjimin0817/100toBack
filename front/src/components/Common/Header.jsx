import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/KinderBridge.png';
import userProfile from '../../assets/defaultimg.png';
import { IoCallOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../store/loginStore';
import AttendanceButton from './AttendanceButton';
import useAttendanceStore from '../../store/attendanceStore';
import { GoBell } from 'react-icons/go';
import { alarmService } from '../../api/alarm';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const Header = ({ member }) => {
  //헤더 정보
  const name = member?.memberName;
  let type = '';
  if (member?.memberType === 'TEACHER') {
    type = '교사';
  } else if (member?.memberType === 'MANAGER') {
    type = '시설장';
  } else {
    type = '학부모';
  }
  const centerTel = member?.centerTel;

  //드롭다운 (마이페이지, 로그아웃)
  const [dropdownType, setDropdownType] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOut = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (e.target.closest('.alarm-dropdown')) return;
        setDropdownType(null);
      }
    };
    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, []);

  const handleDropdownToggle = (type) => {
    setDropdownType((prev) => (prev === type ? null : type));
  };

  const navigate = useNavigate();

  //타입에 따라 다른 마이페이지 이동
  const handleMyPage = () => {
    if (type === '교사') {
      navigate('/teacher/mypage');
    } else if (type === '시설장') {
      navigate('/manager/mypage');
    } else {
      navigate('/parent/mypage');
    }
  };

  //타입에 따라 다른 메인페이지 이동
  const handleMainPage = () => {
    if (type === '교사') {
      navigate('/teacher/main');
    } else if (type === '시설장') {
      navigate('/manager/main');
    } else {
      navigate('/parent/main');
    }
  };

  //로그아웃
  const logout = useLoginStore((state) => state.logout);
  const resetAttendance = useAttendanceStore((state) => state.resetAttendance);
  const handleLogout = () => {
    navigate('/');
    setTimeout(() => {
      logout();
      resetAttendance();
    }, 500);
  };

  //알람 불러오기
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    if (member) {
      alarmService
        .getAlarms()
        .then((data) => setAlarms(data))
        .catch((err) => console.error('알람 불러오기 실패', err));
    }
  }, [member]);

  const alarmCount = alarms.length;

  //알람 눌렀을 때 이동
  const handleAlarmClick = (alarm) => {
    console.log('눌린 알람:', alarm);
    if (!alarm.url) return;
    navigate(alarm.url);
    setDropdownType(null);
  };

  return (
    <HeaderContainer>
      <HeaderLeftBox>
        {/* 로그인한 사람 role 기준으로 url 바뀌기 */}
        <Logo src={logo} alt="KinderBridge" onClick={handleMainPage} />
        <LinearBar></LinearBar>
        <IoCallOutline />
        <p>{centerTel}</p>
      </HeaderLeftBox>
      <HeaderRightBox>
        <AlarmBox>
          <AlarmIconWrapper>
            <AlarmIcon size={23} ref={dropdownRef} onClick={() => handleDropdownToggle('alarm')} />
            {alarmCount > 0 && <AlarmBadge>{alarmCount}</AlarmBadge>}
          </AlarmIconWrapper>
          {dropdownType === 'alarm' && (
            <AlarmDropDown className="alarm-dropdown">
              {alarms.length === 0 ? (
                <EmptyMessage>알림이 없습니다.</EmptyMessage>
              ) : (
                alarms.map((a) => (
                  <AlarmItem key={a.alarm_no} onClick={() => handleAlarmClick(a)}>
                    <AlarmText>{a.content}</AlarmText>
                    <AlarmTime>
                      {formatDistanceToNow(new Date(a.created_at), { addSuffix: true, locale: ko })}
                    </AlarmTime>
                  </AlarmItem>
                ))
              )}
            </AlarmDropDown>
          )}
        </AlarmBox>
        {type === '교사' && <AttendanceButton member={member} />}
        <UserProfile ref={dropdownRef} onClick={() => handleDropdownToggle('user')}>
          <Img
            src={member.memberProfile ? `${CLOUDFRONT_URL}/${member.memberProfile}` : userProfile}
            alt="사용자 프로필"
          />
          <UserNameAndRole>
            <p>{name}</p>
            <p>{type}</p>
          </UserNameAndRole>
          {dropdownType === 'user' && (
            <Dropdown>
              <DropdownItem onClick={handleMyPage}>마이페이지</DropdownItem>
              <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
            </Dropdown>
          )}
        </UserProfile>
      </HeaderRightBox>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeftBox = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
`;

const Logo = styled.img`
  cursor: pointer;
`;

const LinearBar = styled.div`
  height: 40px;
  width: 1px;
  border: solid 1px black;
  margin-left: 70px;
  margin-right: 40px;
`;

const HeaderRightBox = styled.div`
  display: flex;
`;

const AlarmBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
  position: relative;
`;

const AlarmIcon = styled(GoBell)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const UserNameAndRole = styled.div`
  text-align: start;
  margin-left: 10px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 120px;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Img = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const AlarmDropDown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
  width: 350px;
  max-height: 200px;
  overflow-y: auto;
`;

const AlarmItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const AlarmText = styled.div`
  font-size: 14px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray[800]};
  white-space: normal; // 줄바꿈 허용
  word-break: break-word; // 단어 기준으로 줄바꿈
  line-height: 1.2; // 줄 간격 좀 더 보기 좋게
`;

const AlarmTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[400]};
  line-height: 1.2; // 줄 간격 좀 더 보기 좋게
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const AlarmIconWrapper = styled.div`
  position: relative;
`;

const AlarmBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: red;
  border: 2px solid white;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;
