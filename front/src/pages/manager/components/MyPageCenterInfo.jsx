import React, { useState } from 'react';
import styled from 'styled-components';

const infodata = {
  centerName: 'KH유치원',
  centerPhone: '010-1234-2323',
  address: '서울 강남구 테헤란로14길 6 남도빌딩 2층',
  type: '유치원',
};

const MyPageCenterInfo = ({ isEditMode }) => {
  const [data, setData] = useState(infodata);
  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const openAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 API 로드 안 됨!');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (dataFromApi) => {
        setData((prev) => ({ ...prev, address: dataFromApi.address }));
      },
    }).open();
  };

  return (
    <Wrapper>
      <InfoRow>
        <InfoType>시설명 </InfoType>
        <Info>
          {isEditMode ? (
            <InfoInput value={data.centerName} onChange={(e) => handleChange('centerName', e.target.value)} />
          ) : (
            data.centerName
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>연락처</InfoType>
        <Info>
          {isEditMode ? (
            <InfoInput value={data.centerPhone} onChange={(e) => handleChange('centerPhone', e.target.value)} />
          ) : (
            data.centerPhone
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>주소</InfoType>
        <Info>
          {isEditMode ? (
            <>
              <AddressInput value={data.address} placeholder="주소를 검색해주세요" />
              <SearchButton onClick={openAddressSearch}>주소 검색</SearchButton>
            </>
          ) : (
            data.address || '-'
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>유형</InfoType>
        <Info>
          {isEditMode ? (
            <Select value={data.type} onChange={(e) => handleChange('type', e.target.value)}>
              <option value="어린이집">어린이집</option>
              <option value="유치원">유치원</option>
              <option value="지역아동센터">지역아동센터</option>
              <option value="돌봄교실">돌봄교실</option>
              <option value="놀이방">놀이방</option>
              <option value="기타">기타</option>
            </Select>
          ) : (
            data.type
          )}
        </Info>
      </InfoRow>
    </Wrapper>
  );
};

export default MyPageCenterInfo;

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
  width: 200px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;
