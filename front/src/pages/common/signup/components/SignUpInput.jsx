import React from 'react';
import styled from 'styled-components';

const SignUpInput = ({ type, label, description }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <Input type={type} placeholder={description} />
    </InputWrapper>
  );
};

export default SignUpInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0 0;
`;

const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 10px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;
