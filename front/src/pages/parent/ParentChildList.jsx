import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';

import ParentChildrenList from '../../components/ParentChildrenList';
import ChildImg from '../../assets/Child.png';
import { useParams } from 'react-router-dom';
import { List } from '../../components/ChildDummyData';
import ChildDetailInfoArea from '../../components/Common/ChildDetailInfoArea';

const ParentChildList = () => {
  const [selectedChild, setSelectedChild] = useState(null);

  const handleChildClick = (child) => {
    setSelectedChild(child); // 카드 클릭 시 상태 저장
  };

  return (
    <>
      <Content>
        <ContentHeader Title="아동 출결" Color="orange" />
        <InnerContent>
          <Title>나의 아동 목록</Title>
          <ParentChildrenList
            showAll={true}
            sortBy="createDate"
            roleBy="child"
            classFilter="햇님반"
            onChildClick={handleChildClick}
          />
        </InnerContent>
      </Content>

      <ChildInfoArea>{selectedChild && <ChildDetailInfoArea child={selectedChild} />}</ChildInfoArea>
    </>
  );
};

const ChildInfoArea = styled.div`
  width: 100%;
  min-height: 400px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

const Title = styled.h2`
  text-align: left;
  padding-left: ${({ theme }) => theme.spacing[12]};
`;

const InnerContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Content = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ParentChildList;
