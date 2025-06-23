import React from 'react';
import styled from 'styled-components';

const formatPhoneNumber = (value = '') => {
  const onlyNums = value.replace(/\D/g, '');

  // 서울지역 번호 (02)일 때
  if (onlyNums.startsWith('02')) {
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 5) return onlyNums.replace(/(\d{2})(\d{1,3})/, '$1-$2');
    return onlyNums.replace(/(\d{2})(\d{3,4})(\d{0,4})/, '$1-$2-$3');
  }

  // 나머지 지역번호 (031, 051, 042 등 3자리 지역번호 또는 휴대폰 번호)
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7) return onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  return onlyNums.replace(/(\d{3})(\d{3,4})(\d{0,4})/, '$1-$2-$3');
};

const CenterPhoneInput = ({ label, value, onChange, error }) => {
  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (onChange) {
      onChange(formatted);
    }
  };
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputRow>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={13}
          placeholder="예: 02-123-4567 또는 010-1234-5678"
        />
      </InputRow>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default CenterPhoneInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
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
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[3]};
  padding-right: ${({ theme }) => theme.spacing[24]};
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const Button = styled.button`
  position: absolute;
  right: 8px;
  height: 30px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
  text-align: left;
`;
