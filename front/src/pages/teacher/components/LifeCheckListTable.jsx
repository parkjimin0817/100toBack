import React from 'react';
import styled from 'styled-components';

const LifeCheckListTable = ({ data, onEdit, onChange }) => {
  return (
    <TableWrapper>
      <VacationTable>
        <thead>
          <tr>
            <th>이름</th>
            <th>식사</th>
            <th>낮잠시간</th>
            <th>놀이참여</th>
            <th>교우관계</th>
            <th>메모</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {data.map((child, index) => (
            <tr key={index}>
              <td>{child.name}</td>
              <td>
                {child.editable ? (
                  <input
                    type="text"
                    value={child.meal}
                    onChange={(e) => onChange(index, 'meal', e.target.value)}
                    style={{ width: '80%', border: '1px solid black', textAlign: 'center' }}
                  />
                ) : child.meal ? (
                  `${child.meal}`
                ) : (
                  ''
                )}
              </td>
              <td>
                {child.editable ? (
                  <input
                    type="text"
                    value={child.napTime}
                    onChange={(e) => onChange(index, 'napTime', e.target.value)}
                    style={{ width: '80%', border: '1px solid black', textAlign: 'center' }}
                  />
                ) : child.napTime ? (
                  `${child.napTime}`
                ) : (
                  ''
                )}
              </td>
              <td>
                {child.editable ? (
                  <input
                    type="text"
                    value={child.play}
                    onChange={(e) => onChange(index, 'play', e.target.value)}
                    style={{ width: '80%', border: '1px solid black', textAlign: 'center' }}
                    border={'1px solid black'}
                  />
                ) : child.play ? (
                  `${child.play}`
                ) : (
                  ''
                )}
              </td>
              <td>
                {child.editable ? (
                  <input
                    type="text"
                    value={child.social}
                    onChange={(e) => onChange(index, 'social', e.target.value)}
                    style={{ width: '90%', border: '1px solid black', textAlign: 'center' }}
                  />
                ) : (
                  child.social
                )}
              </td>
              <td>
                {child.editable ? (
                  <input
                    type="text"
                    value={child.memo}
                    onChange={(e) => onChange(index, 'memo', e.target.value)}
                    style={{ width: '90%', border: '1px solid black', textAlign: 'center' }}
                  />
                ) : (
                  child.memo
                )}
              </td>
              <td>
                <EditButton onClick={() => onEdit(index)}>{child.editable ? '저장' : '수정'}</EditButton>
              </td>
            </tr>
          ))}
        </tbody>
      </VacationTable>
    </TableWrapper>
  );
};

export default LifeCheckListTable;

const TableWrapper = styled.div`
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
    width: 22%;
    text-align: left;
  }
  th:nth-child(7),
  td:nth-child(7) {
    width: 10%;
  }
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.orange};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightorange};
  }
`;
