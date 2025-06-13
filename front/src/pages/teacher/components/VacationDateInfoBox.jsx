import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const VacationDateInfoBox = () => {
  const [data, setData] = useState({
    usedDays: 0,
    remainDays: 0,
    leaveDays: 0,
  });

  useEffect(() => {
    const mockVacationData = {
      usedDays: 5,
      remainDays: 10,
      leaveDays: 15,
    };
    setData(mockVacationData);
  }, []);

  return (
    <Box>
      <Title>사용한 연차</Title>
      <TextRow>
        <Content>{data.usedDays}</Content>
        <Text>&ensp;일</Text>
      </TextRow>
      <Title>남은 연차</Title>
      <TextRow>
        <Content>{data.remainDays}</Content>
        <Text>&ensp;일</Text>
      </TextRow>
      <Title>총 연차</Title>
      <TextRow>
        <Content>{data.leaveDays}</Content>
        <Text>&ensp;일</Text>
      </TextRow>
    </Box>
  );
};

export default VacationDateInfoBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  margin: 10px;
  padding: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const TextRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
