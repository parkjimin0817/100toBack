import React from 'react';
import { useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { CiCalendar } from 'react-icons/ci';
import Button from '../../../components/Common/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { List } from '../../../components/ChildDummyData'; // 더미데이터 활용

const classList = Array.from(new Set(List.map((child) => child.className).filter(Boolean)));

const CheckListSearchBar = ({ selectedDate, setSelectedDate, selectedClass, setSelectedClass, onSearch }) => {
  return (
    <SearchBox>
      <SelectClass value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="" disabled>
          반 선택
        </option>
        {classList.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </SelectClass>
      <DateInputWrapper>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          locale={ko}
          dateFormat="yyyy.MM.dd (eee)" // 요일까지 출력!
          placeholderText="날짜 선택"
          maxDate={new Date()}
        />
        <CalendarIcon />
      </DateInputWrapper>
      <Button onClick={onSearch} width="50px" color="orange" hovercolor="lightorange">
        조회
      </Button>
    </SearchBox>
  );
};

export default CheckListSearchBar;

const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const SelectClass = styled.select`
  width: 100px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  margin-right: 5px;
  outline: none;
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 150px;
  margin-right: 5px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 30px;
  padding: 8px 12px;
  outline: none;
  padding-right: 36px; /* 아이콘 공간 확보 */
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CalendarIcon = styled(CiCalendar)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[500]};
  pointer-events: none;
`;
