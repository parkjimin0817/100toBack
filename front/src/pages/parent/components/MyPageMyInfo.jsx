import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MyPageMyInfo = ({ info, onChange, isEditable }) => {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  // 기존 주소 데이터가 있으면 분리해서 설정
  useEffect(() => {
    if (info?.address) {
      const addressParts = info.address.split(', ');
      if (addressParts.length >= 2) {
        setAddress(addressParts[0]);
        setDetail(addressParts[1]);
      } else {
        setAddress(info.address);
        setDetail('');
      }
    }
    if (info?.zonecode) {
      setZonecode(info.zonecode);
    }
  }, [info]);

  const handleChange = (field, value) => {
    if (!isEditable) return;
    onChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 주소 변경 시 전체 주소 업데이트
  useEffect(() => {
    if (isEditable) {
      const fullAddress = detail ? `${address}, ${detail}`.trim() : address;
      handleChange('address', fullAddress);
      if (zonecode) {
        handleChange('zonecode', zonecode);
      }
    }
  }, [address, detail, zonecode, isEditable]);

  if (!info) return null;

  const openAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 기능이 로딩되지 않았어요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        setZonecode(data.zonecode);
        setAddress(data.address);
        setDetail('');
      },
    }).open();
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  return (
    <Wrapper isEditable={isEditable}>
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
  width: 150px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;
