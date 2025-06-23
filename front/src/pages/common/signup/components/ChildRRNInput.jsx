import React from 'react';
import styled from 'styled-components';

const ChildRRNInput = ({ label, register, errors }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputRow>
        <Input type="text" inputMode="numeric" maxLength={6} placeholder="200101" {...register('childRRNFront')} />
        <Text>-</Text>
        <Input type="password" inputMode="numeric" maxLength={7} placeholder="•••••••" {...register('childRRNBack')} />
      </InputRow>
      {(errors.childRRNFront || errors.childRRNBack) && (
        <ErrorMessage>
          {errors.childRRNFront?.message} <br /> {errors.childRRNBack?.message}
        </ErrorMessage>
      )}
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

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-left: ${({ theme }) => theme.spacing[1]};
  text-align: left;
`;
