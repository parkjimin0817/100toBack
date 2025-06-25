import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import TeacherAttendanceCard from './components/TeacherAttendanceCard';
import CustomCalendar from '../../components/CustomCalendar';
import { useParams } from 'react-router-dom';
import { attendanceService } from '../../api/attendance';

const TeacherAttendance = () => {
  const { memberNo } = useParams();
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    if (!memberNo) return;

    attendanceService
      .teacherAttendance(memberNo)
      .then((data) => setAttendances(data))
      .catch((err) => console.error('교사 근태 목록 불러오기 실패', err));
  }, [memberNo]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Wrapper>
      <ContentHeader Title={'교사 근태 관리'} Color={'blue'} />
      <Content>
        <Div1>
          <CustomCalendar onDateClick={(date) => setSelectedDate(date)} />
        </Div1>
        <Div2>
          <TeacherAttendanceCard selectedDate={selectedDate} />
        </Div2>
      </Content>
    </Wrapper>
  );
};

export default TeacherAttendance;

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

const Div2 = styled.div`
  width: 30%;
  min-height: 500px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
