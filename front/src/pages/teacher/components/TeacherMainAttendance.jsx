import React from 'react';
import styled from 'styled-components';

const TeacherMainAttendance = () => {
  const classData = [
    { className: '햇님반', rate: '90%', icon: '🙋' },
    { className: '달님반', rate: '85%', icon: '🌙' },
    { className: '별님반', rate: '92%', icon: '⭐' },
    { className: '구름반', rate: '88%', icon: '☁️' },
  ];

  return (
    <AttendanceSection>
      <AttendanceHeaderRow>
        <AttendanceSectionTitle>출결관리</AttendanceSectionTitle>
      </AttendanceHeaderRow>
      <AttendanceGrid>
        {classData.map((item, index) => (
          <MainAttendanceCard key={index}>
            <MainAttendanceClass>{item.className} 출석률</MainAttendanceClass>
            <MainAttendanceEmoji>{item.icon}</MainAttendanceEmoji>
            <MainAttendanceRate>{item.rate}</MainAttendanceRate>
          </MainAttendanceCard>
        ))}
      </AttendanceGrid>
    </AttendanceSection>
  );
};

export default TeacherMainAttendance;

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

const AttendanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
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
