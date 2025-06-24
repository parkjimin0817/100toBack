import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import App from '../../App';
import { LuSearch } from 'react-icons/lu';
import { approvalListService } from '../../api/approvalList';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';

const ApprovalListAdmin = () => {
  const [dataAll, setDataAll] = useState([]);
  const { member } = useLoginStore();

  const fetchPendingList = async () => {
    try {
      const data = await approvalListService.getPendingList(member.centerNo);
      data.forEach((item) => {
        switch (item.center_type) {
          case 'DAYCARE':
            item.center_type = '어린이집';
            break;
          case 'KINDERGARTEN':
            item.center_type = '유치원';
            break;
          case 'CHILD_CENTER':
            item.center_type = '지역아동센터';
            break;
          case 'ETC':
            item.center_type = '기타';
            break;
          default:
            item.center_type = '알 수 없음';
        }
      });
      setDataAll(data || []);
    } catch (error) {
      console.error('승인 대기 목록 로딩 실패:', error.message);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);

  const managerList = dataAll.filter((item) => item.member_type === 'MANAGER' && item.status === 'PENDING');

  const handleApprovalAction = async (item, status) => {
    try {
      await approvalListService.updateMemberApprovalStatus(item.approval_no, status, item.member_no);

      toast.success(`${status === 'APPROVED' ? '승인' : '거절'} 처리되었습니다.`);
      fetchPendingList();
    } catch (error) {
      console.error('처리 실패:', error.message);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Content>
      <ContentHeader Title={'시설장 회원가입 관리'} Color={'blue'}></ContentHeader>
      <Navigation>
        <NavigationLeft></NavigationLeft>
        <NavigationRight>
          <SearchInput type="text" placeholder="검색어를 입력해주세요" />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </NavigationRight>
      </Navigation>

      <ApprovalLists>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>시설명</th>
                <th>시설장명</th>
                <th>시설유형</th>
                <th>전화번호</th>
                <th>가입일</th>
                <th>승인여부</th>
              </tr>
            </thead>
            <tbody>
              {managerList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.center_name}</td>
                  <td>{item.member_name}</td>
                  <td>{item.center_type}</td>
                  <td>{item.center_tel}</td>
                  <td>{item.approval_request_date.split('T')[0]}</td>
                  <td>
                    <button className="approved" onClick={() => handleApprovalAction(item, 'APPROVED')}>
                      승인
                    </button>
                    <button className="rejected" onClick={() => handleApprovalAction(item, 'REJECTED')}>
                      거절
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </ApprovalLists>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
`;
const NavigationLeft = styled.div`
  width: 50%;
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  padding: 0 ${({ theme }) => theme.spacing[3]};
`;

const MemberType = styled.span`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.blue};
  transition: color 0.3s;

  border-bottom: ${({ isActive, theme }) => (isActive ? `3px solid ${theme.colors.blue}` : 'none')};

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue};
  }
`;

const NavigationRight = styled.div`
  width: 50%;
  display: flex;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const SearchInput = styled.input`
  width: 80%;
  padding: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-radius: ${({ theme }) => theme.borderRadius.md} 0 0 ${({ theme }) => theme.borderRadius.md};
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 20%;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.bleack};
  border-radius: 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const SearchIcon = styled(LuSearch)`
  width: 30px;
  height: 30px;
`;

const ApprovalLists = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[10]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TableWrapper = styled.div`
  width: 100%;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.xl};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  thead {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }

  th {
    padding: ${({ theme }) => theme.spacing[3]};
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  td {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding: ${({ theme }) => theme.spacing[1]};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[400]};
    text-align: center;
    min-height: 48px;
  }
  th:nth-child(1) {
    width: 10%;
  }
  th:nth-child(2) {
    width: 15%;
  }
  th:nth-child(3) {
    width: 10%;
  }
  th:nth-child(4) {
    width: 15%;
  }
  th:nth-child(5) {
    width: 15%;
  }
  th:nth-child(6) {
    width: 15%;
  }
  th:nth-child(7) {
    width: 20%;
  }
  td:nth-child(7) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
  }

  button {
    border: none;
    padding: 0 ${({ theme }) => theme.spacing[6]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.green};
  }

  button:nth-child(2) {
    background-color: ${({ theme }) => theme.colors.orange};
  }
`;

export default ApprovalListAdmin;
