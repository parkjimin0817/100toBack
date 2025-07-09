// 상담 일정 생성 모달
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { toast } from 'react-toastify';
import axios from 'axios';
import useLoginStore from '../../../store/loginStore';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from 'react-icons/ci';
import api from '../../../api/axios';

const CounselScheduleModal = ({ isOpen, onClose, classNo, onSuccess }) => {
  const [childList, setChildList] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [counselType, setCounselType] = useState('CHAT');
  const [counselDate, setCounselDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { member } = useLoginStore();

  useEffect(() => {
    if (!isOpen || !classNo) return;
    const fetchChildren = async () => {
      try {
        const res = await api.get(`http://localhost:8888/api/childs`, {
          params: { classNo },
        });
        setChildList(res.data);
      } catch (err) {
        toast.error('아동 목록 불러오기 실패');
      }
    };
    fetchChildren();
  }, [isOpen, classNo]);

  useEffect(() => {
    if (isOpen) {
      setSelectedChild('');
      setCounselType('CHAT');
      setCounselDate(new Date());
      setStartTime('');
      setEndTime('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedChild || !startTime || !endTime || !counselDate) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }
    if (startTime >= endTime) {
      toast.error('시간을 확인해주세요.');
      return;
    }

    try {
      const payload = {
        counselType,
        counselDate: counselDate.toISOString().split('T')[0],
        counselStart: startTime,
        counselEnd: endTime,
        centerNo: member.centerNo,
        memberNo: member.memberNo,
        childNo: selectedChild,
      };

      await api.post('http://localhost:8888/api/counsel/add', payload);
      toast.success('일정이 등록되었습니다.');
      onClose();
      onSuccess?.();
    } catch (err) {
      toast.error('일정 등록 실패');
    }
  };

  if (!isOpen) return null;

  return (
    <Backdrop /*onClick={onClose}*/>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>상담 일정 생성</ModalHeader>
        <ModalContent>
          <Row>
            <Label>아동 선택</Label>
            <Select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)}>
              <option value="" disabled>
                아동 선택
              </option>
              {childList.map((child) => (
                <option key={child.child_no} value={child.child_no}>
                  {child.child_name}
                </option>
              ))}
            </Select>
            <Label>상담 형태</Label>
            <Select value={counselType} onChange={(e) => setCounselType(e.target.value)}>
              <option value="FTOF">대면</option>
              <option value="CHAT">비대면</option>
            </Select>
          </Row>
          <Row>
            <Label>상담 시간</Label>
            <TimeInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <Span>--</Span>
            <TimeInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </Row>
          <Row>
            <Label>상담 날짜</Label>
            <DateInputWrapper>
              <StyledDatePicker
                selected={counselDate}
                onChange={(date) => setCounselDate(date)}
                locale={ko}
                dateFormat="yyyy.MM.dd (eee)"
              />
              <CalendarIcon />
            </DateInputWrapper>
          </Row>
        </ModalContent>
        <ModalFooter>
          <Button className="add" onClick={handleSubmit}>
            등록
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

export default CounselScheduleModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 600px;
  padding: ${({ theme }) => theme.spacing[5]};
`;

const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Label = styled.label`
  width: 20%;
  font-weight: bold;
`;

const Select = styled.select`
  width: 20%;
  height: 30px;
  padding: ${({ theme }) => theme.spacing[1]};
`;

const TimeInput = styled.input`
  width: 30%;
  height: 10%;
  padding: 5px;
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 180px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 30px;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  padding-right: 36px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.gray[400]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;

  &.add {
    background: ${({ theme }) => theme.colors.green};
  }
`;

const CalendarIcon = styled(CiCalendar)`
  position: absolute;
  right: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[500]};
  pointer-events: none;
`;
