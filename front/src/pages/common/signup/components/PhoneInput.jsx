import React from 'react';
import styled from 'styled-components';

const PhoneInputWithButton = ({ label, placeholder, onClick }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputRow>
        <Input type="text" placeholder={placeholder} />
        <Button type="button" onClick={onClick}>
          인증 요청
        </Button>
      </InputRow>
    </InputWrapper>
  );
};

export default PhoneInputWithButton;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 10px;
  padding-right: 100px;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const Button = styled.button`
  position: absolute;
  right: 8px;
  height: 30px;
  padding: 0 12px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;
