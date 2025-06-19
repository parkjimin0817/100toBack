import { format, addDays, isSameDay, isAfter, parse } from 'date-fns';

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const schedules = [
  { date: '2025-06-19', time: '13:00', text: '김승기 부모님과 대면 상담' },
  { date: '2025-06-19', time: '15:00', text: '김승기 부모님과 대면 상담' },
  { date: '2025-06-19', time: '18:00', text: '김승기 부모님과 대면 상담' },
  { date: '2025-06-19', time: '19:00', text: '여자친구랑 통화' },
  { date: '2025-06-19', time: '23:00', text: '부모님이랑 코스요리' },
  { date: '2025-06-19', time: '22:00', text: '정의철 아동 생일파티' },
  { date: '2025-06-19', time: '21:00', text: '양동민 아동 생일파티' },
  { date: '2025-06-19', time: '21:00', text: '양동민 아동 생일파티' },
  { date: '2025-06-19', time: '21:00', text: '양동민 아동 생일파티' },
];

const MainSchedule = () => {
  const navigate = useNavigate();
  //요일 일자
  const today = new Date();
  const week = getWeek(today);

  //일정
  const todayString = format(today, 'yyyy-MM-dd');
  const todaySchedules = schedules
    .filter((s) => s.date === todayString)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 7);

  const now = new Date();
  const nextIndex = todaySchedules.findIndex((s) => {
    if (!s.time) return false;
    const datetime = parse(`${s.date} ${s.time}`, 'yyyy-MM-dd HH:mm', new Date());
    return isAfter(datetime, now);
  });

  return (
    <Wrapper>
      {/* 상단: 요일 + 날짜 */}
      <DaysRow>
        {week.map((d, i) => (
          <DayText key={i}>{d.day}</DayText>
        ))}
      </DaysRow>
      <DatesRow>
        {week.map((d, i) => (
          <DateItem key={i} $selected={isSameDay(d.date, today)}>
            {d.date.getDate()}
          </DateItem>
        ))}
      </DatesRow>
      {/* 구분선 */}
      <Line />
      <ScheduleWrapper>
        <VerticalLine />
        {todaySchedules.map((s, i) => {
          const isNow = i === nextIndex;
          return (
            <ScheduleItem key={i}>
              <Circle $highlight={isNow} />
              <Content>
                <Time $highlight={isNow}>{s.time}</Time>
                <Text $highlight={isNow}>{s.text}</Text>
              </Content>
            </ScheduleItem>
          );
        })}
      </ScheduleWrapper>
      <Button onClick={() => navigate('/scheduleteacher')}>일정 더보기</Button>
    </Wrapper>
  );
};

export default MainSchedule;

const getWeek = (today) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const week = [...Array(7)].map((_, i) => {
    const offset = i - 3;
    const date = addDays(today, offset);
    return {
      date,
      day: days[date.getDay()],
    };
  });
  return week;
};

const Wrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const DayText = styled.div`
  width: 36px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const DatesRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateItem = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.orange : 'transparent')};
  color: ${({ $selected }) => ($selected ? 'white' : '#222')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  margin: ${({ theme }) => theme.spacing[3]} 0;
`;

const ScheduleWrapper = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};
`;

const VerticalLine = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: 21px;
  bottom: ${({ theme }) => theme.spacing[4]};
  width: 1px;
  border-left: 3px dotted ${({ theme }) => theme.colors.gray[400]};
`;
const ScheduleItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Circle = styled.div`
  width: 11px;
  height: 11px;
  background-color: ${({ $highlight, theme }) => ($highlight ? theme.colors.orange : theme.colors.gray[400])};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-right: ${({ theme }) => theme.spacing[2]};
  margin-top: 6px;
  flex-shrink: 0;
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Time = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ $highlight }) => ($highlight ? 'bold' : 'normal')};
  color: ${({ $highlight }) => ($highlight ? '#000000' : '#888')};
  margin-right: ${({ theme }) => theme.spacing[2]};
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $highlight }) => ($highlight ? 'bold' : 'normal')};
  color: ${({ $highlight }) => ($highlight ? '#000' : '#888')};
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  background-color: ${({ theme }) => theme.colors.orange};
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  :hover {
    cursor: pointer;
  }
`;
