import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';

const TeacherDocument = () => {
  return (
    <Wrapper>
      <ContentHeader Title={'서류 관리'} Color={'blue'} FontSize="xl" ButtonProps={[{}]} />
      <TopContent>
        <Title>최근 열람한 문서</Title>
        <Documents>
          <Card></Card>
        </Documents>
      </TopContent>
    </Wrapper>
  );
};

export default TeacherDocument;

const Wrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const TopContent = styled.div`
  width: 90%;
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 10px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  margin: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Documents = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[300]};
  width: 120px;
  height: 100px;
`;
