import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import { LuSearch } from 'react-icons/lu';
import Modal from '../manager/components/VacationDetail';
import useLoginStore from '../../store/loginStore';
import { vacationService } from '../../api/vacation';

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
      .then((data) => setVacations(data))
      .catch((err) => console.error('휴가 목록 불러오기 실패 : ', err.message));
  }, [centerNo]);

  const TYPE = {
    VACATED: '휴가',
    WORKATION: '워케이션',
  };

  const filteredData = selectedType === '전체' ? vacations : vacations.filter((v) => TYPE[v.type] === selectedType);

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
                    onClick={() => {
                      setSelectedData(v);
                      setOpenModal(true);
                    }}
                  >
                    <td>{v.createDate}</td>
                    <td>
                      {TYPE[v.type] || v.type} - {v.typeDetail}
                    </td>
                    <td>{v.reason}</td>
                    {/* <td>{v.attachment}</td> */}
                    <td>파일자리</td>
                    <td>
                      {v.decision_date === null ? (
                        <>
                          <button className="approved">승인</button>
                          <button className="rejected">거절</button>
                        </>
                      ) : v.status === 'APPROVED' ? (
                        <ApprovedDecisionDate>{v.decision_date}</ApprovedDecisionDate>
                      ) : (
                        <RejectedDecisionDate>{v.decision_date}</RejectedDecisionDate>
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
  border-collapse: separate;
  border-spacing: 0;
  font-size: ${({ theme }) => theme.fontSizes.base};

  thead {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }

  th {
    padding: ${({ theme }) => theme.spacing[3]};
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  th:nth-child(1) {
    width: 20%;
  }
  th:nth-child(2) {
    width: 20%;
  }
  th:nth-child(3) {
    width: 30%;
  }
  th:nth-child(4) {
    width: 15%;
  }
  th:nth-child(5) {
    width: 20%;
  }

  tbody > tr {
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[100]};
    }
  }

  td {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding: ${({ theme }) => theme.spacing[3]};
    text-align: center;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[400]};
    min-height: 50px;
  }

  td:nth-child(5) {
    border-right: none;
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[4]};
  }

  button {
    border: none;
    padding: 0 ${({ theme }) => theme.spacing[6]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.white};
  }

  button.approved {
    background-color: ${({ theme }) => theme.colors.green};
  }

  button.rejected {
    background-color: ${({ theme }) => theme.colors.orange};
  }
`;

const ApprovedDecisionDate = styled.span`
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RejectedDecisionDate = styled.span`
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ApprovalList;
