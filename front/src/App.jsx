import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchId from './pages/SearchId';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<SearchId />} />
        </Routes>
        {/* <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
