import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import SideBar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useLoginStore from '../../store/loginStore';

const Layout = () => {
  const { member } = useLoginStore();
  const type = member?.memberType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!member) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/'); // 로그인 페이지 경로는 실제 프로젝트에 맞게 수정
    }
  }, [member]);

  // member가 없을 경우에는 아무것도 렌더링하지 않도록 early return
  if (!member) return null;

  return (
    <>
      <HeaderWrapper>
        <Header member={member} />
      </HeaderWrapper>

      <MainWrapper>
        <SideBarWrapper>
          <SideBar type={type} />
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
