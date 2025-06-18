import React from 'react';
import ContentHeader from '../../../components/Common/ContentHeader';
import ChildrenList from '../../../components/ChildrenList';
import styled from 'styled-components';
const TeacherAttendanceCard = () => {
  return (
    <>
      <ContentHeader
        Title="근태 관리"
        Color={'blue'}
        FontSize={'sm'}
        ButtonProps={[{ Title: '일정수정', func: () => alert('ㅇㅑ호') }]}
      />
      <TopContent>
        <ProfileDiv>{/* <ChildrenList showAll={false} roleBy="child" Color="blue" /> */}</ProfileDiv>
        <AttendanceCountBox>
          <AttendanceCount>
            <Name>전체</Name>
            <Count>7</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>전체</Name>
            <Count>7</Count>
          </AttendanceCount>
        </AttendanceCountBox>
      </TopContent>
    </>
  );
};

export default TeacherAttendanceCard;

const TopContent = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid black;
`;

const ProfileDiv = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
`;

const AttendanceCountBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const AttendanceCount = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  width: 40px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 0 0 5px;
`;

const Count = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
