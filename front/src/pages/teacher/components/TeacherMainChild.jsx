import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import People from '../../../assets/img/people.png';
import { classService } from '../../../api/class';

const TeacherMainChild = ({ centerNo }) => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!centerNo) return;

    classService
      .getHealthLogProgress(centerNo)
      .then((data) => setProgress(data))
      .catch((err) => console.error('건강 로그 현황 불러오기 실패 :', err));
  }, [centerNo]);

  return (
    <>
      <ChildHeaderRow>
        <ChildSectionTitle>아동 건강관리</ChildSectionTitle>
      </ChildHeaderRow>
      <ContentLine>
        {progress.map((item) => (
          <Content key={item.class_no}>
            <ContentHeader>{item.class_name}반 건강체크</ContentHeader>
            <ContentProgress>
              <ProgressHeader>건강 체크 완료</ProgressHeader>
              <ProgressBody>
                <PeopleIcon src={People} alt="사람 사진"></PeopleIcon>
                <Progress>
                  {item.completed}/{item.child_count}
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
