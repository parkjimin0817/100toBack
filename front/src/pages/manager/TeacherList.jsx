// src/pages/manager/ClassPlacement.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildrenList from '../../components/ChildrenList';
import SearchButton from '../../../src/assets/img/searchbutton.png';
import theme from '../../styles/theme';

const TeacherList = () => {
  const navigate = useNavigate();
  const headerButtons = [
    { Title: '반 목록', func: () => navigate('/childlist') },
    { Title: '뒤로가기', func: () => navigate(-1) },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredName, setFilteredName] = useState('');

  // true → 전체, false → 미배정
  const [showAll, setShowAll] = useState(true);

  // 정렬 초기값을 등록순으로
  const [sort, setSort] = useState('createDate');

  const [role, setRole] = useState('child');

  return (
    <Content>
      <ContentHeader Title="교사 목록" Color="blue" ButtonProps={headerButtons} />
      <SearchLine>
        <ShowAllButton
          onClick={() => {
            setFilteredName('');
            setSearchTerm('');
          }}
        >
          전체보기
        </ShowAllButton>
        <SearchBox>
          <StyledInput
            type="text"
            placeholder="교사명을 입력해 주세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon src={SearchButton} onClick={() => setFilteredName(searchTerm.trim())} />
        </SearchBox>
      </SearchLine>
      <ChildrenList Color="blue" showAll={showAll} sortBy={sort} roleBy={'teacher'} nameFilter={filteredName} />
    </Content>
  );
};

export default TeacherList;

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const SearchLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 12px;
  width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 20px;
`;

const StyledInput = styled.input`
  flex: 1;
  font-size: 14px;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const ShowAllButton = styled.button`
  color: ${({ theme }) => theme.colors.blue};
  width: 80px;
  height: 40px;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  margin-left: 550px;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: white;
  }
`;
