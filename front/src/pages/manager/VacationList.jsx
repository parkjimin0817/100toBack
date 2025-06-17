import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import App from '../../App';
import { LuSearch } from 'react-icons/lu';

const ApprovalList = () => {
  const [selectedType, setSelectedType] = useState('전체');

  const data = [
    { date: '2023-10-09', type: '휴가', type_detail: '병가', name: '김선생', file: 'O', status: '승인' },
    { date: '2023-10-05', type: '휴가', type_detail: '연차', name: '이선생', file: 'X', status: '거절' },
    { date: '2023-10-02', type: '워케이션', type_detail: '사전답사', name: '이선생', file: 'O', status: '승인' },
  ];

  const filteredData = selectedType === '전체' ? data : data.filter((item) => item.type === selectedType);

  return (
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
                <tr key={index}>
                  <td>{data.date}</td>
                  <td>
                    {data.type} - {data.type_detail}
                  </td>
                  <td>{data.name}</td>
                  <td>{data.file}</td>
                  <td>
                    <button>승인</button>
                    <button>거절</button>
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
    background-color: ${({ theme }) => theme.colors.green};
  }

  button:nth-child(2) {
    background-color: ${({ theme }) => theme.colors.orange};
  }
`;

export default ApprovalList;
