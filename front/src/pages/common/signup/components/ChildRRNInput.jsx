import React from 'react';
import styled from 'styled-components';

const ChildRRNInput = ({ label }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputRow>
        <Input type="text" placeholder="200101" />
        <Text>-</Text>
        <Input type="password" placeholder="•••••••" />
      </InputRow>
    </InputWrapper>
  );
};

export default ChildRRNInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0 10px 0;
`;
const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray[400]};
`;
const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Input = styled.input`
  width: 180px;
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
