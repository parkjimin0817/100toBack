import React from 'react';
import styled from 'styled-components';
import TeacherImage from '../../../assets/img/teacherpicture.png';
import Progressbar1 from '../../../assets/img/progressbar1.png';
import Progressbar2 from '../../../assets/img/progressbar2.png';

const TeacherMainHealth = () => {
  return (
    <>
      <HealthContainer>
        <FirstSecondLine>
          <Greeting>좋은 하루에요.</Greeting>
          <Greeting>정형일 선생님!</Greeting>
          <Greeting2>오늘도 힘내볼까요?</Greeting2>
          <TeacherPic src={TeacherImage}></TeacherPic>
        </FirstSecondLine>
        <SecondLine>
          <SecondLineHeader>주간 건강 정보</SecondLineHeader>
          <SecondStressLine>
            <SecondLineTitle>스트레스 지수</SecondLineTitle>
            <ProgressBar src={Progressbar1}></ProgressBar>
            <ProgressBar src={Progressbar2}></ProgressBar>
          </SecondStressLine>
          <SecondStressLine>
            <SecondLineTitle>평균 수면 시간</SecondLineTitle>
            <ProgressBar src={Progressbar1}></ProgressBar>
            <ProgressBar src={Progressbar2}></ProgressBar>
          </SecondStressLine>
          <SecondLineFooter>
            <Rectangle1 />
            <FooterInfo>지난주 데이터</FooterInfo>
            <Rectangle2 />
            <FooterInfo>이번주 데이터</FooterInfo>
          </SecondLineFooter>
        </SecondLine>
        <ThirdLine>
          <FeedbackBox>
            <SecondLineHeader>주간 건강 정보</SecondLineHeader>
          </FeedbackBox>
          <SelfDiagnosisBox></SelfDiagnosisBox>
        </ThirdLine>
      </HealthContainer>
    </>
  );
};

export default TeacherMainHealth;

const HealthContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const FirstSecondLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing[5]};
  width: 200px;
  height: 423px;
  margin-right: ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: solid 2px ${({ theme }) => theme.colors.lightblue};
`;

const Greeting = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
`;

const Greeting2 = styled.div`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacing[5]};
`;

const TeacherPic = styled.img`
  margin-top: 80px;
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  height: 423px;
  margin-right: ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: solid 2px ${({ theme }) => theme.colors.lightblue};
`;

const SecondLineHeader = styled.div`
  width: 160px;
  height: 30px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.lightblue};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const SecondStressLine = styled.div`
  margin: 50px 0px 20px 0px;
`;

const SecondLineTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ProgressBar = styled.img``;

const SecondLineFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 70px;
`;

const Rectangle1 = styled.div`
  width: 10px;
  height: 10px;
  margin-left: 15px;
  background-color: ${({ theme }) => theme.colors.lightblue};
`;

const FooterInfo = styled.div`
  margin-left: 10px;
  font-size: 10px;
`;

const Rectangle2 = styled.div`
  width: 10px;
  height: 10px;
  margin-left: 15px;
  background-color: ${({ theme }) => theme.colors.blue};
`;

const ThirdLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  height: 287px;
  margin-right: ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: solid 2px ${({ theme }) => theme.colors.lightblue};
`;

const FeedbackBox = styled.div``;

const SelfDiagnosisBox = styled.div``;
