import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { classService } from '../../api/class';

const ClassAttendance = ({ classNo }) => {
  const [rate, setRate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!classNo) return;

    classService
      .getAttendanceClassRate(classNo)
      .then((data) => setRate(data))
      .catch((err) => console.error('반 출석률 불러오기 실패', err));
  }, [classNo]);

  return (
    <AttendanceSection>
      <AttendanceHeaderRow>
        <AttendanceSectionTitle>출결관리</AttendanceSectionTitle>
      </AttendanceHeaderRow>
      <MainAttendanceCard key={rate.class_no} onClick={() => navigate(`/childattendance/${item.class_no}`)}>
        <MainAttendanceClass>{rate.class_name}반 출석률</MainAttendanceClass>
        <MainAttendanceEmoji>{rate.icon}🙋</MainAttendanceEmoji>
        <MainAttendanceRate>{rate.attendance_rate}%</MainAttendanceRate>
      </MainAttendanceCard>
    </AttendanceSection>
  );
};

export default ClassAttendance;

const AttendanceSection = styled.div``;

const AttendanceHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const AttendanceSectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const MainAttendanceCard = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const MainAttendanceClass = styled.div`
  font-size: 13px;
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
`;

const MainAttendanceEmoji = styled.div`
  font-size: 28px;
`;

const MainAttendanceRate = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #00aaff;
  margin-top: 5px;
`;
