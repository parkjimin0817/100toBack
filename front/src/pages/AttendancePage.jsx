import React from 'react';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import AttendanceList from '../components/Common/AttendanceList';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from './common/CustomCalendar';
import { useState } from 'react';

const data = [
  { name: '박지민', child_no: '1', class_no: '1', create_date: '2025-06-18', status: 'present' },
  { name: '김승기', child_no: '2', class_no: '1', create_date: '2025-06-18', status: 'absent' },
  { name: '양동민', child_no: '3', class_no: '1', create_date: '2025-06-18', status: 'half' },
  { name: '정형일', child_no: '4', class_no: '1', create_date: '2025-06-18', status: 'present' },
  { name: '정의철', child_no: '5', class_no: '1', create_date: '2025-06-18', status: 'present' },
  { name: '지피티', child_no: '6', class_no: '1', create_date: '2025-06-18', status: 'present' },
];

const AttendancePage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Wrapper>
      <ContentHeader
        Title={'반 출결'}
        Color={'orange'}
        ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }]}
      />
      <Content>
        <Div1>
          <CustomCalendar onDateClick={(date) => setSelectedDate(date)} />
        </Div1>
        <Div2>
          <AttendanceList selectedDate={selectedDate} />
        </Div2>
      </Content>
    </Wrapper>
  );
};

export default AttendancePage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const Div1 = styled.div`
  width: 60%;
  min-height: 500px;
  margin: 10;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Div2 = styled.div``;
