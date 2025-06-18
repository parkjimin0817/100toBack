import React from 'react';
import styled from 'styled-components';

const CenterTypeSelect = () => {
  return (
    <Wrapper>
      <Label>시설유형</Label>
      <SelectCenter>
        <option value="">선택해주세요</option>
        <option value="">어린이집</option>
        <option value="">유치원</option>
        <option value="">지역아동센터</option>
        <option value="">돌봄교실</option>
        <option value="">놀이방</option>
        <option value="">기타</option>
      </SelectCenter>
    </Wrapper>
  );
};

export default CenterTypeSelect;

const Wrapper = styled.div`
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

const SelectCenter = styled.select`
  width: 400px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
