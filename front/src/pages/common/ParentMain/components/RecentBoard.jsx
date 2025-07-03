import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { boardService } from '../../../../api/boards';

const RecentBoard = ({ centerNo }) => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    if (!centerNo) return;

    boardService
      .getRecent3Boards(centerNo)
      .then((data) => setBoards(data))
      .catch((err) => console.error('최근 게시물 3개 불러오기 실패:', err));
  }, [centerNo]);

  const TYPE = {
    NOTICE: '공지사항',
    FAMILY_NOTICE: '가정통신문',
    PHOTO: '사진게시판',
    MEAL_PLAN: '식단표',
  };

  const navigate = useNavigate();
  return (
    <>
      {boards.map((item) => {
        const [year, month, day] = item.create_date.slice(0, 10).split('-');
        return (
          <Card key={item.board_no}>
            <DateDiv>
              <DayDiv>{day}</DayDiv>
              <MonthDiv>
                {year}.{month}
              </MonthDiv>
            </DateDiv>
            <ContentWrapper onClick={() => navigate('/familycommunity/list')}>
              <TitleDiv>
                [{TYPE[item.type]}] {item.title}
              </TitleDiv>
              <ContentDiv>{item.content_text}</ContentDiv>
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
