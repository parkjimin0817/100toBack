// ChildDetail.jsx
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildImg from '../../assets/Child.png';

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { List } from '../../components/ChildDummyData';

const ChildDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // URL에서 ?id= 추출

  const [select, setSelect] = useState(true);
  const [child, setChild] = useState(null);

  useEffect(() => {
    const found = List.find((item) => item.id === parseInt(id));
    if (found) setChild(found);
  }, [id]);

  if (!child) return <div>로딩중...</div>;

  const handleSelect = (value) => {
    setSelect(value); // true 또는 false로 설정
  };

  return (
    <>
      <BasicInfoContainer>
        <ContentHeader
          Title={'아동 상세보기'}
          Color={'orange'}
          ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }, { Title: '아동정보 삭제' }]}
        />
        <BasicInfo>
          <PictureLine>
            <Picture src={ChildImg} alt="아이사진" />
          </PictureLine>
          <FirstInfo>
            <Name>{child.name}</Name>
            <Info>
              <InfoColumn>생년월일 </InfoColumn>
              <InfoResult>{child.birth}</InfoResult>
            </Info>
            <Info>
              <InfoColumn>키 </InfoColumn>
              <InfoResult>{child.height}</InfoResult>
            </Info>
            <Info>
              <InfoColumn>몸무게 </InfoColumn>
              <InfoResult>{child.weight}</InfoResult>
            </Info>
            <Info style={{ marginBottom: '45px' }}>
              <InfoColumn>주소</InfoColumn>
              <InfoResult>{child.address}</InfoResult>
            </Info>
          </FirstInfo>
          <FirstInfo style={{ marginLeft: '45px' }}>
            <Class>{child.className}</Class>
            <Info>
              <InfoColumn>학부모 </InfoColumn>
              <InfoResult>
                부:{child.parents.father}, 모:{child.parents.mother}
              </InfoResult>
            </Info>
            <Info>
              <InfoColumn>비상연락처 </InfoColumn>
              <Phone>
                <InfoResult>부:{child.phone.father}</InfoResult>
                <InfoResult>모:{child.phone.mother}</InfoResult>
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
          {select && (
            <>
              <Title>하루 건강</Title>
              <HeaderColumn>
                <DateColumn>날짜</DateColumn>
                <TempColumn>체온</TempColumn>
                <HeightColumn>키</HeightColumn>
                <WeightColumn>몸무게</WeightColumn>
                <SymptomColumn>증상</SymptomColumn>
                <MemoColumn>메모</MemoColumn>
              </HeaderColumn>

              {child.healthRecords &&
                [...child.healthRecords]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 4)
                  .map((record, index) => (
                    <ContentColumn key={index}>
                      <DateColumn>{record.date}</DateColumn>
                      <TempColumn>{record.temp}</TempColumn>
                      <HeightColumn>{record.height}</HeightColumn>
                      <WeightColumn>{record.weight}</WeightColumn>
                      <SymptomColumn>{record.symptom}</SymptomColumn>
                      <MemoColumn>{record.memo}</MemoColumn>
                    </ContentColumn>
                  ))}

              <LoadMoreButton>더보기</LoadMoreButton>

              <FooterInfoLine>
                <FooterBox>
                  <FooterTitle>복약정보</FooterTitle>
                  <FooterColumn>
                    <FooterDetailColumn>약 이름</FooterDetailColumn>
                    {child.medication.name}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>복용 용량</FooterDetailColumn>
                    {child.medication.dose}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>복용 시간</FooterDetailColumn>
                    {child.medication.time}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>복용 기간</FooterDetailColumn>
                    {child.medication.period}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>복용 목적</FooterDetailColumn>
                    {child.medication.purpose}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>메모</FooterDetailColumn>
                    {child.medication.note}
                  </FooterColumn>
                </FooterBox>
                <FooterBox>
                  <FooterTitle>예방접종</FooterTitle>
                  <FooterColumn>
                    <FooterDetailColumn>BCG</FooterDetailColumn>
                    {child.vaccination.BCG}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>접종 예정 </FooterDetailColumn>
                    {child.vaccination.schedule}
                  </FooterColumn>
                </FooterBox>
                <FooterBox>
                  <FooterTitle>알레르기</FooterTitle>
                  <FooterColumn>
                    <FooterDetailColumn>알레르기</FooterDetailColumn>
                    {child.allergy.items}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>반응</FooterDetailColumn>
                    {child.allergy.reaction}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>심각도</FooterDetailColumn>
                    {child.allergy.severity}
                  </FooterColumn>
                  <FooterColumn>
                    <FooterDetailColumn>메모</FooterDetailColumn>
                    {child.allergy.note}
                  </FooterColumn>
                </FooterBox>
              </FooterInfoLine>
              <LoadMoreButton>수정</LoadMoreButton>
            </>
          )}
          {!select && (
            <>
              <Title>하루 생활</Title>
              <HeaderColumn>
                <DateColumn>날짜</DateColumn>
                <TempColumn>식사</TempColumn>
                <DateColumn>낮잠시간</DateColumn>
                <DateColumn>놀이참여</DateColumn>
                <DateColumn>교우관계</DateColumn>
                <MemoColumn>메모</MemoColumn>
              </HeaderColumn>

              {child.lifeRecords &&
                [...child.lifeRecords]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 4) //최신순으로 상위 4개까지 잘라냄
                  .map((record, index) => (
                    <ContentColumn key={index}>
                      <DateColumn>{record.date}</DateColumn>
                      <TempColumn>{record.meal}</TempColumn>
                      <DateColumn>{record.napTime}</DateColumn>
                      <DateColumn>{record.play}</DateColumn>
                      <DateColumn>{record.social}</DateColumn>
                      <MemoColumn>{record.memo}</MemoColumn>
                    </ContentColumn>
                  ))}

              <LoadMoreButton>더보기</LoadMoreButton>

              <FooterInfoLine>
                <FooterBox2>
                  <FooterTitle style={{ marginBottom: '20px' }}>식습관</FooterTitle>
                  <FooterColumn2>
                    <FooterDetailColumn>좋아하는 음식 </FooterDetailColumn>
                    {child.eatingHabit.likes}
                  </FooterColumn2>
                  <FooterColumn2>
                    <FooterDetailColumn>싫어하는 음식 </FooterDetailColumn>
                    {child.eatingHabit.dislikes}
                  </FooterColumn2>
                  <FooterColumn2>
                    <FooterDetailColumn>식사량 </FooterDetailColumn>
                    {child.eatingHabit.status}
                  </FooterColumn2>
                  <FooterColumn2>
                    <FooterDetailColumn>메모 </FooterDetailColumn>
                    {child.eatingHabit.note}
                  </FooterColumn2>
                </FooterBox2>
                <FooterBox2>
                  <FooterTitle style={{ marginBottom: '20px' }}>교우관계</FooterTitle>
                  <FooterColumn2>
                    <FooterDetailColumn>친한친구 </FooterDetailColumn>
                    {child.socialRelation.closeFriends}
                  </FooterColumn2>
                  <FooterColumn2>
                    <FooterDetailColumn>좋아하는 놀이</FooterDetailColumn>
                    {child.socialRelation.favoritePlay}
                  </FooterColumn2>
                  <FooterColumn2>
                    <FooterDetailColumn>메모</FooterDetailColumn>
                    {child.socialRelation.note}
                  </FooterColumn2>
                </FooterBox2>
              </FooterInfoLine>
              <LoadMoreButton>수정</LoadMoreButton>
            </>
          )}
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

const FooterBox2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 260px;
  background-color: rgba(255, 206, 101, 0.25);
  border-radius: 10px;
  margin-right: 90px;
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

const FooterColumn2 = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 220px;
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 55px;
`;

const FooterDetailColumn = styled.div`
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap; // 줄바꿈 금지(메모 글자가 세로로 들어가서)
`;
