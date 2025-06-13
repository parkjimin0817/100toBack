import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const AddressInput = () => {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  const openSearchAddress = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 기능이 로딩되지 않았어요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        setZonecode(data.zonecode);
        setAddress(data.address);
      },
    }).open();
  };
  return (
    <Wrapper>
      <Label>주소</Label>

      <Row>
        <ShortInput type="text" placeholder="우편번호" value={zonecode} readOnly />
        <SearchButton type="button" onClick={openSearchAddress}>
          주소 검색
        </SearchButton>
      </Row>

      <LongInput type="text" placeholder="기본주소" value={address} readOnly />

      <LongInput type="text" placeholder="상세주소" value={detail} onChange={(e) => setDetail(e.target.value)} />
    </Wrapper>
  );
};

export default AddressInput;

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const ShortInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 10px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const LongInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const SearchButton = styled.button`
  padding: 0 16px;
  height: 40px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;
