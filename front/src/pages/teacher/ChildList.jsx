import React, { useEffect } from 'react';
import List from '../../components/ChildrenList';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginStore from '../../store/loginStore';

const ChildList = () => {
  const member = useLoginStore((state) => state.member);
  const classNo = member.classNo;
  const centerNo = member.centerNo;
  const memberType = member.memberType;
  const navigator = useNavigate();

  const buttons = [{ Title: '반 목록', func: () => navigator('/classlist') }];

  return (
    <Content>
      <ContentHeader Title="아동 목록" Color="orange" ButtonProps={buttons} />
      <List
        Color="orange"
        showAll={true}
        sortBy="createDate"
        roleBy="child"
        classFilter={memberType === 'MANAGER' ? null : classNo} // MANAGER일 때는 필터 없음
        centerNo={centerNo} // 추가 필요
      />
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ChildList;
