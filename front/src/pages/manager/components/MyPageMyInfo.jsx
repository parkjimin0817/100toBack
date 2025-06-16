import React, { useState } from 'react';
import styled from 'styled-components';

const infodata = {
  name: '박지민',
  birthdate: '1999-08-17',
  role: '시설장',
};

const MyPageMyInfo = ({ isEditMode }) => {
  const [data, setData] = useState(infodata);
  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Wrapper>
      <InfoRow>
        <InfoType>이름 </InfoType>
        <Info>
          {isEditMode ? (
            <InfoInput value={data.name} onChange={(e) => handleChange('name', e.target.value)} />
          ) : (
            data.name
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>생년월일</InfoType>
        <Info>
          {isEditMode ? (
            <InfoInput type="date" value={data.birthdate} onChange={(e) => handleChange('birthdate', e.target.value)} />
          ) : (
            data.birthdate
          )}
        </Info>
      </InfoRow>
      <InfoRow>
        <InfoType>직위</InfoType>
        <Info>
          {isEditMode ? (
            <Select value={data.role} onChange={(e) => handleChange('role', e.target.value)}>
              <option value="시설장">시설장</option>
              <option value="교사">교사</option>
              <option value="기타">기타</option>
            </Select>
          ) : (
            data.role
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

const Select = styled.select`
  width: 150px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;
