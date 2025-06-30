import styled from 'styled-components';
import { vacationService } from '../../../api/vacation';
import { toast } from 'react-toastify';

const MyVacationList = ({ vacations, onDeleteSuccess }) => {
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
          {[...vacations]
            .sort((a, b) => b.vacationNo - a.vacationNo)
            .map((vacation, index) => (
              <tr key={vacation.vacationNo}>
                <td>{index + 1}</td>
                <td>{TYPE[vacation.type] || vacation.type}</td>
                <td>{vacation.typeDetail}</td>
                <td>
                  {vacation.startDate}-{vacation.endDate}
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
