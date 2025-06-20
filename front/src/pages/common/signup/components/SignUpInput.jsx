import React from 'react';
import styled from 'styled-components';

const SignUpInput = ({ type, label, description, showCheckButton, onClickCheck, error, ...rest }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputBox>
        <Input type={type} placeholder={description} $error={error} {...rest} />
        {showCheckButton && (
          <CheckButton type="button" onClick={onClickCheck}>
            중복확인
          </CheckButton>
        )}
      </InputBox>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 80px;
  margin: 10px 0 0;
`;

const Label = styled.label`
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputBox = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[3]};
  padding-right: 90px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const CheckButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 26px;
  padding: 0 10px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
  text-align: left;
`;
