import React from 'react';
import styled from 'styled-components';
import People from '../../../assets/img/people.png';

const TeacherMainChild = () => {
  const childdata = [
    { id: 1, className: '햇님반', completed: 10, total: 20 },
    { id: 2, className: '햇님반', completed: 12, total: 20 },
    { id: 3, className: '햇님반', completed: 14, total: 20 },
    { id: 4, className: '햇님반', completed: 15, total: 20 },
  ];

  return (
    <>
      <ChildHeaderRow>
        <ChildSectionTitle>아동 건강관리</ChildSectionTitle>
      </ChildHeaderRow>
      <ContentLine>
        {childdata.map((item, index) => (
          <Content key={item.id}>
            <ContentHeader>{item.className} 건강체크</ContentHeader>
            <ContentProgress>
              <ProgressHeader>건강 체크 완료</ProgressHeader>
              <ProgressBody>
                <PeopleIcon src={People} alt="사람 사진"></PeopleIcon>
                <Progress>
                  {item.completed}/{item.total}
                </Progress>
              </ProgressBody>
            </ContentProgress>
          </Content>
        ))}
      </ContentLine>
    </>
  );
};

export default TeacherMainChild;

const ChildHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ChildSectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ContentLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: 15px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.white};
  width: 56%;
  height: 43%;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const ContentProgress = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: 10px;
  margin-top: 10px;
`;

const ProgressHeader = styled.div``;

const ProgressBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const PeopleIcon = styled.img`
  margin-top: 5px;
  margin-right: 15px;
`;

const Progress = styled.div`
  margin-top: 5px;
`;
