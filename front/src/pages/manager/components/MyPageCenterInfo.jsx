import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginStore } from '../../../store/loginStore';
import { centerservice } from '../../../api/center';

const MyPageCenterInfo = ({ centerInfo, onChange, isEditable }) => {
  const { member } = useLoginStore();
  const [data, setData] = useState(centerInfo);

  const typeLabelMap = {
    DAYCARE: '어린이집',
    KINDERGARTEN: '유치원',
    CHILD_CENTER: '지역아동센터',
    ETC: '기타',
  };

  const handleChange = (key, value) => {
    if (!isEditable) return;
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  const fetchCenterInfo = async () => {
    try {
      const result = await centerservice.getCenterDetail(member.centerNo);
      setData(result);
    } catch (error) {
      console.error('센터 정보 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchCenterInfo();
  }, []);

  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (dataFromApi) => {
        handleChange('centerAddress', dataFromApi.address);
      },
    }).open();
  };

  if (!data) return null;

  return (
    <Wrapper>
      <InfoRow>
        <InfoType>시설명 </InfoType>
        <Info>
          {isEditable ? (
            <InfoInput value={data.centerName} onChange={(e) => handleChange('centerName', e.target.value)} />
          ) : (
            data.centerName
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>연락처</InfoType>
        <Info>
          {isEditable ? (
            <InfoInput value={data.centerTel} onChange={(e) => handleChange('centerTel', e.target.value)} />
          ) : (
            data.centerTel
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>주소</InfoType>
        <Info>
          {isEditable ? (
            <>
              <AddressInput value={data.centerAddress} placeholder="주소를 검색해주세요" readOnly />
              <SearchButton onClick={openAddressSearch}>주소 검색</SearchButton>
            </>
          ) : (
            data.centerAddress || '-'
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>유형</InfoType>
        <Info>
          {isEditable ? (
            <Select value={data.centerType} onChange={(e) => handleChange('centerType', e.target.value)}>
              <option value="DAYCARE">어린이집</option>
              <option value="KINDERGARTEN">유치원</option>
              <option value="CHILD_CENTER">지역아동센터</option>
              <option value="ETC">기타</option>
            </Select>
          ) : (
            (typeLabelMap[data.centerType] ?? data.centerType)
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
