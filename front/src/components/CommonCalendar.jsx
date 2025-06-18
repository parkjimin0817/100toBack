import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const CommonCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <StyledCalendar
        calendarType="gregory"
        value={value}
        onChange={onChange}
        tileClassName={({ date }) => {
          const day = date.getDay();
          if (day === 0) return 'sunday'; // 일요일
          if (day === 6) return 'saturday'; // 토요일
          return null;
        }}
        navigationLabel={({ date }) => (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>{date.getFullYear()}년</span>
            <span>{date.getMonth() + 1}월</span>
          </div>
        )}
      />
    </>
  );
};

export default CommonCalendar;

const StyledCalendar = styled(Calendar)`
  border: none;
  width: 100%;
  margin: 0 auto;
  padding: 5px;
  font-family: Pretendard, sans-serif;
  border-radius: 20px;

  /* 📅 상단 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.orange};
    border-bottom: 1px solid ${({ theme }) => theme.colors.orange};
    height: 80px;

    button {
      background: none;
      border: none;
      outline: none; /* ✅ focus 테두리 제거 */
      box-shadow: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: default;
    }

    button:enabled:hover {
      color: ${({ theme }) => theme.colors.yellow};
    }

    span {
      font-size: 18px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.black};
      line-height: 1.2;
    }
  }

  /* 🗓 요일 헤더 */
  .react-calendar__month-view__weekdays {
    padding: 10px 0;
    abbr {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      text-decoration: none;
    }
  }

  /* 📆 각 날짜 셀 */
  .react-calendar__tile {
    text-align: center;
    height: 80px;
    padding: 10px 0;
    border-radius: 10px;
    transition: background 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    abbr {
      font-size: 16px;
      font-weight: 500;
    }
  }

  /* 📌 오늘 날짜 */
  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.orange};
    color: white;
    font-weight: bold;
  }

  /* ✅ 선택/포커스/호버 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.yellow};
    color: white;
    font-weight: bold;
  }

  /* 🟥 일요일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(1),
  .react-calendar__tile.sunday {
    color: ${({ theme }) => theme.colors.orange};
  }

  /* 🟦 토요일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(7),
  .react-calendar__tile.saturday {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
