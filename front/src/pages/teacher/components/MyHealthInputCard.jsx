import React from 'react';
import styled from 'styled-components';

const MyHealthInputCard = ({ text, label, name, value, onChange, type = 'text', unit }) => {
  return (
    <>
      <Text>{text}</Text>
      <Box>
        <Info>
          <Label>{label}</Label>
          <InputWrapper>
            <Value type={type} name={name} value={value} onChange={onChange} />
            <Unit>{unit}</Unit>
          </InputWrapper>
        </Info>
      </Box>
    </>
  );
};

export default MyHealthInputCard;

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

const Text = styled.span`
  display: flex;
  width: 90%;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
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

const Value = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  width: 100px;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  padding: 5px;
`;

const InputWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const Unit = styled.span`
  width: 30px;
  margin-left: 10px;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
