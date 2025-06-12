import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';
import Home from './pages/Home';
import UserTypeSelect from './pages/common/signup/UserTypeSelect';
import TermsAgreement from './pages/common/signup/TermsAgreement';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup/userselect" element={<UserTypeSelect />} />
            <Route path="/signup/terms" element={<TermsAgreement />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
