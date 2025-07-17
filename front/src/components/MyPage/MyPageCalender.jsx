import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { attendanceStatusToKorean } from '../../constants/attendanceStatusMap';
import { holidayService } from '../../api/holiday';

const MyPageCalender = ({
  monthlyAttendanceList,
  disableFuture = false,
  minDate,
  maxDate,
}) => {
  const today = new Date();
  const [holidays, setHolidays] = useState([]);
  const [activeMonth, setActiveMonth] = useState(new Date());

  useEffect(() => {
    const year = activeMonth.getFullYear();
    const month = activeMonth.getMonth() + 1;

    holidayService
      .getHoliday(year, month)
      .then((data) => setHolidays(data))
      .catch((err) => console.error('공휴일 불러오기 실패:', err));
  }, [activeMonth]);

  console.log(monthlyAttendanceList);

  return (
    <StyledCalendar
      calendarType="gregory"
      formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
      prev2Label={null}
      next2Label={null}
      minDetail="year"
      maxDetail="month"
      //onActiveStartDateChange : 보여주는 달이 바뀔 때 실행되는 react-calendar의 props
      onActiveStartDateChange={({ activeStartDate }) => {
        setActiveMonth(activeStartDate);
      }}
      tileDisabled={({ date, view }) => disableFuture && view === 'month' && date > today}
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          const isHoliday = holidays.some((h) => new Date(h.holiday_date).toDateString() === date.toDateString());
          if (isHoliday) return 'holiday';
          if (date.getDay() === 0) return 'sunday';
          if (date.getDay() === 6) return 'saturday';
        }
      }}
      tileContent={({ date, view }) => {
        if (view === 'month') {
          const holiday = holidays.find((h) => new Date(h.holiday_date).toDateString() === date.toDateString());
          const isJoinDate = minDate && new Date(minDate).toDateString() === date.toDateString();
          const afterJoinDate = minDate && date >= new Date(minDate.setHours(0, 0, 0, 0));
          const attendance = monthlyAttendanceList?.find(
            (a) => new Date(a.attendanceDate).toDateString() === date.toDateString()
          );
          if (holiday || attendance || isJoinDate) {
            return (
              <TileContent>
                {holiday && <Holiday>{holiday.holiday_name}</Holiday>}
                {isJoinDate && <JoinDate>입사일</JoinDate>}
                {attendance && afterJoinDate && (
                  <Status $status={attendanceStatusToKorean[attendance.status]}>
                    {attendanceStatusToKorean[attendance.status]}
                  </Status>
                )}
              </TileContent>
            );
          }
        }
        return null;
      }}
      maxDate={maxDate}
      minDate={minDate}
    />
  );
};

const TileContent = styled.div`
  font-size: 0.8rem;
  position: absolute;
  top: 60%;
  width: 100%;
  text-align: center;
  white-space: normal;
  overflow: hidden;
  line-height: 1.1;
  padding: 0 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Holiday = styled.div`
  width: 80%;
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
`;
const JoinDate = styled.div`
  width: 80%;
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
`;
const Status = styled.div`
  width: 80%;
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case '근무중':
        return '#2196f3'; // 파랑
      case '출근':
        return '#4caf50'; // 초록
      case '결근':
        return '#f44336'; // 빨강
      default:
        return theme.colors.lightblue; // 기본값
    }
  }};
  color: ${({ theme }) => theme.colors.white};
`;

const StyledCalendar = styled(Calendar)`
  width: 90%;
  border: none;

  .react-calendar {
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    font-size: 20px;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  /* 날짜 셀 영역을 grid로 6행 고정 */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr); /* 항상 6행 */
    height: 90%; /* 캘린더 전체 높이 고정 */
  }

  /* 주말 색상 */
  .sunday {
    color: ${({ theme }) => theme.colors.lightorange};
  }

  .saturday {
    color: ${({ theme }) => theme.colors.lightblue};
  }

  /* 네비게이션 버튼 스타일 */
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    border: none;
    background: transparent !important;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;
  }

  .react-calendar__navigation__prev-button:hover,
  .react-calendar__navigation__next-button:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }

  /* 현재 달/년 표시 부분 */
  .react-calendar__navigation__label {
    background: transparent !important;
    font-weight: bold;
  }

  /* 날짜 셀 크기 축소 및 정사각형 비율 */
  .react-calendar__tile {
    padding: ${({ theme }) => theme.spacing[1]} !important;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    box-sizing: border-box;
    position: relative;

    background: transparent !important;
  }

  .react-calendar__tile abbr {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold} !important;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }

  /* 선택한 날짜 스타일 */
  .react-calendar__tile--active abbr {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  /* 오늘 날짜 (배경색 제거 + 테두리만) */
  .react-calendar__tile--now {
    background: transparent !important;
  }

  /* 오늘 날짜 스타일: 작고 테두리만 */
  .react-calendar__tile--now abbr {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: inherit;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: transparent !important;
    transform: none !important;
    padding: ${({ theme }) => theme.spacing[1]} !important;
    font-size: ${({ theme }) => theme.fontSizes.base} !important;
    border: none !important;
    outline: none !important;
  }

  /* 오늘 날짜 호버 & 포커스 시 */
  .react-calendar__tile--now:enabled:hover abbr,
  .react-calendar__tile--now:enabled:focus abbr {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: inherit;
  }

  /* 오늘 + 선택된 날짜 → 검정 배경 흰 글자 */
  .react-calendar__tile--now.react-calendar__tile--active abbr {
    background: ${({ theme }) => theme.colors.black} !important;
    color: ${({ theme }) => theme.colors.white} !important;
    border: none;
  }

  .holiday {
    color: red;
    font-weight: bold;
  }
`;

export default MyPageCalender;
