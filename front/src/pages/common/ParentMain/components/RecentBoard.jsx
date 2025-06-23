import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const data = [
  {
    board: '1',
    createDate: '2025-06-23',
    type: '공지사항',
    title: '밥을 다 먹어야합니다.',
    content: '밥을 남기면 아깝기 때문에 다 먹어야해요',
  },
  {
    board: '2',
    createDate: '2025-06-22',
    type: '가정통신문',
    title: '가족 여행 적극 권장 안내문',
    content: '아이들이 여행을 좋아합니다 여행을 많이 가시길 바랍니다.',
  },
  {
    board: '3',
    createDate: '2025-06-21',
    type: '사진게시판',
    title: '귀여운 토끼 소개합니다.',
    content:
      '우리 유치원에 토끼를 키우기로 했어요~ 예뻐해 줍시다.adsfasdfasdfasdfasdfsdafasdfasdfasdfdsafaddfsdfsdfsdfsdfsdfsdfsdfsdfsdsfadsfadsfafasdfadsf',
  },
];

const RecentBoard = () => {
  const navigate = useNavigate();
  return (
    <>
      {data.map((item) => {
        const [year, month, day] = item.createDate.split('-');
        return (
          <Card key={item.board}>
            <DateDiv>
              <DayDiv>{day}</DayDiv>
              <MonthDiv>
                {year}.{month}
              </MonthDiv>
            </DateDiv>
            <ContentWrapper onClick={() => navigate('/familycommunity/list')}>
              <TitleDiv>
                [{item.type}] {item.title}
              </TitleDiv>
              <ContentDiv>{item.content}</ContentDiv>
            </ContentWrapper>
          </Card>
        );
      })}
    </>
  );
};

export default RecentBoard;

const Card = styled.div`
  display: flex;
  align-items: center;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.white};
`;

const DayDiv = styled.div`
  margin: ${({ theme }) => theme.spacing[0]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;
const MonthDiv = styled.div`
  margin: ${({ theme }) => theme.spacing[0]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;

const ContentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  :hover {
    cursor: pointer;
  }
`;

const TitleDiv = styled.div`
  width: 80%;
  height: 60%;
  margin: 0 ${({ theme }) => theme.spacing[3]};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ContentDiv = styled.div`
  margin: 0 ${({ theme }) => theme.spacing[3]};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
