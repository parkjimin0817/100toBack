import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';
import CommonFind from './components/CommonFind';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';
import Home from './pages/Home';
import ChildrenList from './components/ChildrenList';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Main Page */}
            <Route path="/" element={<Home />} />
            {/* 추가 페이지는 아래 붙이기. */}
          </Route>
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />}></Route>
          {/* Regist Page */}
          <Route path="/regist" element={<Home />}></Route>
          {/* Find ID Page */}
          <Route path="/findid" element={<Home />}></Route>
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
