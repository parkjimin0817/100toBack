import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ParentContactSearchBar from './components/ParentContactSearchBar';
import ParenctContactList from './components/ParenctContactList';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';
import { childService } from '../../api/child';

const ParentContact = () => {
  const { member } = useLoginStore();
  //페이지가 상태를 가짐
  const [selectedClass, setSelectedClass] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [value, setValue] = useState([]);
  console.log(value);

  const selectPhoneNumber = async () => {
    try {
      const parentPhone = await childService.getParentPhoneNumber(member.centerNo);

      if (!parentPhone) {
        throw new Error('학부모 연락처 불러오기 실패했습니다.');
      }

      setValue(parentPhone);
      toast.success('학부모 연락처 불러오기 성공했습니다.');
    } catch (error) {
      toast.error('학부모 연락처 불러오기 실패했습니다.');
    }
  };

  useEffect(() => {
    selectPhoneNumber();
  }, []);

  return (
    <Wrapper>
      <ContentHeader Title="학부모 연락처" Color="blue" />
      <ParentContactSearchBar
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <ParenctContactList selectedClass={selectedClass} searchKeyword={searchKeyword} value={value} />
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
