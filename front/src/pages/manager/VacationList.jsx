import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import { LuSearch } from 'react-icons/lu';
import Modal from '../manager/components/VacationDetail';
import useLoginStore from '../../store/loginStore';
import { vacationService } from '../../api/vacation';
import { toast } from 'react-toastify';

const ApprovalList = () => {
  const [selectedType, setSelectedType] = useState('전체');
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [vacations, setVacations] = useState([]);

  //휴가 목록 불러오기
  useEffect(() => {
    if (!centerNo) return;

    vacationService
      .getVacationListAll(centerNo)
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        setVacations(sorted);
      })
      .catch((err) => console.error('휴가 목록 불러오기 실패 : ', err.message));
  }, [centerNo]);

  //타입으로 필터
  const TYPE = {
    VACATED: '휴가',
    WORKATION: '워케이션',
  };

  const filteredData = selectedType === '전체' ? vacations : vacations.filter((v) => TYPE[v.type] === selectedType);

  // 휴가 승인 로직
  const handleApprove = async (vacationNo) => {
    try {
      const updatedVacation = await vacationService.approveVacation(vacationNo);
      setVacations((prev) => prev.map((v) => (v.vacationNo === vacationNo ? updatedVacation : v)));
      toast.success('휴가가 승인되었습니다.');
    } catch (error) {
      console.error('휴가 승인 실패:', error.message);
    }
  };

  //휴가 거절 로직
  const handleReject = async (vacationNo) => {
    try {
      const updatedVacation = await vacationService.rejectVacation(vacationNo);
      setVacations((prev) => prev.map((v) => (v.vacationNo === vacationNo ? updatedVacation : v)));
      toast.success('휴가가 거절되었습니다.');
    } catch (error) {
      console.error('휴가 거절 실패 :', error.message);
    }
  };

  return (
    <>
      <Content>
        <ContentHeader Title={'휴가 / 워케이션 관리'} Color={'blue'}></ContentHeader>
        <Navigation>
          <NavigationLeft>
            {['전체', '휴가', '워케이션'].map((type) => (
              <MemberType key={type} $isActive={selectedType === type} onClick={() => setSelectedType(type)}>
                {type}
              </MemberType>
            ))}
          </NavigationLeft>

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
                  <th>작성일</th>
                  <th>신청자</th>
                  <th>분류</th>
                  <th>사유</th>
                  <th>첨부파일</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((v, index) => (
                  <tr
                    key={index}
                    onClick={(e) => {
                      if (e.target.tagName.toLowerCase() === 'button') return;
                      if (e.target.closest('button')) return;
                      setSelectedData(v);
                      setOpenModal(true);
                    }}
                  >
                    <td>{v.createDate}</td>
                    <td>{v.memberName}</td>
                    <td>
                      {TYPE[v.type] || v.type} - {v.typeDetail}
                    </td>
                    <td>{v.reason}</td>
                    {/* <td>{v.attachment}</td> */}
                    <td>파일자리</td>
                    <td>
                      {v.status === 'PENDING' ? (
                        <>
                          <button
                            className="approved"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(v.vacationNo);
                            }}
                          >
                            승인
                          </button>
                          <button
                            className="rejected"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(v.vacationNo);
                            }}
                          >
                            거절
                          </button>
                        </>
                      ) : v.status === 'APPROVED' ? (
                        <ApprovedDecisionDate>{v.decisionDate}</ApprovedDecisionDate>
                      ) : (
                        <RejectedDecisionDate>{v.decisionDate}</RejectedDecisionDate>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </ApprovalLists>
      </Content>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} data={selectedData} />
    </>
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

  border-bottom: ${({ $isActive, theme }) => ($isActive ? `3px solid ${theme.colors.blue}` : 'none')};

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
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.base};

  thead {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};

    th {
      padding: ${({ theme }) => theme.spacing[3]};
      text-align: center;
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }

    th:nth-child(1) {
      width: 14%;
    }
    th:nth-child(2) {
      width: 10%;
    }
    th:nth-child(3) {
      width: 18%;
    }
    th:nth-child(4) {
      width: 28%;
    }
    th:nth-child(5) {
      width: 10%;
    }
    th:nth-child(6) {
      width: 20%;
    }
  }

  tbody {
    tr {
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray[100]};
      }
    }

    td {
      padding: ${({ theme }) => theme.spacing[3]};
      text-align: center;
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      color: ${({ theme }) => theme.colors.blue};
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
      word-break: break-word;
    }
  }

  button {
    border: none;
    width: 70px;
    height: 30px;
    margin: 0 4px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.white};
  }

  .approved {
    background-color: ${({ theme }) => theme.colors.green};
  }

  .rejected {
    background-color: ${({ theme }) => theme.colors.orange};
  }
`;

const ApprovedDecisionDate = styled.span`
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 4px 10px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: inline-block;
`;

const RejectedDecisionDate = styled(ApprovedDecisionDate)`
  background-color: ${({ theme }) => theme.colors.orange};
`;

export default ApprovalList;
