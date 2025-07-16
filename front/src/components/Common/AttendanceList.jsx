import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import { useState } from 'react';
import { attendanceService } from '../../api/attendance';
import { toast } from 'react-toastify';
import useLoginStore from '../../store/loginStore';

const AttendanceList = ({ class_no, create_date, selectedDate, attendanceInfo, refetch }) => {
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [childNo, setChildNo] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { member } = useLoginStore();

  const handleStatusChange = (child_no, status) => {
    setChildNo(child_no);
    setStatus(status);
  };
  if (member.memberType !== 'TEACHER' && member.memberType !== 'MANAGER') {
    toast.warn('권한이 없습니다.');
    return;
  }

  const filteredDatas =
    selectedStatus === '전체' ? attendanceInfo : attendanceInfo.filter((item) => item.status === selectedStatus);

  const totalCount = attendanceInfo.length;
  const attendCount = attendanceInfo.filter((item) => item.status === 'PRESENT').length;
  const absentCount = attendanceInfo.filter((item) => item.status === 'ABSENT').length;
  const lateCount = attendanceInfo.filter((item) => item.status === 'HALF').length;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (member.memberType === 'PRESENT') {
      toast.warn('변경 권한이 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const updateStatus = await attendanceService.updateChildAttendance(childNo, class_no, create_date, status);
      if (!updateStatus) {
        throw new Error('출결 상태 변경에 실패했습니다.');
      }
      toast.success('변경 성공');

      await refetch();
    } catch (error) {
      setError('출결 상태 변경에 실패했습니다.');
      toast.error('출결 상태 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <ContentHeader Title={`반 출석 현황`} Color="orange" FontSize="base" />
      <DateRow>{selectedDate}</DateRow>
      <Div>
        <AttendanceCount>
          <Name>전체</Name>
          <Count>{totalCount}</Count>
        </AttendanceCount>
        <AttendanceCount>
          <Name>출석</Name>
          <Count>{attendCount}</Count>
        </AttendanceCount>
        <AttendanceCount>
          <Name>결석</Name>
          <Count>{absentCount}</Count>
        </AttendanceCount>
        <AttendanceCount>
          <Name>지각</Name>
          <Count>{lateCount}</Count>
        </AttendanceCount>
      </Div>
      <SelectDiv>
        <Select name="" id="" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="전체">전체</option>
          <option value="PRESENT">출석</option>
          <option value="ABSENT">결석</option>
          <option value="HALF">지각</option>
        </Select>
      </SelectDiv>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>출결상태</Th>
            </Tr>
          </Thead>
        </Table>
        <TbodyWrapper>
          <Table>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td>불러오는 중...</Td>
                </Tr>
              ) : (
                filteredDatas.map((item) => (
                  <Tr key={item.child_no}>
                    <Td>{item.child_name}</Td>
                    <Td>
                      <form onSubmit={onSubmit}>
                        <Button
                          onClick={() => handleStatusChange(item.child_no, 'PRESENT')}
                          $status="PRESENT"
                          $active={item.status === 'PRESENT'}
                          type="submit"
                        >
                          출석
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(item.child_no, 'ABSENT')}
                          $status="ABSENT"
                          $active={item.status === 'ABSENT'}
                          type="submit"
                        >
                          결석
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(item.child_no, 'HALF')}
                          $status="HALF"
                          $active={item.status === 'HALF'}
                          type="submit"
                        >
                          지각
                        </Button>
                      </form>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TbodyWrapper>
      </TableWrapper>
    </Wrapper>
  );
};

export default AttendanceList;

const Wrapper = styled.div`
  border-radius: 10px;
  width: 330px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const DateRow = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  padding: 20px 0 0 20px;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const AttendanceCount = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme }) => theme.colors.orange};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  width: 40px;
  background-color: ${({ theme }) => theme.colors.orange};
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

const SelectDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0 5px;
  padding: 15px;
`;

const Select = styled.select`
  border: 3px solid ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  width: 100px;
  height: 30px;
  outline: none;
`;

const TableWrapper = styled.div`
  max-height: 340px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
`;

const TbodyWrapper = styled.div`
  height: 300px;
  overflow-y: auto;

  /* 스크롤 영역에 헤더 너비 맞추기 */
  /* table {
    width: 100%;
  } */
`;

const Table = styled.table`
  width: 300px;
  text-align: center;
  table-layout: fixed;
  transition: none;

  th:nth-child(1),
  td:nth-child(1) {
    width: 30%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 60%;
  }
`;

const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.orange};
  color: white;
  border-top: 1px solid black;
`;

const Th = styled.th`
  padding: 12px 10px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid black;
`;

const Td = styled.td`
  padding: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  margin-right: 6px;
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: none;

  color: ${({ $active }) => ($active ? 'white' : 'gray')};
  background-color: ${({ $status, $active }) => {
    if (!$active) return '#e0e0e0';
    switch ($status) {
      case 'PRESENT':
        return '#4caf50'; // 초록
      case 'ABSENT':
        return '#f44336'; // 빨강
      case 'HALF':
        return '#ffc107'; // 노랑
      default:
        return '#e0e0e0';
    }
  }};
`;
