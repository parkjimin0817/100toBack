import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import App from '../../App';
import { LuSearch } from 'react-icons/lu';

const ApprovalList = () => {
  const [selectedType, setSelectedType] = useState('교사');

  const data_member = [
    {
      id: 1,
      name: '김선생',
      memeber_phone: '010-1234-5678',
      member_type: '교사',
      create_date: '2023-10-01',
      status: '대기',
    },
    {
      id: 2,
      name: '정의철',
      memeber_phone: '010-4567-8901',
      member_type: '학부모',
      create_date: '2023-10-02',
      status: '대기',
    },
    {
      id: 3,
      name: '이선생',
      memeber_phone: '010-2345-6789',
      member_type: '교사',
      create_date: '2023-10-03',
      status: '승인',
    },
    {
      id: 4,
      name: '박학부모',
      memeber_phone: '010-3456-7890',
      member_type: '학부모',
      create_date: '2023-10-04',
      status: '거절',
    },
  ];
  const data_child = [
    { id: 1, member_name: '정의철', name: '정형일', create_date: '2023-10-02', status: '대기' },
    { id: 2, member_name: '정의철', name: '정형이', create_date: '2023-10-03', status: '대기' },
    { id: 3, member_name: '정의철', name: '정형삼', create_date: '2023-10-03', status: '승인' },
  ];

  return (
    <Content>
      <ContentHeader Title={'회원가입 관리'} Color={'blue'}></ContentHeader>
      <Navigation>
        <NavigationLeft>
          <MemberType isActive={selectedType === '교사'} onClick={() => setSelectedType('교사')}>
            교사
          </MemberType>
          <MemberType isActive={selectedType === '학부모'} onClick={() => setSelectedType('학부모')}>
            학부모
          </MemberType>
          <MemberType isActive={selectedType === '아동'} onClick={() => setSelectedType('아동')}>
            아동
          </MemberType>
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
          {selectedType === '교사' && (
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>교사명</th>
                  <th>전화번호</th>
                  <th>가입일</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
                {selectedType === '교사' &&
                  data_member
                    .filter((item) => item.member_type === '교사' && item.status === '대기')
                    .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.memeber_phone}</td>
                        <td>{item.create_date}</td>
                        <td>
                          <button className="approved">승인</button>
                          <button className="rejected">거절</button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          )}

          {selectedType === '학부모' && (
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>학부모명</th>
                  <th>전화번호</th>
                  <th>가입일</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
                {selectedType === '학부모' &&
                  data_member
                    .filter((item) => item.member_type === '학부모' && item.status === '대기')
                    .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.memeber_phone}</td>
                        <td>{item.create_date}</td>
                        <td>
                          <button className="approved">승인</button>
                          <button className="rejected">거절</button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          )}

          {selectedType === '아동' && (
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>보호자명</th>
                  <th>아동명</th>
                  <th>가입일</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
                {selectedType === '아동' &&
                  data_child
                    .filter((item) => item.status === '대기')
                    .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.member_name}</td>
                        <td>{item.name}</td>
                        <td>{item.create_date}</td>
                        <td>
                          <button className="approved">승인</button>
                          <button className="rejected">거절</button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
      </ApprovalLists>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
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
    width: 10%;
  }
  th:nth-child(2) {
    width: 25%;
  }
  th:nth-child(3) {
    width: 25%;
  }
  th:nth-child(4) {
    width: 20%;
  }
  th:nth-child(5) {
    width: 20%;
    border-right: none;
  }
  td {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding: ${({ theme }) => theme.spacing[3]};
    text-align: center;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[400]};
    min-height: 50px;
  }

  td:nth-child(1) {
    border-left: none;
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

export default ApprovalList;
