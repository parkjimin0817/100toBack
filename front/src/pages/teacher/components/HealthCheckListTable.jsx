import React from 'react';
import styled from 'styled-components';

const HealthCheckListTable = ({ data }) => {
  return (
    <Wrapper>
      <VacationTable>
        <thead>
          <tr>
            <th>이름</th>
            <th>체온</th>
            <th>키</th>
            <th>몸무게</th>
            <th>증상</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          {data.map((child, index) => (
            <tr key={index}>
              <td>{child.name}</td>
              <td>{child.temp}℃</td>
              <td>{child.height}cm</td>
              <td>{child.weight}kg</td>
              <td>{child.symptom}</td>
              <td>{child.memo}</td>
            </tr>
          ))}
        </tbody>
      </VacationTable>
    </Wrapper>
  );
};

export default HealthCheckListTable;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
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
    width: 12%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 12%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 12%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 12%;
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 20%;
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 32%;
    text-align: left;
  }
`;
