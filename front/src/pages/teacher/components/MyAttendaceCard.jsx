import React from 'react';
import ContentHeader from '../../../components/Common/ContentHeader';
import styled from 'styled-components';

const StatusData = { in_time: '09:00', out_time: '18:00' };

const MyAttendaceCard = ({ selectedDate, currentMonth, attendance, startDate, monthAttendance }) => {
  const month = currentMonth.getMonth() + 1;
  const title = `${month}월 근태 관리`;

  console.log(monthAttendance);

  const STATUS = {
    ABSENT: '결근',
    PRESENT: '출근',
    WORKING: '근무중',
    HOLIDAY: '공휴일',
    WEEKEND: '주말',
    VACATION: '휴가',
    WORKCATION: '워케이션',
  };

  //출퇴근 시간
  const inTime = attendance?.inTime
    ? new Date(attendance.inTime).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '미출근';
  const outTime = attendance?.outTime
    ? new Date(attendance.outTime).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '미퇴근';

  //출근 결근 count
  const filteredAttendances = monthAttendance.filter((att) => {
    const attDate = new Date(att.attendanceDate);
    const joinDate = new Date(startDate);
    return attDate >= joinDate;
  });
  const workDayCount = filteredAttendances.filter((att) => att.status === 'PRESENT').length;
  const absentCount = filteredAttendances.filter((att) => att.status === 'ABSENT').length;
  const vacationCount = filteredAttendances.filter(
    (att) => att.status === 'VACATION' || att.status === 'WORKCATION'
  ).length;

  return (
    <>
      <ContentHeader Title={title} Color={'blue'} FontSize={'sm'} />
      <AttendanceCountBox>
        <DateDiv>
          {selectedDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
          })}
          {selectedDate.toLocaleDateString('ko-KR', {
            month: '2-digit',
          })}
        </DateDiv>
        <CountDiv>
          <AttendanceCount>
            <Name>출근</Name>
            <Count>{workDayCount}</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>결근</Name>
            <Count>{absentCount}</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>휴가</Name>
            <Count>{vacationCount}</Count>
          </AttendanceCount>
        </CountDiv>
      </AttendanceCountBox>
      <AttendanceDetailBox>
        <AttendanceDetailDate>
          {selectedDate.toLocaleDateString('ko-KR', {
            day: '2-digit',
            weekday: 'short',
          })}
        </AttendanceDetailDate>
        <ButtonDiv>
          {attendance?.status ? (
            <Status $status={STATUS[attendance.status] || attendance.status}>
              {STATUS[attendance.status] || attendance.status}
            </Status>
          ) : (
            <Status $status="UNKNOWN">기록 없음</Status>
          )}
        </ButtonDiv>
        <DetailContent>
          {inTime} ~ {outTime}
        </DetailContent>
      </AttendanceDetailBox>
    </>
  );
};

export default MyAttendaceCard;

const AttendanceCountBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
`;

const DateDiv = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  display: flex;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
const CountDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const AttendanceCount = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  width: 40px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 0 0 5px;
`;

const Count = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AttendanceDetailBox = styled.div`
  margin: 10px auto;
  margin-top: 65px;
  width: 90%;
  height: 200px;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const AttendanceDetailDate = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  justify-content: center;
  padding-top: 4px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 0 0 5px;
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px 8px;
  display: flex;
  justify-content: flex-end;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  background-color: ${({ $status }) => {
    switch ($status) {
      case '출근':
        return '#4caf50'; // 초록
      case '결근':
        return '#f44336'; // 빨강
      case '근무중':
        return '#2196f3'; // 파랑
      case '공휴일':
        return '#9e9e9e'; // 주황
      case '주말':
        return '#9e9e9e'; // 회색
      case '휴가':
        return '#9c27b0'; // 보라
      case '워케이션':
        return '#00bcd4'; // 청록
      default:
        return '#e0e0e0'; // 기본 회색
    }
  }};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: default;
`;

const DetailContent = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
