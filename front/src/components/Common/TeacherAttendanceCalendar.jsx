import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const TeacherAttendanceCalendar = ({ onDateClick, onMonthChange, disableFuture = false, minDate, maxDate }) => {
  const today = new Date();
  const [holidays, setHolidays] = useState([]);
  const [activeMonth, setActiveMonth] = useState(new Date());

  useEffect(() => {
    const fetchHolidays = async () => {
      const year = activeMonth.getFullYear();
      const month = activeMonth.getMonth() + 1;

      try {
        const { data } = await axios.get(`http://localhost:8888/api/holiday?year=${year}&month=${month}`);
        setHolidays(data);
      } catch (error) {
        console.error('공휴일 불러오기 실패 :', error);
      }
    };
    fetchHolidays();
  }, [activeMonth]);
  return (
    <StyledCalendar
      calendarType="gregory"
      formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
      prev2Label={null}
      next2Label={null}
      minDetail="year"
      maxDetail="month"
      onClickDay={onDateClick}
      //onActiveStartDateChange : 보여주는 달이 바뀔 때 실행되는 react-calendar의 props
      onActiveStartDateChange={({ activeStartDate }) => {
        setActiveMonth(activeStartDate);
        onMonthChange?.(activeStartDate);
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
          if (holiday) {
            return (
              <div
                style={{
                  fontSize: '0.6rem',
                  color: 'red',
                  position: 'absolute',
                  top: '75%',
                  width: '100%',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  lineHeight: '1.1',
                  padding: '0 2px',
                }}
              >
                {holiday.holiday_name}
              </div>
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

const StyledCalendar = styled(Calendar)`
  width: 90%;
  height: 90%;
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

export default TeacherAttendanceCalendar;
