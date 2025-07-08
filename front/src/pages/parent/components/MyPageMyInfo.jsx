import React, { useState } from 'react';
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

  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (dataFromApi) => {
        handleChange('address', dataFromApi.address);
      },
    }).open();
  };

  return (
    <Wrapper>
      <InfoRow>
        <InfoType>이름 </InfoType>
        <Info>
          {isEditable ? (
            <InfoInput value={info.memberName} onChange={(e) => handleChange('memberName', e.target.value)} />
          ) : (
            info.memberName
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>생년월일</InfoType>
        <Info>
          {isEditable ? (
            <InfoInput
              type="date"
              value={info.memberBirth}
              onChange={(e) => handleChange('memberBirth', e.target.value)}
            />
          ) : (
            info.memberBirth
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>주소</InfoType>
        <Info>
          {isEditable ? (
            <>
              <AddressInput value={info.address} placeholder="주소를 검색해주세요" readOnly />
              <SearchButton onClick={openAddressSearch}>주소 검색</SearchButton>
            </>
          ) : (
            info.address || '-'
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>연락처</InfoType>
        <Info>
          {isEditable ? (
            <InfoInput value={info.memberPhone} onChange={(e) => handleChange('memberPhone', e.target.value)} />
          ) : (
            info.memberPhone
          )}
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

const AddressInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 8px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const SearchButton = styled.button`
  margin-left: 10px;
  height: 30px;
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;
