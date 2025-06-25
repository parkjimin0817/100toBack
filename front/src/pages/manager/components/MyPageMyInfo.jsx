import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MyPageMyInfo = ({ info, onChange, isEditable }) => {
  const handleChange = (field, value) => {
    if (!isEditable) return;
    onChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  if (!info) return null;

  return (
    <Wrapper>
      <InfoRow>
        <InfoType>이름</InfoType>
        <Info>
          <InfoInput
            value={info.memberName}
            onChange={(e) => handleChange('memberName', e.target.value)}
            disabled={!isEditable}
          />
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>생년월일</InfoType>
        <Info>
          <InfoInput
            type="date"
            value={info.memberBirth}
            onChange={(e) => handleChange('memberBirth', e.target.value)}
            disabled={!isEditable}
          />
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>직위</InfoType>
        <Info>
          {info.memberType === 'TEACHER' ? '교사' : info.memberType === 'MANAGER' ? '시설장' : info.memberType}
        </Info>
      </InfoRow>
    </Wrapper>
  );
};

export default MyPageMyInfo;

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const InfoType = styled.div`
  width: 100px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  position: relative;
  text-align: left;

  &::after {
    content: '|';
    position: absolute;
    right: 0;
    margin-left: 10px;
    margin-right: 10px;
  }
`;
const Info = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const InfoInput = styled.input`
  width: 180px;
  height: 30px;
  border-radius: 8px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;
