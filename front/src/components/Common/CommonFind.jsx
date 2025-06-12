import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/img/logo.png';

const CommonFind = () => {
  return (
    <Container>
      <Image src={Logo} alt="로고" />
    </Container>
  );
};

export default CommonFind;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단 정렬 */
  max-width: 1440px;
  max-height: 1024px;
  width: 100%;
  margin: 0 auto;
  padding-top: 0;
  flex-grow: 0;
`;

const Image = styled.img`
  margin-bottom: 50px;
`;

