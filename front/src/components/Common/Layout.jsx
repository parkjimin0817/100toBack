import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Layout = () => {
  const [role, setRole] = useState('teacher');
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <MainWrapper>
        <SideBarWrapper>
          <RoleButtons>
            <button onClick={() => setRole('teacher')}>교사</button>
            <button onClick={() => setRole('manager')}>시설장</button>
            <button onClick={() => setRole('parent')}>학부모</button>
          </RoleButtons>
          <SideBar role={role} />
        </SideBarWrapper>

        <ContentWrapper>
          <ContentInner>
            <Outlet />
          </ContentInner>
        </ContentWrapper>
      </MainWrapper>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
};
const HeaderWrapper = styled.header`
  width: 100%;
  min-width: 320px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  min-width: 320px;
  background-color: #ffffff;
  margin-top: auto;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
`;

const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* max-width: 1200px; */
  width: 100%;
  min-height: calc(100vh - 136px); // 헤더 68px + 푸터 68px 기준
  background-color: #f8f8f8;
  padding: 20px 0px 20px 15px;
  box-sizing: border-box;
  margin: auto;

  /* @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  } */
`;

const SideBarWrapper = styled.aside`
  width: 120px;
  /* min-width: 240px; */
  margin-right: 24px;
`;

const ContentWrapper = styled.section`
  flex: 1;
  max-width: 1050px;
  width: 100%;
  box-sizing: border-box;
`;

const ContentInner = styled.div`
  /* background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-height: 600px; */

  @media (max-width: 768px) {
    /* padding: 16px; */
  }
`;

export default Layout;

const RoleButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;

  button {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
