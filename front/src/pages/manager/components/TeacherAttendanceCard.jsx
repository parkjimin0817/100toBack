import { useState } from 'react';
import ContentHeader from '../../../components/Common/ContentHeader';
import styled from 'styled-components';
import TeacherProfilePhoto from './TeacherProfilePhoto';
import TeacherAttendanceEditModal from './TeacherAttendanceEditModal';
import { attendanceStatusToKorean } from '../../../constants/attendanceStatusMap';

const TeacherAttendanceCard = ({ selectedDate, teacher, currentMonth, attendance, monthAttendance }) => {
  const [openModal, setOpenModal] = useState(false);
  const month = currentMonth.getMonth() + 1;
  const title = `${month}월 근태 관리`;
  //출퇴근 시간
  const inTime = attendance?.inTime
    ? new Date(attendance.inTime).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '-';
  const outTime = attendance?.outTime
    ? new Date(attendance.outTime).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '-';
  //출근 결근 count
  const workDayCount = monthAttendance.filter((att) => att.status === 'PRESENT').length;
  const absentCount = monthAttendance.filter((att) => att.status === 'ABSENT').length;

  return (
    <>
      <ContentHeader Title={title} Color={'blue'} FontSize={'sm'} />
      <TopContent>
        <ProfileDiv>
          <TeacherProfilePhoto teacher={teacher} />
        </ProfileDiv>
        <AttendanceCountBox>
          <AttendanceCount>
            <Name>출근</Name>
            <Count>{workDayCount}</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>결근</Name>
            <Count>{absentCount}</Count>
          </AttendanceCount>
        </AttendanceCountBox>
      </TopContent>
      <BottomContent>
        <AttendanceDetailBox>
          <AttendanceDetailDate>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })}
          </AttendanceDetailDate>
          <ButtonDiv>
            <AttendanceEditButton onClick={() => setOpenModal(true)}>근태 수정</AttendanceEditButton>
          </ButtonDiv>
          <DetailContent>
            <Table>
              <tbody>
                <tr>
                  <th>상태:</th>
                  <td>{attendanceStatusToKorean[attendance?.status] || '알 수 없음'}</td>
                </tr>
                <tr>
                  <th>출근시간: </th>
                  <td>{inTime}</td>
                </tr>
                <tr>
                  <th>퇴근시간: </th>
                  <td>{outTime}</td>
                </tr>
              </tbody>
            </Table>
          </DetailContent>
        </AttendanceDetailBox>
      </BottomContent>
      {openModal && (
        <TeacherAttendanceEditModal
          status={status}
          attendance={attendance}
          onClose={() => setOpenModal(false)}
          onEdit={(data) => {
            console.log(data);
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
};

export default TeacherAttendanceCard;

const TopContent = styled.div`
  width: 100%;
  display: flex;
`;

const BottomContent = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
`;

const ProfileDiv = styled.div`
  width: 200px;
  height: 200px;
`;

const AttendanceCountBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
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
  width: 300px;
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

const AttendanceEditButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const DetailContent = styled.div`
  width: 100%;
  height: 75%;
`;

const Table = styled.table`
  width: 50%;
  table-layout: fixed;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;

  th,
  td {
    padding: 8px;
    text-align: center;
    border: none;
    word-break: keep-all;
  }

  tbody > tr:first-child {
    height: 60px;
  }
`;
