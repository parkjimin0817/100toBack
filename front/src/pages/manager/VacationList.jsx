import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import { LuSearch } from 'react-icons/lu';
import App from '../../App';
import Modal from '../manager/components/VacationDetail';

const ApprovalList = () => {
  const [selectedType, setSelectedType] = useState('전체');
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const data = [
    {
      create_date: '2023-10-09',
      start_date: '2023-10-11',
      end_date: '2023-10-14',
      type: '휴가',
      type_detail: '병가',
      name: '김선생',
      reason: '다리 부상',
      file: 'O',
      status: '승인',
      decision_date: '2023-10-10',
    },
    {
      create_date: '2023-10-05',
      start_date: '2023-10-08',
      end_date: '2023-10-10',
      type: '휴가',
      type_detail: '연차',
      name: '박지민',
      reason: '여행',
      file: 'X',
      status: '거절',
      decision_date: '2023-10-07',
    },
    {
      create_date: '2023-10-02',
      start_date: '2023-10-08',
      end_date: '2023-10-08',
      type: '워케이션',
      type_detail: '사전답사',
      name: '이선생',
      reason: '소풍 사전답사',
      file: 'O',
      status: '승인',
      decision_date: '2023-10-03',
    },
    {
      create_date: '2023-09-30',
      start_date: '2023-10-01',
      end_date: '2023-10-01',
      type: '휴가',
      type_detail: '병가',
      name: '김승기',
      reason: '몸살감기',
      file: 'O',
      status: '승인',
      decision_date: '2023-10-01',
    },
    {
      create_date: '2023-09-28',
      start_date: '2023-09-30',
      end_date: '2023-09-30',
      type: '워케이션',
      type_detail: '세미나 참석',
      name: '최선생',
      reason: '세미나 참석',
      file: 'X',
      status: '대기',
      decision_date: null,
    },
    {
      create_date: '2023-09-25',
      start_date: '2023-09-26',
      end_date: '2023-09-28',
      type: '휴가',
      type_detail: '연차',
      name: '정형일',
      reason: '놀고싶음',
      file: 'O',
      status: '대기',
      decision_date: null,
    },
    {
      create_date: '2023-09-20',
      start_date: '2023-09-21',
      end_date: '2023-09-22',
      type: '워케이션',
      type_detail: '사전답사',
      name: '홍선생',
      reason: '소풍 사전답사',
      file: 'O',
      status: '거절',
      decision_date: '2023-09-20',
    },
    {
      create_date: '2023-09-15',
      start_date: '2023-09-16',
      end_date: '2023-09-18',
      type: '휴가',
      type_detail: '병가',
      name: '정의철',
      reason: '아픔...',
      file: 'X',
      status: '대기',
      decision_date: null,
    },
    {
      create_date: '2023-09-10',
      start_date: '2023-09-13',
      end_date: '2023-09-14',
      type: '워케이션',
      type_detail: '세미나 참석',
      name: '양동민',
      reason: '세미나 참석',
      file: 'O',
      status: '승인',
      decision_date: '2023-10-11',
    },
    {
      create_date: '2023-09-05',
      start_date: '2023-09-06',
      end_date: '2023-09-07',
      type: '휴가',
      type_detail: '연차',
      name: '박선생',
      reason: '휴가엔 사유가 필요 없다',
      file: 'X',
      status: '거절',
      decision_date: '2023-09-06',
    },
  ];

  const filteredData = selectedType === '전체' ? data : data.filter((item) => item.type === selectedType);

  return (
    <>
      <Content>
        <ContentHeader Title={'휴가 / 워케이션 관리'} Color={'blue'}></ContentHeader>
        <Navigation>
          <NavigationLeft>
            {['전체', '휴가', '워케이션'].map((type) => (
              <MemberType key={type} isActive={selectedType === type} onClick={() => setSelectedType(type)}>
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
                  <th>이름</th>
                  <th>첨부파일</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      setSelectedData(data);
                      setOpenModal(true);
                    }}
                  >
                    <td>{data.create_date}</td>
                    <td>
                      {data.type} - {data.type_detail}
                    </td>
                    <td>{data.name}</td>
                    <td>{data.file}</td>
                    <td>
                      {data.decision_date === null ? (
                        <>
                          <button className="approved">승인</button>
                          <button className="rejected">거절</button>
                        </>
                      ) : data.status === '승인' ? (
                        <ApprovedDecisionDate>{data.decision_date}</ApprovedDecisionDate>
                      ) : (
                        <RejectedDecisionDate>{data.decision_date}</RejectedDecisionDate>
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
    width: 30%;
  }
  th:nth-child(3) {
    width: 15%;
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
