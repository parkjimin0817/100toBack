// src/pages/manager/ClassPlacement.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ContentHeader from '../../components/Common/ContentHeader';
import ChildrenList from '../../components/ChildrenList';
import SearchButton from '../../../src/assets/img/searchbutton.png';

import useLoginStore from '../../store/loginStore';

const TeacherList = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;

  // 교사 리스트에서 반 배정 같은 거 하려면 필요함
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredName, setFilteredName] = useState('');

  // // true → 전체, false → 미배정
  // const [showAll, setShowAll] = useState(true);

  // // 정렬 초기값을 등록순으로
  // const [sort, setSort] = useState('createDate');

  // const [role, setRole] = useState('child');

  // //교사 목록 불러오기
  // const [teachers, setTeachers] = useState([]);
  // useEffect(() => {
  //   if (!centerNo) return;

  //   memberService
  //     .teacherDetailList(centerNo)
  //     .then((data) => setTeachers(data))
  //     .catch((err) => console.error('교사 목록 불러오기 실패 : ', err));
  // }, [centerNo]);

  //console.log(teachers);

  return (
    <Content>
      <ContentHeader Title="근태 관리 (교사 목록)" Color="blue" />
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setFilteredName(searchTerm.trim());
              }
            }}
          />
          <SearchIcon src={SearchButton} onClick={() => setFilteredName(searchTerm.trim())} />
        </SearchBox>
      </SearchLine>
      <ChildrenList
        Color="blue"
        showAll={true}
        sortBy="createDate"
        roleBy="teacher"
        classPlacement={false}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        centerNo={centerNo}
        nameFilter={filteredName}
      />
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
