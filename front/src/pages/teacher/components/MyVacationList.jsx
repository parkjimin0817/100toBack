import React from 'react';
import styled from 'styled-components';

const data = [
  {
    id: 1,
    type: '휴가-연차',
    startDate: '2025.06.23',
    endDate: '2025.06.25',
    reason: '하와이 갔다오려구요 길게 쓰면 ㅇㄹㅇㄹㅇㄹㅇㄹ어떻게 돼지',
    file: 'hawai.docx',
    status: '승인',
  },
  {
    id: 2,
    type: '병가',
    startDate: '2025.06.23',
    endDate: '2025.06.25',
    reason: '감기몸살',
    file: '',
    status: '거절',
  },
  {
    id: 3,
    type: '병가',
    startDate: '2025.06.23',
    endDate: '2025.06.25',
    reason: '웱',
    file: '',
    status: '대기',
  },
];

const MyVacationList = () => {
  return (
    <Wrapper>
      <VacationTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>종류</th>
            <th>날짜</th>
            <th>사유</th>
            <th>첨부파일</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vacation, index) => (
            <tr key={vacation.id}>
              <td>{index + 1}</td>
              <td>{vacation.type}</td>
              <td>
                {vacation.startDate}-{vacation.endDate}
              </td>
              <td>{vacation.reason}</td>
              <td>{vacation.file || ''}</td>
              <td>
                <Status disabled $status={vacation.status}>
                  {vacation.status}
                </Status>
              </td>
            </tr>
          ))}
        </tbody>
      </VacationTable>
    </Wrapper>
  );
};

export default MyVacationList;

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const VacationTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    word-wrap: break-word;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 6%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 12%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 20%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 35%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 15%;
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 12%;
  }
`;

const Status = styled.button`
  width: 50px;
  background-color: ${({ theme, $status }) => {
    if ($status === '승인') return theme.colors.green; // 초록
    if ($status === '대기') return theme.colors.gray[500]; // 회색
    if ($status === '거절') return theme.colors.orange; // 회색
  }};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: default;
`;
