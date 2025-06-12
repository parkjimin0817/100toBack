import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';
import CommonFind from './components/Common/CommonFind';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchId from './pages/common/SearchId';
import ChildrenList from './components/ChildrenList';
import SearchFormNav from './components/Common/SearchFormNav';
import SearchPassword from './pages/common/SearchPassword';
import AuthenticationUser from './pages/common/AuthenticationUser';
import ChangePassword from './pages/common/ChangePassword'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Main Page */}
            {/* <Route path="/" element={<Home />} /> */}
            {/* 추가 페이지는 아래 붙이기. */}
          </Route>
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />}></Route>
          {/* Regist Page */}
          <Route path="/regist" element={<Home />}></Route>
          {/* Find ID Page */}
          <Route path="/" element={<SearchId />}></Route>
          {/* Find Password Page */}
          <Route path="/findpwd" element={<SearchPassword />}></Route>
          {/* Find Password Page -처음으로 나오는 비밀번호 찾기 페이지*/}
          <Route path="/authenticationuser" element={<AuthenticationUser />}></Route>
          {/* authenticationuser -비밀번호 찾기 사용자인증 페이지  */}
          <Route path="/changepwd" element={<ChangePassword />}></Route>
          {/* Change Password Page - 비밀번호 재설정 페이지 */}
          <Route path="/list" element={<ChildrenList />}></Route>
          {/* 404 Not Found */}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
