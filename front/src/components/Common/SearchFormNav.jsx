import React from 'react';
import { FaUnlock } from 'react-icons/fa';
import { FaUser, FaUserPlus } from 'react-icons/fa6';
import styled from 'styled-components';

const SearchFormNav = () => {
  return (
    <>
      <FormNav>
        <Nav1 onClick={() => navigator('/findid')}>
          <UserIcon />
          아이디 찾기
        </Nav1>
        <Nav1 onClick={() => navigator('/')}>
          <LockIcon />
          비밀번호 찾기
        </Nav1>
      </FormNav>
    </>
  );
};

const FormNav = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
  width: 100%;
  height: 83px;
`;

const Nav1 = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
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

const EnrollIcon = styled(FaUserPlus)`
  width: 20px;
  height: 20px;
  margin: ${({ theme }) => theme.spacing[2]};
`;
export default SearchFormNav;
