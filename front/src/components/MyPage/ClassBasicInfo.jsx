import React from 'react'
import styled from 'styled-components';
import ClassAttendance from './ClassAttendance';
import ClassHealth from './ClassHealth';

const ClassBasicInfo = ({ classNo }) => {
  return (
    <>
      <CareContainer>
        <h2>반 정보</h2>
        <AttendanceBox>
          <ClassAttendance classNo={classNo}></ClassAttendance>
        </AttendanceBox>
        <AttendanceBox>
          <ClassHealth classNo={classNo} />
        </AttendanceBox>
      </CareContainer>
    </>
  )
}

export default ClassBasicInfo;

const CareContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
  padding: 30px;
`;

const AttendanceBox = styled.div`
  /* box-shadow: ${({ theme }) => theme.shadows.md}; */
  margin: 40px 0px 0px 15px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  height: 70%;
  padding: 20px; //  여백 추가
  box-sizing: border-box;
`;