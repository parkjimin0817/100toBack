import React, { useEffect, useState } from 'react'
import { centerservice } from '../../api/center';
import styled from 'styled-components';
import useLoginStore from '../../store/loginStore';

const CenterBasicInfo = ({ centerInfo, isEditing, isTeacher, onChange }) => {
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

  const handleChange = (key, value) => {
    if (!isEditing) return;
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
    if (isEditing) {
      const fullAddress = detail ? `${address}, ${detail}`.trim() : address;
      handleChange('centerAddress', fullAddress);
      if (zonecode) {
        handleChange('zonecode', zonecode);
      }
    }
  }, [address, detail, zonecode, isEditing]);

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
    <CenterBasicInfoContainer>
      <CenterNameAndClass>시설 정보</CenterNameAndClass>
      <FlexBox $isTeacher={isTeacher}>
        <CenterInfoContainer>
          <CenterInfoBox>
            {isEditing ? (
            <EditBox>
              <EditLabel>시설 명</EditLabel>
              <EditInput 
                type="text" 
                placeholder='이름을 입력해주세요.' 
                value={data.centerName} 
                onChange={(e) => handleChange('centerName', e.target.value)}
              />
            </EditBox>
          ) : (
            <>
              <CenterInfoLabel>시설 명</CenterInfoLabel>
              <CenterInfoSpan>{data.centerName}</CenterInfoSpan>
            </>
          )}
          </CenterInfoBox>
          <CenterInfoBox>
            {isEditing ? (
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
              <>
                <CenterInfoLabel>시설 주소</CenterInfoLabel>
                <CenterInfoSpan>{data.centerAddress}</CenterInfoSpan>
              </>
            )}
          </CenterInfoBox>
        </CenterInfoContainer>
        <CenterInfoContainer>
          <CenterInfoBox>
            {isEditing ? (
              <EditBox>
                <EditLabel>시설 유형</EditLabel>
                <Select value={data.centerType} onChange={(e) => handleChange('centerType', e.target.value)}>
                  <option value="DAYCARE">어린이집</option>
                  <option value="KINDERGARTEN">유치원</option>
                  <option value="CHILD_CENTER">지역아동센터</option>
                  <option value="ETC">기타</option>
                </Select>
              </EditBox>
            ) : (
              <>
                <CenterInfoLabel>시설 유형</CenterInfoLabel>
                <CenterInfoSpan>{typeLabelMap[data.centerType] ?? data.centerType}</CenterInfoSpan>
              </>
            )}
          </CenterInfoBox>
          <CenterInfoBox>
            {isEditing ? (
              <EditBox>
                <EditLabel>시설 연락처</EditLabel>
                <EditInput 
                  value={data.centerTel}
                  onChange={(e) => handleChange('centerTel', e.target.value)}
                />
              </EditBox>
            ) : (
              <>
                <CenterInfoLabel>시설 연락처</CenterInfoLabel>
                <CenterInfoSpan>{data.centerTel}</CenterInfoSpan>
              </>
            )}
          </CenterInfoBox>
        </CenterInfoContainer>
      </FlexBox>
    </CenterBasicInfoContainer>
  )
}

export default CenterBasicInfo;

const CenterBasicInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding : 30px;
  flex: 1;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ $isTeacher }) => ($isTeacher ? "column" : "row")};
  padding-left: ${({ $isTeacher }) => ($isTeacher ? "100px" : "190px")};
  gap: ${({ $isTeacher }) => ($isTeacher ? "10px" : "0")};
`;

const CenterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 10px;
`;

const CenterNameAndClass = styled.h2`
  text-align: start;
`;

const CenterInfoBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding-right: 30px;
`;

const CenterInfoLabel = styled.label`
  text-align: left;
  min-width : 80px;
  font-weight: bold;
`;

const CenterInfoSpan = styled.span``;

const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EditLabel = styled.label`
  text-align: start;
  font-weight: bold;
`;

const EditInput = styled.input`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
`;

// 주소창
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
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  outline: none;
`;