import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAttendanceStore from '../../store/attendanceStore';
import { attendanceService } from '../../api/attendance';
import { toast } from 'react-toastify';

const AttendanceButton = ({ member }) => {
  const memberNo = member?.memberNo;
  const { attendance, setAttendance } = useAttendanceStore();

  const { inTime, outTime } = attendance;

  const getButtonLabel = () => {
    if (!inTime) return '출근';
    if (inTime && !outTime) return '퇴근';
    return '출근';
  };

  const getButtonColor = () => {
    if (!inTime) return 'green';
    if (inTime && !outTime) return 'orange';
    return 'gray';
  };

  //출근 기록하기
  const handleWorkIn = async () => {
    try {
      const data = await attendanceService.workIn(memberNo);
      setAttendance(data);
      toast.success('출근 완료되었습니다.');
    } catch (err) {
      console.error('출근 기록 실패 : ', err);
      toast.error('출근 기록이 안되었습니다. 다시 시도해주세요.');
    }
  };

  //퇴근 기록하기
  const handleWorkOut = async () => {
    try {
      // 퇴근 확인 메세지 출력
      const isConfirmed = window.confirm("퇴근하시겠습니까?");
      if (!isConfirmed) return;

      const data = await attendanceService.workOut(memberNo);
      setAttendance(data);
      toast.success('퇴근 완료되었습니다.');
    } catch (err) {
      console.error('퇴근 기록 실패 : ', err);
      toast.error('퇴근 기록이 안되었습니다. 다시 시도해주세요.');
    }
  };

  const isDisabled = inTime && outTime;

  return (
    <AttendanceBox>
      <Button
        onClick={!inTime ? handleWorkIn : !outTime ? handleWorkOut : null}
        $color={getButtonColor()}
        disabled={isDisabled}
      >
        {getButtonLabel()}
      </Button>
    </AttendanceBox>
  );
};

export default AttendanceButton;

const AttendanceBox = styled.div`
  margin: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${({ theme, $color }) => {
    if ($color === 'green') return theme.colors.green;
    if ($color === 'orange') return theme.colors.orange;
    return theme.colors.gray[400];
  }};
  width: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
