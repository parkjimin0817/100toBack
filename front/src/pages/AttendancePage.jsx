import React from 'react';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import CommonCalendar from '../components/CommonCalendar';
import AttendanceList from '../components/Common/AttendanceList';
import { useNavigate } from 'react-router-dom';

const AttendancePage = () => {
  const navigate = useNavigate();
  return (
    <Content>
      <ContentHeader
        Title={'반 출결'}
        Color={'orange'}
        ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }]}
      />
      <Wrapper>
        <CalendarWrapper>
          <CommonCalendar />
        </CalendarWrapper>
        <AttendanceList />
      </Wrapper>
    </Content>
  );
};

export default AttendancePage;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const CalendarWrapper = styled.div`
  width: 60%;
  display: flex;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
