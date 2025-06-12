import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';
import CommonFind from './components/Common/CommonFind';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Common/Layout';
import Home from './pages/Home';
import SearchId from './pages/common/SearchId';

import UserTypeSelect from './pages/common/signup/UserTypeSelect';
import TermsAgreement from './pages/common/signup/TermsAgreement';
import SignUpBasicInfo from './pages/common/signup/SignUpBasicInfo';

import ChildrenList from './components/ChildrenList';

import SignUpWorkSpaceInfo from './pages/common/signup/SignUpWorkSpaceInfo';
import SignUpComplete from './pages/common/signup/SignUpComplete';
import SignUpChildInfo from './pages/common/signup/SignUpChildInfo';
import SignUpCenterInfo from './pages/common/signup/SignUpCenterInfo';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Main Page */}
            <Route path="/home" element={<Home />} />
            {/* <Route path="/" element={<Home />} /> */}
            {/* 추가 페이지는 아래 붙이기. */}
          </Route>
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />}></Route>

          {/* 회원가입 권한 선택 */}
          <Route path="/signup/userselect" element={<UserTypeSelect />} />
          {/* 회원가입 약관 동의 */}
          <Route path="/signup/terms" element={<TermsAgreement />} />
          {/* 회원가입 기본 정보 입력 */}
          <Route path="/signup/info" element={<SignUpBasicInfo />} />
          <Route path="/signup/teacher" element={<SignUpWorkSpaceInfo />} />
          <Route path="/signup/complete" element={<SignUpComplete />} />
          <Route path="/signup/parent" element={<SignUpChildInfo />} />
          <Route path="/signup/center" element={<SignUpCenterInfo />} />
          {/* Regist Page */}
          <Route path="/regist" element={<Home />}></Route>
          {/* Find ID Page */}
          <Route path="/" element={<SearchId />}></Route>
          {/* Find Password Page */}
          <Route path="/findpwd" element={<Home />}></Route>
          {/* Find Password Page */}
          <Route path="/list" element={<ChildrenList />}></Route>
          {/* 404 Not Found */}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
