import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../../components/Common/ContentHeader';
import ChildCard from './components/ChildCard';
import RecentBoard from './components/RecentBoard';
import ScrollWrapper from './components/ScrollWrapper';
import MainSchedule from './components/MainSchedule';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../../store/loginStore';
import { childService } from '../../../api/child';

const ParentMainPage = () => {
  const navigate = useNavigate();
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const memberNo = member?.memberNo;

  const [childList, setChildList] = useState([]);

  useEffect(() => {
    if (!memberNo) return;

    childService
      .getParentChildList(memberNo)
      .then((data) => setChildList(data))
      .catch((err) => console.error('아동 정보 불러오기 실패 :', err));
  }, [memberNo]);

  console.log(childList);

  return (
    <Wrapper>
      <TopContent>
        <FirstContent>
          <ChildContentHeader>
            <Title>우리아이</Title>
          </ChildContentHeader>
          <ChildCards>
            <ScrollWrapper>
              <ChildCard data={childList} />
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
          ButtonProps={[
            {
              Title: '더보기',
              func: () => {
                navigate('/notice/list');
              },
            },
          ]}
        />
        <RecentBoards>
          <RecentBoard centerNo={centerNo} />
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
  height: 570px;
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
  height: 570px;
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
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing[4]};
  gap: 20px;
`;
