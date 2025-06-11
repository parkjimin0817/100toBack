import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainWrapper>
        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
        <ContentWrapper>
          <ContentInner>{children}</ContentInner>
        </ContentWrapper>
      </MainWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
};

const Content = styled.main`
  min-height: calc(100vh - 68px);
  display: flex;
  min-width: 1440px;
  margin: auto;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const HeaderWrapper = styled.header`
  width: 100%;
  min-width: 320px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const FooterWrapper = styled.footer`
  width: 100%;
  min-width: 320px;
  background-color: #ffffff;
  margin-top: auto;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
`;

const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
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
  /* width: 240px;
  min-width: 240px; */
  margin-right: 24px;
`;

const ContentWrapper = styled.section`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
`;

const ContentInner = styled.div`
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-height: 600px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export default Layout;
