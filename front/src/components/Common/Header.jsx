import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/KinderBridge.png';
import userProfile from '../../assets/img/userProfile.png';
import { IoCallOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../store/loginStore';

const Header = () => {
  //헤더 정보
  const { member } = useLoginStore();
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

  //로그아웃
  const logout = useLoginStore((state) => state.logout);
  const handleLogout = () => {
    navigate('/');
    setTimeout(() => {
      logout();
    }, 500);
  };

  return (
    <HeaderContainer>
      <HeaderLeftBox>
        {/* 로그인한 사람 role 기준으로 url 바뀌기 */}
        <Logo src={logo} alt="KinderBridge" onClick={() => navigate('/parent/main')} />
        <LinearBar></LinearBar>
        <IoCallOutline />
        <p>{centerTel}</p>
      </HeaderLeftBox>
      <HeaderRightBox>
        {type === '교사' && (
          <AttendanceBox>
            <AttendanceButton>출근</AttendanceButton>
          </AttendanceBox>
        )}
        <UserProfile ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
          <Img src={userProfile} alt="사용자 프로필" />
          <UserNameAndRole>
            <p>{name}</p>
            <p>{type}</p>
          </UserNameAndRole>
          {isOpen && (
            <Dropdown>
              <DropdownItem onClick={() => navigate('/manager/mypage')}>마이페이지</DropdownItem>
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
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Img = styled.img`
  cursor: pointer;
`;

const AttendanceBox = styled.div`
  border: 1px solid black;
  margin: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AttendanceButton = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  width: 50px;
  border-radius: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
`;

export default Header;
