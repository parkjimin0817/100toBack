import { format, addDays, isSameDay, isAfter, parse } from 'date-fns';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../../../store/loginStore';
import { useScheduleService } from '../../../../api/schedule';

const MainSchedule = () => {
  const navigate = useNavigate();
  const { member } = useLoginStore();
  const memberNo = member?.memberNo;
  const centerNo = member?.centerNo;

  const [schedules, setSchedules] = useState([]);

  //요일 일자
  const today = new Date();
  const week = getWeek(today);
  const todayString = format(today, 'yyyy-MM-dd');

  useEffect(() => {
    if (!memberNo || !centerNo) return;

    useScheduleService
      .getTodayScheduleList(centerNo, memberNo, todayString)
      .then((data) => setSchedules(data))
      .catch((err) => console.error('메인 페이지 스케줄 불러오기 실패 : ', err));
  }, [memberNo, centerNo]);

  //일정
  const todaySchedules = schedules
    .filter((s) => s.schedule_date === todayString)
    .sort((a, b) => a.start_time.localeCompare(b.start_time))
    .slice(0, 7);

  const now = new Date();
  const nextIndex = todaySchedules.findIndex((s) => {
    if (!s.start_time) return false;
    const datetime = parse(`${s.schedule_date} ${s.start_time}`, 'yyyy-MM-dd HH:mm:ss', new Date());
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
        {todaySchedules.length > 0 && <VerticalLine />}
        {todaySchedules.length === 0 ? (
          <NoScheduleText>오늘 일정이 없습니다.</NoScheduleText>
        ) : (
          todaySchedules.map((s, i) => {
            const isNow = i === nextIndex;
            return (
              <ScheduleItem key={s.schedule_no}>
                <Circle $highlight={isNow} />
                <Content>
                  <Time $highlight={isNow}> {format(parse(s.start_time, 'HH:mm:ss', new Date()), 'HH:mm')}</Time>
                  <Text $highlight={isNow}>{s.title}</Text>
                </Content>
              </ScheduleItem>
            );
          })
        )}
      </ScheduleWrapper>

      <Button onClick={() => navigate('/scheduleteacher')}>
        {todaySchedules.length === 0 ? '일정 등록하기' : '일정 더보기'}
      </Button>
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
  height: 480px;
  position: relative;
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
  left: 20px;
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
  font-size: ${({ theme }) => theme.fontSizes.base};
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
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  :hover {
    cursor: pointer;
  }
`;

const NoScheduleText = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
