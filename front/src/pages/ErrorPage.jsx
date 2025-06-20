import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/img/namanupsugoyangi.jpeg';

const ErrorPage = () => {
  const navigator = useNavigate();
  return (
    <>
      <Outline>
        <Div>
          <Img src={img} alt="나만없어고양이" />
          <h2>잘못오셨습니다. 돌아가주세요.</h2>
        </Div>
        <BackButton onClick={() => navigator(-1)}>돌아가기</BackButton>
      </Outline>
    </>
  );
};

const Outline = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  min-height: 500px;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
`;

const BackButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export default ErrorPage;
