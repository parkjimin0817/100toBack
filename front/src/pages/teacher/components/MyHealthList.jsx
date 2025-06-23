import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const data = [
  {
    name: '박지민',
    createDate: '2025.06.23',
    symptom: '감기',
  },
  {
    name: '박지민',
    createDate: '2025.06.23',
    symptom: '감기',
  },
  {
    name: '박지민',
    createDate: '2025.06.23',
    symptom: '감기',
  },
];

const MyHealthList = () => {
  const navigate = useNavigate();
  const handleClick = (index) => {
    navigate(`/myhealth/${index + 1}`); //나중에 id로 고치기
  };

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>등록자</th>
            <th>증상</th>
            <th>생성날짜</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleClick(index)}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.symptom}</td>
              <td>{item.createDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default MyHealthList;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Table = styled.table`
  width: 90%;
  margin-top: px;
  margin: 0 auto;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  overflow: hidden;

  thead {
    background-color: ${({ theme }) => theme.colors.yellow};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: ${({ theme }) => theme.colors.white};
  }

  thead tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }

  tr:hover {
    /* background-color: ${({ theme }) => theme.colors.gray[200]}; */
    cursor: pointer;
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    word-wrap: break-word;
  }

  thead th {
    border-bottom: none;
  }
  th:nth-child(1),
  td:nth-child(1) {
    width: 10%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 30%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 30%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 20%;
  }
`;
