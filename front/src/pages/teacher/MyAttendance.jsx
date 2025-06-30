import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import MyAttendaceCard from './components/MyAttendaceCard';
import TeacherAttendanceCalendar from '../../components/Common/TeacherAttendanceCalendar';
import useLoginStore from '../../store/loginStore';
import { attendanceService } from '../../api/attendance';
import { memberService } from '../../api/member';

const MyAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendances, setAttendances] = useState([]);
  const [teacher, setTeacher] = useState({});
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const memberNo = member?.memberNo;

  //월별 데이터 불러오기
  useEffect(() => {
    if (!memberNo || !currentMonth) return;

    const year = currentMonth.getFullYear(); //2025
    const month = currentMonth.getMonth() + 1; //0부터 시작해서 +1

    attendanceService
      .teacherAttendance(memberNo, centerNo, year, month)
      .then((data) => setAttendances(data))
      .catch((err) => console.error('교사 근태 달별 목록 불러오기 실패', err));
  }, [memberNo, currentMonth]);

  //입사일 가져오기
  useEffect(() => {
    if (!memberNo) return;

    memberService
      .getTeacherDetail(memberNo)
      .then((data) => setTeacher(data))
      .catch((err) => console.error('교사 상세 정보 불러오기 실패', err));
  }, [memberNo]);

  const joinDate = new Date(teacher.decision_date);

  //고른 날짜 근태 데이터
  const selectedRecord =
    attendances.find((attendance) => {
      const date = new Date(attendance.attendanceDate).toDateString(); // 날짜만 꺼내기
      const selected = selectedDate.toDateString(); //선택 날짜에서 날짜만 꺼내기
      return date === selected;
    }) || null;

  const today = new Date();
  const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return (
    <div>
      <Wrapper>
        <ContentHeader Title={' 근태 관리'} Color={'blue'} />
        <Content>
          <Div1>
            <TeacherAttendanceCalendar
              onDateClick={(date) => setSelectedDate(date)}
              onMonthChange={(date) => setCurrentMonth(date)}
              monthlyAttendanceList={attendances}
              disableFuture={true}
              minDate={joinDate}
              maxDate={lastDateOfMonth}
            />
          </Div1>
          <Div2>
            <MyAttendaceCard
              selectedDate={selectedDate}
              currentMonth={currentMonth}
              monthAttendance={attendances}
              attendance={selectedRecord}
              startDate={joinDate}
            />
          </Div2>
        </Content>
      </Wrapper>
    </div>
  );
};

export default MyAttendance;

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
