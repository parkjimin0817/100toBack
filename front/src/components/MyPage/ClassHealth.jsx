import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import People from '../../assets/img/people.png';
import { useNavigate } from 'react-router-dom';
import { classService } from '../../api/class';

const ClassHealth = ({ classNo }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!classNo) return;

    const data = classService
      .getClassHealthLogProgress(classNo)
      .then((data) => setProgress(data))
      .catch((err) => console.error('건강 로그 현황 불러오기 실패 :', err));
      
    console.log("data : ", data);
  }, [classNo]);

  return (
    <>
      <AttendanceSection>
        <AttendanceHeaderRow>
          <AttendanceSectionTitle>아동 건강관리</AttendanceSectionTitle>
        </AttendanceHeaderRow>
        <MainAttendanceCard key={progress.class_no} onClick={() => navigate(`/childattendance/${item.class_no}`)}>
          <MainAttendanceClass>{progress.class_name}반 건강체크</MainAttendanceClass>
          <MainAttendanceEmoji>🙋</MainAttendanceEmoji>
          <MainAttendanceRate>{progress.completed}/{progress.child_count}</MainAttendanceRate>
        </MainAttendanceCard>
      </AttendanceSection>
    </>
  );
};

export default ClassHealth;

const ChildHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ChildSectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ContentLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: 15px;
  cursor: pointer;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.white};
  width: 56%;
  height: 43%;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const ContentProgress = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: 10px;
  margin-top: 10px;
`;

const ProgressHeader = styled.div``;

const ProgressBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const PeopleIcon = styled.img`
  margin-top: 5px;
  margin-right: 15px;
`;

const Progress = styled.div`
  margin-top: 5px;
`;



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
