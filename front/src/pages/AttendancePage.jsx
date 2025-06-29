import React, { useEffect } from 'react';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import AttendanceList from '../components/Common/AttendanceList';
import { useNavigate, useParams } from 'react-router-dom';
import CustomCalendar from '../components/CustomCalendar';
import { useState } from 'react';
import { attendanceService } from '../api/attendance';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const AttendancePage = () => {
  const navigate = useNavigate();
  const { class_no } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD (ddd)'));
  const [attendanceInfo, setAttendanceInfo] = useState([]);

  //선택된 날짜
  const formatDate = dayjs(selectedDate).format('YYYY-MM-DD');

  const fetchData = async () => {
    try {
      const attendanceData = await attendanceService.classAttendance(class_no, formatDate);

      if (Array.isArray(attendanceData)) {
        setAttendanceInfo(attendanceData);
      } else {
        setAttendanceInfo([attendanceData]);
      }
    } catch (error) {
      console.error('출결 정보 조회 실패 :', error.message);
    }
  };

  useEffect(() => {
    if (class_no) {
      fetchData();
    }
  }, [selectedDate, class_no]);

  const handleDateClick = (date) => {
    const formatted = dayjs(date).format('YYYY-MM-DD (ddd)');
    setSelectedDate(formatted);
  };
  return (
    <Wrapper>
      <ContentHeader
        Title={'반 출결'}
        Color={'orange'}
        ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }]}
      />
      <Content>
        <Div1>
          <CustomCalendar onDateClick={(date) => handleDateClick(date)} />
        </Div1>
        <Div2>
          <AttendanceList
            class_no={class_no}
            create_date={formatDate}
            selectedDate={selectedDate}
            attendanceInfo={attendanceInfo}
            refetch={fetchData}
          />
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
