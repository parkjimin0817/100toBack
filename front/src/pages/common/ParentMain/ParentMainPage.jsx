import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../../components/Common/ContentHeader';
import ChildCard from './components/ChildCard';
import RecentBoard from './components/RecentBoard';
import boy1 from '../../../assets/boy1.png';
import girl1 from '../../../assets/girl1.png';
import boy2 from '../../../assets/boy2.png';
import ScrollWrapper from './components/ScrollWrapper';
import MainSchedule from './components/MainSchedule';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: '박지민', age: '6', gender: '남', birthdate: '20.02.02', imgurl: boy1 },
  { name: '양동민', age: '7', gender: '남', birthdate: '20.03.02', imgurl: girl1 },
  { name: '정의철', age: '8', gender: '여', birthdate: '20.04.02', imgurl: girl1 },
  { name: '정형일', age: '9', gender: '남', birthdate: '20.05.02', imgurl: boy2 },
  { name: '김승기', age: '10', gender: '남', birthdate: '20.06.02', imgurl: boy2 },
];

const ParentMainPage = () => {
  return (
    <Wrapper>
      <TopContent>
        <FirstContent>
          <ChildContentHeader>
            <Title>우리아이</Title>
          </ChildContentHeader>
          <ChildCards>
            <ScrollWrapper>
              <ChildCard data={data} />
            </ScrollWrapper>
          </ChildCards>
        </FirstContent>
        <ScheduleContent>
          <ContentHeader Title={'일정 & 스케줄'} Color={'orange'} />
          <MainSchedule></MainSchedule>
        </ScheduleContent>
      </TopContent>
      <BoardContent>
        <ContentHeader
          Title={'공지사항'}
          Color={'yellow'}
          ButtonProps={[{ Title: '더보기', func: () => alert('게시판가야함') }]}
        />
        <RecentBoards>
          <RecentBoard />
        </RecentBoards>
      </BoardContent>
    </Wrapper>
  );
};

export default ParentMainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;
const TopContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
`;
const FirstContent = styled.div`
  width: 70%;
  height: 530px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ChildContentHeader = styled.div`
  width: 95%;
  margin: 20px auto;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const Title = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes[5]};
  margin-left: 10px;
`;

const ScheduleContent = styled.div`
  width: 30%;
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const BoardContent = styled.div`
  width: 100%;
  height: 340px;
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ChildCards = styled.div`
  width: 95%;
  height: 70%;
  display: flex;
  margin: 0 auto;

  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[16]};
`;

const RecentBoards = styled.div`
  width: 95%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing[4]};
`;
