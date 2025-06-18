import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  return (
    <StyledCalendar
      calendarType="gregory"
      formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
      prev2Label={null}
      next2Label={null}
      minDetail="year"
      maxDetail="month"
      tileClassName={({ date, view }) => {
        if (view === 'month' && date.getDay() === 0) {
          return 'sunday';
        } else if (view === 'month' && date.getDay() === 6) {
          return 'saturday';
        }
      }}
    />
  );
};

const StyledCalendar = styled(Calendar)`
  width: 90%;
  height: 90%;
  border: none;

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

  /* 날짜 셀 크기 축소 및 정사각형 비율 */
  .react-calendar__tile {
    padding: ${({ theme }) => theme.spacing[1]} !important;
    aspect-ratio: 1 / 1;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    background: transparent !important;
  }

  .react-calendar__tile abbr {
    font-size: ${({ theme }) => theme.fontSizes.xs};
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
`;

export default CustomCalendar;
