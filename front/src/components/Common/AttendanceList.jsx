import React from 'react';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import { useState } from 'react';

const initialData = [
  { name: '김승기', status: '출석' },
  { name: '박지민', status: '결석' },
  { name: '양동민', status: '지각' },
  { name: '정형일', status: '출석' },
  { name: '정의철', status: '출석' },
  { name: '오오옹', status: '출석' },
  { name: '박지민', status: '결석' },
  { name: '디디디', status: '지각' },
  { name: '정형일', status: '출석' },
  { name: '정의철', status: '출석' },
];

const AttendanceList = ({ selectedDate }) => {
  const [data, setData] = useState(initialData);
  const [selectedStatus, setSelectedStatus] = useState('전체');

  const handleStatusChange = (index, newStatus) => {
    const updated = data.map((item, i) => (i === index ? { ...item, status: newStatus } : item));
    setData(updated);
  };

  const filteredData = selectedStatus === '전체' ? data : data.filter((item) => item.status === selectedStatus);

  const totalCount = initialData.length;
  const attendCount = initialData.filter((item) => item.status === '출석').length;
  const absentCount = initialData.filter((item) => item.status === '결석').length;
  const lateCount = initialData.filter((item) => item.status === '지각').length;

  return (
    <Wrapper>
      <ContentHeader Title="땡땡반 출석 현황" Color="orange" FontSize="base" />
      <DateRow>
        {selectedDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        })}
      </DateRow>
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
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
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
              {filteredData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>
                    <Button
                      $status="출석"
                      $active={item.status === '출석'}
                      onClick={() => handleStatusChange(index, '출석')}
                    >
                      출석
                    </Button>
                    <Button
                      $status="결석"
                      $active={item.status === '결석'}
                      onClick={() => handleStatusChange(index, '결석')}
                    >
                      결석
                    </Button>
                    <Button
                      $status="지각"
                      $active={item.status === '지각'}
                      onClick={() => handleStatusChange(index, '지각')}
                    >
                      지각
                    </Button>
                  </Td>
                </Tr>
              ))}
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
      case '출석':
        return '#4caf50'; // 초록
      case '결석':
        return '#f44336'; // 빨강
      case '지각':
        return '#ffc107'; // 노랑
      default:
        return '#e0e0e0';
    }
  }};
`;
