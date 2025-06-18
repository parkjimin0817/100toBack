import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildCard from '../../components/';

const TeacherMainPage = () => {
  return (
    <Wrapper>
      <TopContent>
        <FirstContent>
          <ContentHeader Title={'우리 아이'} Color={'lightblue'} />
          <ChildCards>
            <ChildCard />
          </ChildCards>
        </FirstContent>
        <ScheduleContent>
          <ContentHeader Title={'일정 & 스케줄'} Color={'orange'} />
        </ScheduleContent>
      </TopContent>
      <BoardContent>
        <ContentHeader
          Title={'공지사항'}
          Color={'yellow'}
          ButtonProps={[{ Title: '더보기', func: () => alert('게시판가야함') }]}
        />
        <RecentBoards></RecentBoards>
      </BoardContent>
    </Wrapper>
  );
};

export default TeacherMainPage;

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

const ScheduleContent = styled.div`
  width: 30%;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const BoardContent = styled.div`
  width: 100%;
  height: 340px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ChildCards = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  margin: 0 auto;

  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[16]};
  overflow-x: auto;
`;

const RecentBoards = styled.div`
  width: 90%;
  height: 70%;
`;
