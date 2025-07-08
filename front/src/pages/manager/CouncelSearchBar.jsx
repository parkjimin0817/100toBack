import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { CiCalendar } from 'react-icons/ci';
import Button from '../../components/Common/Button';
import 'react-datepicker/dist/react-datepicker.css';

const CouncelSearchBar = ({
  selectedStatus,
  setSelectedStatus,
  dateFilterType,
  setDateFilterType,
  selectedDate,
  setSelectedDate,
  onSearch,
  onCreate,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <SearchBox>
      <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="ALL">전체보기</option>
        <option value="PENDING">상담대기</option>
        <option value="COMPLETED">상담완료</option>
      </Select>

      <Select value={dateFilterType} onChange={(e) => setDateFilterType(e.target.value)}>
        <option value="ALL">전체</option>
        <option value="DATE">날짜 선택</option>
      </Select>

      {dateFilterType === 'DATE' && (
        <DateInputWrapper>
          <StyledDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            locale={ko}
            dateFormat="yyyy.MM.dd (eee)"
            placeholderText="날짜 선택"
          />
          <CalendarIcon />
        </DateInputWrapper>
      )}

      <Button onClick={onSearch} width="50px" color="orange" hovercolor="lightorange">
        조회
      </Button>
      <Button onClick={onCreate} width="50px" color="orange" hovercolor="lightorange">
        생성
      </Button>
    </SearchBox>
  );
};

export default CouncelSearchBar;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 8px;
`;

const Select = styled.select`
  width: 120px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  outline: none;
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 180px;
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
