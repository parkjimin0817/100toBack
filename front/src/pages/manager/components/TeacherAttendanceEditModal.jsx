import React, { useState } from 'react';
import styled from 'styled-components';

const TeacherAttendanceEditModal = ({ onClose, onEdit, attendance, memberNo, centerNo }) => {
  const [status, setStatus] = useState(attendance?.status || '');
  const [inTime, setInTime] = useState(() => {
    if (!attendance.inTime) return '';
    return attendance.inTime.slice(11, 16);
  });
  const [outTime, setOutTime] = useState(() => {
    if (!attendance.outTime) return '';
    return attendance.outTime.slice(11, 16);
  });

  //폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    const fullInTime = inTime ? `${attendance.attendanceDate}T${inTime}` : null;
    const fullOutTime = outTime ? `${attendance.attendanceDate}T${outTime}` : null;

    onEdit({
      ...attendance,
      attendance: attendance.attendanceDate,
      status,
      inTime: fullInTime,
      outTime: fullOutTime,
      memberNo: memberNo,
      centerNo: centerNo,
    });
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Title>근태 수정하기</Title>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Label>
              상태:
              <Select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PRESENT">출근</option>
                <option value="ABSENT">결근</option>
                <option value="WORKING">근무중</option>
                <option value="HOLIDAY">공휴일</option>
                <option value="WEEKEND">주말</option>
                <option value="VACATION">휴가</option>
                <option value="WORKCATION">워케이션</option>
              </Select>
            </Label>
            <br />
            <Label>
              출근시간:
              <Input type="time" name="startTime" value={inTime} onChange={(e) => setInTime(e.target.value)} />
            </Label>
            <br />
            <Label>
              퇴근시간:
              <Input type="time" name="endTime" value={outTime} onChange={(e) => setOutTime(e.target.value)} />
            </Label>
            <br />
            <ButtonGroup>
              <Button type="close" onClick={onClose}>
                닫기
              </Button>
              <Button type="submit">저장</Button>
            </ButtonGroup>
          </Form>
        </Content>
      </Card>
    </Overlay>
  );
};

export default TeacherAttendanceEditModal;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  width: 400px;
  max-height: 600px;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Content = styled.div``;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: ${({ type }) => (type === 'agree' ? '10px' : '0')};
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
`;

const Form = styled.form`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Select = styled.select`
  width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  margin-left: 10px;
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Input = styled.input`
  width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  margin-left: 10px;
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;
