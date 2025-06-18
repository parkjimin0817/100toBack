import React from 'react';
import styled from 'styled-components';
import StressInputBar from './StressInputBar';

const MyHealthDetailCard = ({ label, value }) => {
  return (
    <Box>
      <Info>
        <Label>{label}</Label>
        {label === '스트레스 지수' ? <StressInputBar value={value} disabled /> : <Value>{value}</Value>}
      </Info>
    </Box>
  );
};

export default MyHealthDetailCard;

const Box = styled.div`
  width: 90%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  width: 80%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  position: relative;

  &::after {
    content: ':';
    position: absolute;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
