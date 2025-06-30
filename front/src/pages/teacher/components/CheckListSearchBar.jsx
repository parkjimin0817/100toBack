import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { CiCalendar } from 'react-icons/ci';
import Button from '../../../components/Common/Button';
import 'react-datepicker/dist/react-datepicker.css';

const CheckListSearchBar = ({
  selectedDate,
  setSelectedDate,
  selectedClassNo,
  setSelectedClassNo,
  onSearch,
  classList,
}) => {
  return (
    <SearchBox>
      <SelectClass value={selectedClassNo} onChange={(e) => setSelectedClassNo(e.target.value)}>
        <option value="" disabled>
          반 선택
        </option>
        {Array.isArray(classList) &&
          classList.map((cls) => (
            <option key={cls.class_no} value={cls.class_no}>
              {cls.class_name}
            </option>
          ))}
      </SelectClass>
      <DateInputWrapper>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          locale={ko}
          dateFormat="yyyy.MM.dd (eee)"
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

// 스타일 컴포넌트는 이전 코드 그대로 유지

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
  padding-right: 36px;
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
