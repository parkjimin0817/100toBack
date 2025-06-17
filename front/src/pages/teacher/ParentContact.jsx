import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ParentContactSearchBar from './components/ParentContactSearchBar';
import ParenctContactList from './components/ParenctContactList';

const ParentContact = () => {
  //페이지가 상태를 가짐
  const [selectedClass, setSelectedClass] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  return (
    <Wrapper>
      <ContentHeader Title="학부모 연락처" Color="blue" />
      <ParentContactSearchBar
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <ParenctContactList selectedClass={selectedClass} searchKeyword={searchKeyword} />
    </Wrapper>
  );
};

export default ParentContact;

const Wrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding-bottom: 30px;
`;
