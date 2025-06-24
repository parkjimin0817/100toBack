import React, { useState } from 'react';
import { FaUnlock } from 'react-icons/fa';
import { FaUser, FaUserPlus } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchFormNav = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const isIdPage = location.pathname === '/findid';
  const isPwdPage = location.pathname === '/findpwd';

  const handleChange = (e) => {
    const { id } = e.target;
    if (id === 'firstCheck') {
      navigator('/findid');
    } else if (id === 'secondCheck') {
      navigator('/findpwd');
    }
  };

  return (
    <>
      <FormNav>
        <Nav1 id="firstCheck" onClick={handleChange} $active={isIdPage}>
          <UserIcon />
          아이디 찾기
        </Nav1>
        <Nav2 id="secondCheck" onClick={handleChange} $active={isPwdPage}>
          <LockIcon />
          비밀번호 찾기
        </Nav2>
      </FormNav>
    </>
  );
};

const FormNav = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  width: 100%;
  height: 83px;
`;

const Nav1 = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;

  border-radius: ${({ theme }) => theme.borderRadius.lg} 0 0 0;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.lightblue : theme.colors.white)};

  &:hover {
    border-radius: ${({ theme }) => theme.borderRadius.lg} 0 0 0;
    cursor: pointer;
  }
`;

const Nav2 = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 0 ${({ theme }) => theme.borderRadius.lg} 0 0;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.lightblue : theme.colors.white)};

  &:hover {
    border-radius: 0 ${({ theme }) => theme.borderRadius.lg} 0 0;
    cursor: pointer;
  }
`;

const UserIcon = styled(FaUser)`
  width: 20px;
  height: 20px;
  margin: ${({ theme }) => theme.spacing[2]};
`;

const LockIcon = styled(FaUnlock)`
  width: 20px;
  height: 20px;
  margin: ${({ theme }) => theme.spacing[2]};
`;

export default SearchFormNav;
