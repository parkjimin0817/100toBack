import styled from 'styled-components';
import { vacationService } from '../../../api/vacation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { set } from 'date-fns';

const MyVacationList = ({ vacations, onDeleteSuccess }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage; //페이지에서 첫 아이템 0 ~
  const endIndex = startIndex + itemsPerPage; //페이지에서 마지막 아이템 5 => 0,1,2,3,4

  const sortedVacations = [...vacations].sort((a, b) => b.vacationNo - a.vacationNo);
  const paginatedVacations = sortedVacations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedVacations.length / itemsPerPage);

  const TYPE = {
    VACATED: '휴가',
    WORKATION: '워케이션',
  };

  const STATUS = {
    PENDING: '삭제',
    APPROVED: '승인',
    REJECTED: '거절',
  };

  const handleDelete = async (vacationNo) => {
    if (!window.confirm('휴가 신청을 삭제하시겠습니까? ')) return;

    try {
      await vacationService.deleteVacation(vacationNo);
      toast.success('휴가 신청이 삭제되었습니다.');
      onDeleteSuccess();

      //삭제 후 페이지에 항목이 없다면 이전 페이지로
      const isLastItemOnPage = paginatedVacations.length === 1;
      if (isLastItemOnPage && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (err) {
      console.error('휴가 삭제 실패 :', err);
      toast.error('휴가 신청 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Wrapper>
      <VacationTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>종류</th>
            <th>상세종류</th>
            <th>날짜</th>
            <th>사유</th>
            <th>첨부파일</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {paginatedVacations.map((vacation, index) => (
            <tr key={vacation.vacationNo}>
              <td>{index + 1}</td>
              <td>{TYPE[vacation.type] || vacation.type}</td>
              <td>{vacation.typeDetail}</td>
              <td>
                {vacation.startDate} ~ {vacation.endDate}
              </td>
              <td>{vacation.reason}</td>
              <td>{vacation.file || ''}</td>
              <td>
                {vacation.status === 'PENDING' ? (
                  <DeleteButton onClick={() => handleDelete(vacation.vacationNo)}>삭제</DeleteButton>
                ) : (
                  <Status $status={vacation.status}>{STATUS[vacation.status] || vacation.status}</Status>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </VacationTable>
      {totalPages > 1 && (
        <MyVacationPagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton key={i} $active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </PageButton>
          ))}
        </MyVacationPagination>
      )}
    </Wrapper>
  );
};

export default MyVacationList;

const Wrapper = styled.div`
  width: 100%;
  height: 335px;
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const VacationTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding: 10px;

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    word-wrap: break-word;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 5%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 10%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 10%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 30%;
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 10%;
  }
`;

const Status = styled.div`
  width: 50px;
  margin: 0 auto;
  background-color: ${({ theme, $status }) => {
    if ($status === 'APPROVED') return theme.colors.green; // 승인 초록색
    if ($status === 'REJECTED') return theme.colors.orange; // 거절 오렌지색
  }};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const DeleteButton = styled.button`
  width: 50px;
  background-color: red;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;

  &:hover {
    outline: 1px solid red;
  }
`;

const MyVacationPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.blue : theme.colors.white)};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
