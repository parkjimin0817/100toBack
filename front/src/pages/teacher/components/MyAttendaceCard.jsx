import React from 'react';
import ContentHeader from '../../../components/Common/ContentHeader';
import styled from 'styled-components';

const StatusData = { in_time: '09:00', out_time: '18:00' };

const MyAttendaceCard = ({ selectedDate }) => {
  const isLeft = Boolean(StatusData.out_time); //퇴근 시간찍혀있으면 퇴근
  const statusLabel = isLeft ? '퇴근' : '출근';

  return (
    <>
      <ContentHeader Title="이번달 근태 현황" Color={'blue'} FontSize={'sm'} />
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
            <Count>7</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>결근</Name>
            <Count>7</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>조퇴</Name>
            <Count>7</Count>
          </AttendanceCount>
        </CountDiv>
        <DailyStatus></DailyStatus>
      </AttendanceCountBox>
      <AttendanceDetailBox>
        <AttendanceDetailDate>
          {selectedDate.toLocaleDateString('ko-KR', {
            day: '2-digit',
            weekday: 'short',
          })}
        </AttendanceDetailDate>
        <ButtonDiv>
          <Status $status={statusLabel} disabled>
            {statusLabel}
          </Status>
        </ButtonDiv>
        <DetailContent>
          {StatusData.in_time}~{StatusData.out_time}
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

const DailyStatus = styled.div``;

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

const Status = styled.button`
  width: 80px;
  height: 30px;
  background-color: ${({ $status }) => {
    if ($status === '출근') return '#4caf50'; // 초록
    if ($status === '퇴근') return '#9e9e9e'; // 회색
    return '#e0e0e0'; // 기본
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
