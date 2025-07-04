import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import TeacherAttendanceCard from './components/TeacherAttendanceCard';
import TeacherAttendanceCalendar from '../../components/Common/TeacherAttendanceCalendar';
import { useNavigate, useParams } from 'react-router-dom';
import { attendanceService } from '../../api/attendance';
import { memberService } from '../../api/member';
import useLoginStore from '../../store/loginStore';

const TeacherAttendance = () => {
  const { memberNo } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [teacher, setTeacher] = useState({});
  const [attendances, setAttendances] = useState([]);
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const startDate = new Date(teacher.decision_date);
  const today = new Date();

  //뒤로가기 버튼
  const navigate = useNavigate();
  const backButton = {
    Title: '뒤로가기',
    func: () => navigate('/manager/teacherlist'),
  };

  //근태 수정후 월별 데이터 재조회
  const fetchAttendances = async () => {
    try {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      const data = await attendanceService.teacherAttendance(memberNo, centerNo, year, month);
      setAttendances(data);
    } catch (err) {
      console.log('근태 기록 조회 실패 : ', err);
    }
  };

  //월별 데이터 불러오기
  useEffect(() => {
    if (!memberNo || !currentMonth) return;
    fetchAttendances(); //중복되니까 재사용
  }, [memberNo, currentMonth]);

  //교사 데이터
  useEffect(() => {
    if (!memberNo) return;

    memberService
      .getTeacherDetail(memberNo)
      .then((data) => setTeacher(data))
      .catch((err) => console.error('교사 상세 정보 불러오기 실패', err));
  }, [memberNo]);

  //고른 날짜 근태 데이터
  const selectedRecord = attendances.find((attendance) => {
    const date = new Date(attendance.attendanceDate).toDateString(); // 날짜만 꺼내기
    const selected = selectedDate.toDateString(); //선택 날짜에서 날짜만 꺼내기
    return date === selected;
  });

  return (
    <Wrapper>
      <ContentHeader Title={'교사 근태 관리'} Color={'blue'} ButtonProps={[backButton]} />
      <Content>
        <Div1>
          <TeacherAttendanceCalendar
            onDateClick={(date) => setSelectedDate(date)}
            onMonthChange={(date) => {
              setCurrentMonth(date);
              const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
              setSelectedDate(firstDayOfMonth);
            }}
            monthlyAttendanceList={attendances}
            disableFuture={true}
            minDate={startDate}
            maxDate={today}
          />
        </Div1>
        <Div2>
          <TeacherAttendanceCard
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            monthAttendance={attendances}
            attendance={selectedRecord}
            teacher={teacher}
            minDate={startDate}
            maxDate={today}
            onUpdateAttendances={fetchAttendances}
          />
        </Div2>
      </Content>
    </Wrapper>
  );
};

export default TeacherAttendance;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
  min-height: 630px;
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
