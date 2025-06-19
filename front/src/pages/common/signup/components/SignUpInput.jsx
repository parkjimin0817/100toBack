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
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[3]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;
