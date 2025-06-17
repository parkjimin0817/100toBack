// ChildDetail.jsx
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildImg from '../../assets/Child.png';
import theme from '../../styles/theme';
import React, { useState } from 'react';

const ChildDetail = () => {
  const [select, setSelect] = useState(true);

  const handleSelect = (value) => {
    setSelect(value); // true 또는 false로 설정
  };

  return (
    <>
      <BasicInfoContainer>
        <ContentHeader
          Title={'아동 상세보기'}
          Color={'orange'}
          FontSize="xl"
          ButtonProps={[{ Title: '뒤로가기', func: () => alert('뒤로가기~') }, { Title: '아동정보 삭제' }]}
        />
        <BasicInfo>
          <PictureLine>
            <Picture src={ChildImg} alt="아이사진" />
          </PictureLine>
          <FirstInfo>
            <Name>김동글</Name>
            <Info>
              <InfoColumn>생년월일 </InfoColumn>
              <InfoResult>2022.06.14</InfoResult>
            </Info>
            <Info>
              <InfoColumn>키 </InfoColumn>
              <InfoResult>63cm</InfoResult>
            </Info>
            <Info>
              <InfoColumn>몸무게 </InfoColumn>
              <InfoResult>12kg</InfoResult>
            </Info>
            <Info style={{ marginBottom: '45px' }}>
              <InfoColumn>주소</InfoColumn>
              <InfoResult>경기도 용인시 기흥구 어정로 12-34, 405동 1402호</InfoResult>
            </Info>
          </FirstInfo>
          <FirstInfo style={{ marginLeft: '45px' }}>
            <Class>햇님반</Class>
            <Info>
              <InfoColumn>생년월일 </InfoColumn>
              <InfoResult>2022.06.14</InfoResult>
            </Info>
            <Info>
              <InfoColumn>학부모 </InfoColumn>
              <InfoResult>부:김동길, 모:최동순</InfoResult>
            </Info>
            <Info>
              <InfoColumn>비상연락처 </InfoColumn>
              <Phone>
                <InfoResult>부:010-1234-5678</InfoResult>
                <InfoResult>모:010-9876-5432</InfoResult>
              </Phone>
            </Info>
          </FirstInfo>
        </BasicInfo>
      </BasicInfoContainer>
      <HealthInfoContainer>
        <SelectHeader>
          <HealthStyle select={select} onClick={() => handleSelect(true)}>
            건강
          </HealthStyle>
          <LifeStyle select={select} onClick={() => handleSelect(false)}>
            생활
          </LifeStyle>
        </SelectHeader>
        <DetailInfoContainer>
          <Title>하루 건강</Title>
          <HeaderColumn>
            <DateColumn>날짜</DateColumn>
            <TempColumn>체온</TempColumn>
            <HeightColumn>키</HeightColumn>
            <WeightColumn>몸무게</WeightColumn>
            <SymptomColumn>증상</SymptomColumn>
            <MemoColumn>메모</MemoColumn>
          </HeaderColumn>
          <ContentColumn>
            <DateColumn>2025.06.05</DateColumn>
            <TempColumn>37.5°C</TempColumn>
            <HeightColumn>100cm</HeightColumn>
            <WeightColumn>18kg</WeightColumn>
            <SymptomColumn>기침</SymptomColumn>
            <MemoColumn>점심먹고 배가 아프다 했어요</MemoColumn>
          </ContentColumn>
          <ContentColumn>
            <DateColumn>2025.06.04</DateColumn>
            <TempColumn>37.5°C</TempColumn>
            <HeightColumn>100cm</HeightColumn>
            <WeightColumn>18kg</WeightColumn>
            <SymptomColumn>기침</SymptomColumn>
            <MemoColumn>점심먹고 배가 아프다 했어요</MemoColumn>
          </ContentColumn>
          <ContentColumn>
            <DateColumn>2025.06.03</DateColumn>
            <TempColumn>37.5°C</TempColumn>
            <HeightColumn>100cm</HeightColumn>
            <WeightColumn>18kg</WeightColumn>
            <SymptomColumn>기침</SymptomColumn>
            <MemoColumn>점심먹고 배가 아프다 했어요</MemoColumn>
          </ContentColumn>
          <ContentColumn>
            <DateColumn>2025.06.02</DateColumn>
            <TempColumn>37.5°C</TempColumn>
            <HeightColumn>100cm</HeightColumn>
            <WeightColumn>18kg</WeightColumn>
            <SymptomColumn>기침</SymptomColumn>
            <MemoColumn>점심먹고 배가 아프다 했어요</MemoColumn>
          </ContentColumn>
          <LoadMoreButton>더보기</LoadMoreButton>
          <FooterInfoLine>
            <FooterBox>
              <FooterTitle>복약정보</FooterTitle>
              <FooterColumn>약이름:타이레놀 어린이시럽</FooterColumn>
              <FooterColumn>복용 용량:5ml</FooterColumn>
              <FooterColumn>복용 시간:식후 30분</FooterColumn>
              <FooterColumn>복용 기간:6월22일~24일</FooterColumn>
              <FooterColumn>복용 목적:열,콧물</FooterColumn>
              <FooterColumn>메모:열 없으면 투약 중단, 너무 거부하면 사탕이랑 같이</FooterColumn>
            </FooterBox>
            <FooterBox>
              <FooterTitle>예방접종</FooterTitle>
              <FooterColumn>예방접종 내용은 통을 입력하게</FooterColumn>
              <FooterColumn>BCG:2026.12.22</FooterColumn>
              <FooterColumn>접종 예정:2025.06.25</FooterColumn>
            </FooterBox>
            <FooterBox>
              <FooterTitle>알레르기</FooterTitle>
              <FooterColumn>알레르기:계란,해산물,복숭아</FooterColumn>
              <FooterColumn>반응:호흡곤란,두드러기</FooterColumn>
              <FooterColumn>심각도:가벼움</FooterColumn>
              <FooterColumn>메모:계란 알레르기가 심합니다. 유의 부탁드립니다.</FooterColumn>
            </FooterBox>
          </FooterInfoLine>
          <LoadMoreButton>수정</LoadMoreButton>
        </DetailInfoContainer>
      </HealthInfoContainer>
    </>
  );
};

export default ChildDetail;

const BasicInfoContainer = styled.div`
  min-width: 1024px;
  max-height: 365px;
`;

const BasicInfo = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const PictureLine = styled.div`
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 45px;
  margin-right: 45px;
`;

const Picture = styled.img``;

const FirstInfo = styled.div`
  margin-top: 20px;
  flex-direction: column;
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 25px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

const InfoColumn = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const InfoResult = styled.div`
  margin-left: 25px;
`;

const Class = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 25px;
`;

const Phone = styled.div`
  flex-direction: column;
`;

const HealthInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1024px;
  max-height: 620px;
  margin-top: 10px;
`;

const SelectHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const HealthStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'select',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 180px;
  height: 48px;
  background-color: ${({ select, theme }) => (select ? theme.colors.yellow : 'rgba(255, 206, 101, 0.25)')};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const LifeStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'select',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 180px;
  height: 48px;
  background-color: ${({ select, theme }) => (select ? 'rgba(255, 206, 101, 0.25)' : theme.colors.yellow)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const DetailInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: 1024px;
  height: 570px;
  border: 8px solid ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
  background-color: white;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 70px;
  margin-top: 30px;
  margin-bottom: 5px;
`;

const HeaderColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-left: 70px;
  width: 900px;
  height: 30px;
  background-color: rgba(255, 206, 101, 0.25);
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid black;
`;

const ContentColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-left: 70px;
  width: 900px;
  height: 30px;
  background-color: white;
  font-size: 16px;
  font-weight: normal;
  border-bottom: 1px solid black;
`;

const DateColumn = styled.div`
  width: 123px;
`;

const TempColumn = styled.div`
  width: 82px;
`;

const HeightColumn = styled.div`
  width: 82px;
`;
const WeightColumn = styled.div`
  width: 80px;
`;

const SymptomColumn = styled.div`
  width: 150px;
`;

const MemoColumn = styled.div`
  width: 308px;
`;

const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.yellow};
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  margin-left: 465px;

  &:hover {
    cursor: pointer;
    scale: 0.98;
  }
`;

const FooterInfoLine = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 70px;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 260px;
  background-color: rgba(255, 206, 101, 0.25);
  border-radius: 10px;
  margin-right: 25px;
`;

const FooterTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
`;

const FooterColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 220px;
  font-size: 14px;
  margin-left: 30px;
  margin-bottom: 10px;
`;
