import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/KinderBridge.png';
import userProfile from '../../assets/img/userProfile.png';
import { IoCallOutline } from 'react-icons/io5';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLeftBox>
        <Logo src={logo} alt="KinderBridge" />
        <LinearBar></LinearBar>
        <IoCallOutline />
        <p>1544-9970</p>
      </HeaderLeftBox>
      <HeaderRightBox>
        <UserProfile>
          <img src={userProfile} alt="사용자 프로필" />
          <UserNameAndRole>
            <p>정형일</p>
            <p>교사</p>
          </UserNameAndRole>
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

const HeaderRightBox = styled.div``;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserNameAndRole = styled.div`
  text-align: start;
  margin-left: 10px;
`;

export default Header;
