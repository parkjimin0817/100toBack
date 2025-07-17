import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginStore } from '../../../store/loginStore';
import { centerservice } from '../../../api/center';

const MyPageCenterInfo = ({ centerInfo, onChange, isEditable }) => {
  const { member } = useLoginStore();
  const [data, setData] = useState(centerInfo);
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  const typeLabelMap = {
    DAYCARE: '어린이집',
    KINDERGARTEN: '유치원',
    CHILD_CENTER: '지역아동센터',
    ETC: '기타',
  };

  const formatPhoneNumber = (value) => {
    const onlyNums = value.replace(/\D/g, '');

    if (onlyNums.startsWith('02')) {
      const trimmed = onlyNums.slice(0, 9);
      if (trimmed.length <= 2) return trimmed;
      if (trimmed.length <= 5) return trimmed.replace(/(\d{2})(\d{1,3})/, '$1-$2');
      return trimmed.replace(/(\d{2})(\d{3})(\d{1,4})/, '$1-$2-$3');
    }

    const trimmed = onlyNums.slice(0, 11);
    if (trimmed.length <= 3) return trimmed;
    if (trimmed.length <= 7) return trimmed.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return trimmed.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  const handleChange = (key, value) => {
    if (!isEditable) return;
    setData((prev) => ({ ...prev, [key]: value }));
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  // 기존 주소 데이터가 있으면 분리해서 설정
  useEffect(() => {
    if (data?.centerAddress) {
      const addressParts = data.centerAddress.split(', ');
      if (addressParts.length >= 2) {
        setAddress(addressParts[0]);
        setDetail(addressParts[1]);
      } else {
        setAddress(data.centerAddress);
        setDetail('');
      }
    }
    if (data?.zonecode) {
      setZonecode(data.zonecode);
    }
  }, [data]);

  // 주소 변경 시 전체 주소 업데이트
  useEffect(() => {
    if (isEditable) {
      const fullAddress = detail ? `${address}, ${detail}`.trim() : address;
      handleChange('centerAddress', fullAddress);
      if (zonecode) {
        handleChange('zonecode', zonecode);
      }
    }
  }, [address, detail, zonecode, isEditable]);

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

  // centerInfo prop이 변경될 때 data 상태 업데이트
  useEffect(() => {
    if (centerInfo) {
      setData(centerInfo);
    }
  }, [centerInfo]);

  const openAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 기능이 로딩되지 않았어요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (dataFromApi) => {
        setZonecode(dataFromApi.zonecode);
        setAddress(dataFromApi.address);
        setDetail('');
      },
    }).open();
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  if (!data) return null;

  return (
    <Wrapper isEditable={isEditable}>
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
            <InfoInput
              value={data.centerTel}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                handleChange('centerTel', formatted);
              }}
            />
          ) : (
            data.centerTel
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>주소</InfoType>
        <Info>
          {isEditable ? (
            <AddressContainer>
              <AddressRow>
                <ShortInput type="text" placeholder="우편번호" value={zonecode} readOnly />
                <SearchButton type="button" onClick={openAddressSearch}>
                  주소 검색
                </SearchButton>
              </AddressRow>
              <LongInput type="text" placeholder="기본주소" value={address} readOnly />
              <LongInput type="text" placeholder="상세주소" value={detail} onChange={handleDetailChange} />
            </AddressContainer>
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
  height: ${({ isEditable }) => (isEditable ? 'auto' : '200px')};
  min-height: ${({ isEditable }) => (isEditable ? '300px' : '200px')};
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  margin-bottom: 10px;
`;
const InfoType = styled.div`
  width: 100px;
  min-width: 100px;
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

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
`;

const AddressRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ShortInput = styled.input`
  flex: 1;
  height: 40px;
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const LongInput = styled.input`
  width: 100%;
  height: 40px;
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing[0]} ${({ theme }) => theme.spacing[2]};
  height: 40px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;

const Select = styled.select`
  width: 200px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;
