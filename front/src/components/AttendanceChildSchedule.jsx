import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import dayjs from 'dayjs';

const AttendanceChildSchedule = ({ data }) => {
  const formatData = data.map((item) => ({
    ...item,
    create_date: dayjs(item.create_date).format('YYYY-MM-DD'),
  }));

  return (
    <StyledCalendar
      calendarType="gregory"
      formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
      prev2Label={null}
      next2Label={null}
      minDetail="year"
      maxDetail="month"
      tileClassName={({ date, view }) => {
        if (view !== 'month') return;

        const dateStr = dayjs(date).format('YYYY-MM-DD');
        const match = formatData.find((d) => d.create_date === dateStr);

        if (match) {
          if (match.status === 'present') return 'present';
          if (match.status === 'absent') return 'absent';
          if (match.status === 'half') return 'half';
        }

        if (date.getDay() === 0) return 'sunday';
        if (date.getDay() === 6) return 'saturday';

        return null;
      }}
    />
  );
};

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  border: none;

  .present abbr {
    background-color: ${({ theme }) => theme.colors.green} !important;
    color: #000;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  .absent abbr {
    background-color: ${({ theme }) => theme.colors.orange} !important;
    color: #000;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  .half abbr {
    background-color: ${({ theme }) => theme.colors.yellow} !important;
    color: #000;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  .react-calendar {
    width: 100%;

    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
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
    font-size: 16px;
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

  .react-calendar__navigation__label span {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  /* 날짜 셀 크기 축소 및 정사각형 비율 */
  .react-calendar__tile {
    padding: ${({ theme }) => theme.spacing[1]} !important;
    aspect-ratio: 16 / 9;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    background: transparent !important;
  }

  .react-calendar__tile abbr {
    font-size: ${({ theme }) => theme.fontSizes.base};
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  }

  .react-calendar__tile--active {
    color: white !important; /* ✅ 선택된 날짜 글자색 */
  }

  /* 오늘 날짜 (배경색 제거 + 테두리만) */
  .react-calendar__tile--now {
    background: transparent !important;
  }

  /* 오늘 날짜 스타일: 작고 테두리만 */
  .react-calendar__tile--now abbr {
    background: transparent;
  }
`;

export default AttendanceChildSchedule;
