import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Common/Layout';
import Home from './pages/Home';
import SearchId from './pages/common/SearchId';
import SeachIdSuccss from './pages/common/SeachIdSuccss';

import UserTypeSelect from './pages/common/signup/UserTypeSelect';
import TermsAgreement from './pages/common/signup/TermsAgreement';
import SignUpBasicInfo from './pages/common/signup/SignUpBasicInfo';

import ChildrenList from './components/ChildrenList';

import SignUpWorkSpaceInfo from './pages/common/signup/SignUpWorkSpaceInfo';
import SignUpComplete from './pages/common/signup/SignUpComplete';

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
          <Route path="/signup/step2" element={<SignUpBasicInfo />} />
          <Route path="/signup/step3" element={<SignUpWorkSpaceInfo />} />
          <Route path="/signup/complete" element={<SignUpComplete />} />
          {/* Regist Page */}
          <Route path="/regist" element={<Home />}></Route>
          {/* Find ID Page */}
          <Route path="/findid" element={<SearchId />}></Route>
          {/* Find ID Success Page */}
          <Route path="/findidsuccess" element={<SeachIdSuccss />}></Route>
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
