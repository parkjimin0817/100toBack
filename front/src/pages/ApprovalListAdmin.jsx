import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/Common/ContentHeader';
import App from '../App';
import { LuSearch } from 'react-icons/lu';

const ApprovalListAdmin = () => {
  const [selectedType, setSelectedType] = useState('시설장');

  return (
    <Content>
      <ContentHeader Title={'회원가입 관리'} Color={'blue'}></ContentHeader>
      <Navigation>
        <NavigationLeft>
          <MemberType isActive={selectedType === '시설장'} onClick={() => setSelectedType('교사')}>
            시설장
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
          {selectedType === '시설장' && (
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
                <tr>
                  <td>1</td>
                  <td>어린이집1</td>
                  <td>김원장</td>
                  <td>어린이집</td>
                  <td>010-1234-5678</td>
                  <td>2023-10-02</td>
                  <td>
                    <button>승인</button>
                    <button>거절</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>강남아동보호센터</td>
                  <td>박원장</td>
                  <td>아동보호센터</td>
                  <td>010-1234-5678</td>
                  <td>2023-10-02</td>
                  <td>
                    <button>승인</button>
                    <button>거절</button>
                  </td>
                </tr>
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
  border-radius: ${({ theme }) => theme.borderRadius.xl};
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
    padding: 0 ${({ theme }) => theme.spacing[2]};
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
