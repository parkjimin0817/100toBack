import React from 'react';
import styled from 'styled-components';
import TeacherImage from '../../../assets/img/teacherpicture.png';
import Progressbar1 from '../../../assets/img/progressbar1.png';
import Progressbar2 from '../../../assets/img/progressbar2.png';
import YellowFace from '../../../assets/img/yellowface.png';
import Go from '../../../assets/img/go.png';

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
          <LineHeader>주간 건강 정보</LineHeader>
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
          <FeedbackLine>
            <LineHeader>주간 건강 피드백</LineHeader>
            <FaceImage src={YellowFace} alt="노란 얼굴" />
            <Feedback>
              스트레스 지수는 낮아졌는데,수면시간도 낮아졌어요. 짧은 수면은 집중력을 저하시켜요. 충분한 수면을
              취하시는걸 권장드려요!
            </Feedback>
          </FeedbackLine>
          <SelfDiagnosisLine>
            <LineHeader>자가진단</LineHeader>
            <SelfDiagnosisBox>
              이번주 자가진단 하기
              <img src={Go} alt="" />
            </SelfDiagnosisBox>
          </SelfDiagnosisLine>
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

const LineHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ThirdLine = styled.div``;

const FeedbackLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  height: 287px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: solid 2px ${({ theme }) => theme.colors.lightblue};
`;

const FaceImage = styled.img`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px 0px 20px;
`;

const Feedback = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 15px 0px 0px 20px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SelfDiagnosisLine = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  height: 117px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: solid 2px ${({ theme }) => theme.colors.lightblue};
`;

const SelfDiagnosisBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 157px;
  height: 44px;
  background: #8fd7eb40;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    cursor: pointer;
  }
`;
