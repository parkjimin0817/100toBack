import React from 'react';
import styled from 'styled-components';

const ParentInfoInput = () => {
  return (
    <InputWrapper>
      <Label>부모 정보</Label>
      <InputRow>
        <Text>부 이름 : </Text>
        <InputName type="text" placeholder="이름" />
        <Text>부 연락처 : </Text>
        <InputPhone type="text" placeholder="'-' 제외 11자리 연락처" />
      </InputRow>
      <InputRow>
        <Text>모 이름 : </Text>
        <InputName type="text" placeholder="이름" />
        <Text>모 연락처 : </Text>
        <InputPhone type="text" placeholder="'-' 제외 11자리 연락처" />
      </InputRow>
    </InputWrapper>
  );
};

export default ParentInfoInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0 10px 0;
`;

const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputRow = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputName = styled.input`
  width: 100px;
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

const InputPhone = styled.input`
  width: 180px;
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
