import { useState } from 'react';
import ContentHeader from '../../../components/Common/ContentHeader';
import styled from 'styled-components';
import TeacherProfilePhoto from './TeacherProfilePhoto';
import TeacherAttendanceEditModal from './TeacherAttendanceEditModal';
import { attendanceStatusToKorean } from '../../../constants/attendanceStatusMap';
import { attendanceService } from '../../../api/attendance';
import { toast } from 'react-toastify';

const TeacherAttendanceCard = ({
  selectedDate,
  teacher,
  currentMonth,
  attendance,
  monthAttendance,
  minDate,
  maxDate,
  onUpdateAttendances,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const month = currentMonth.getMonth() + 1;
  const title = `${month}월 근태 관리`;

  //teacher의 memberNo, centerNo
  const memberNo = teacher?.member_no;
  const centerNo = teacher?.center_no;
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
  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(23, 59, 59, 999);

  const filteredAttendances = monthAttendance.filter((att) => {
    const date = new Date(att.attendanceDate);
    return date >= minDate && date <= maxDate;
  });

  const workDayCount = filteredAttendances.filter((att) => att.status === 'PRESENT').length;
  const absentCount = filteredAttendances.filter((att) => att.status === 'ABSENT').length;

  //근태 수정
  const onEdit = async (type, attendanceNo, data) => {
    try {
      console.log('전달 데이터: ', data);

      if (type === 'update') {
        await attendanceService.updateTeacherAttendance(attendanceNo, data);
        toast.success('근태 정보가 수정되었습니다.');
      } else if (type === 'create') {
        await attendanceService.createTeacherAttendance(data);
        toast.success('근태 정보가 생성되었습니다.');
      }

      await onUpdateAttendances(); // 목록 재조회
      setOpenModal(false);
    } catch (err) {
      console.error('근태 처리 실패:', err.response?.data?.message || err.message);
      toast.error('근태 처리 중 오류가 발생했습니다.');
    }
  };

  const STATUS = {
    ABSENT: '결근',
    PRESENT: '출근',
    WORKING: '근무중',
    HOLIDAY: '공휴일',
    WEEKEND: '주말',
    VACATION: '휴가',
    WORKCATION: '워케이션',
  };

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
                  <td>
                    {attendance?.status ? (
                      <Status $status={STATUS[attendance.status] || attendance.status}>
                        {STATUS[attendance.status] || attendance.status}
                      </Status>
                    ) : (
                      <Status $status="UNKNOWN">기록 없음</Status>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>출근시간:</th>
                  <td>{inTime || '-'}</td>
                </tr>
                <tr>
                  <th>퇴근시간:</th>
                  <td>{outTime || '-'}</td>
                </tr>
              </tbody>
            </Table>
          </DetailContent>
        </AttendanceDetailBox>
      </BottomContent>
      {openModal && (
        <TeacherAttendanceEditModal
          selectedDate={selectedDate}
          memberNo={memberNo}
          centerNo={centerNo}
          attendance={attendance}
          onClose={() => setOpenModal(false)}
          onEdit={onEdit}
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
  /* width: 50%; */
  table-layout: fixed;
  margin: 25px auto;
  border-collapse: collapse;
  border-spacing: 0;

  th,
  td {
    padding: 5px;
    text-align: center;
    border: none;
    word-break: keep-all;
  }
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case '근무중':
        return '#2196f3'; // 파랑
      case '출근':
        return '#4caf50'; // 초록
      case '결근':
        return '#f44336'; // 빨강
      default:
        return theme.colors.lightblue; // 기본값
    }
  }};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: default;
`;
