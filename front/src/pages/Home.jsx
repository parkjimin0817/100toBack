import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/Common/ContentHeader';

const Home = () => {
  return (
    <Content>
      <ContentHeader
        Title={'HOME'}
        Color={'lightblue'}
        ButtonProps={[
          { Title: '뒤로가기', func: () => alert('뒤로가기~') },
          { Title: '앞으로가기', func: () => alert('앞으로가기~') },
        ]}
      ></ContentHeader>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
`;

export default Home;
