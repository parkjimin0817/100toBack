import React from 'react';
import List from '../../components/ChildrenList';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ChildList = () => {
  const navigate = useNavigate();
  const buttons = [{ Title: '반 목록', func: () => navigate('/classlist') }];

  return (
    <Content>
      <ContentHeader Title="아동 목록" Color="orange" ButtonProps={buttons} />
      <List
        Color="orange"
        showAll={true}
        sortBy="createDate"
        roleBy="child"
        classFilter="햇님반"
        // 여기 classFilter에다가 세션에 있는 교사의 소속 반 변수를 넣으면 필터링되어 아동목록이 나타남
      />
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

export default ChildList;
