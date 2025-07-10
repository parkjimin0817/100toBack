import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/KinderBridge.png';
import userProfile from '../../assets/defaultimg.png';
import { IoCallOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../store/loginStore';
import AttendanceButton from './AttendanceButton';
import useAttendanceStore from '../../store/attendanceStore';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOut = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, []);

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
        {type === '교사' && <AttendanceButton member={member} />}
        <UserProfile ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
          <Img
            src={member.memberProfile ? `${CLOUDFRONT_URL}/${member.memberProfile}` : userProfile}
            alt="사용자 프로필"
          />
          <UserNameAndRole>
            <p>{name}</p>
            <p>{type}</p>
          </UserNameAndRole>
          {isOpen && (
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

export default Header;
