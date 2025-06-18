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
            <Name>출근</Name>
            <Count>7</Count>
          </AttendanceCount>
          <AttendanceCount>
            <Name>결근</Name>
            <Count>7</Count>
          </AttendanceCount>
        </AttendanceCountBox>
      </TopContent>
      <BottomContent>
        <AttendanceDetailBox>
          <AttendanceDetailDate>2025-06-03(화)</AttendanceDetailDate>
          <ButtonDiv>
            <AttendanceEditButton>근태 수정</AttendanceEditButton>
          </ButtonDiv>
          <DetailContent>
            <Table>
              <tr>
                <th>상태:</th>
                <td>출근</td>
              </tr>
              <tr>
                <th>출근시간: </th>
                <td>09:00</td>
              </tr>
              <tr>
                <th>퇴근시간: </th>
                <td>18:00</td>
              </tr>
            </Table>
          </DetailContent>
        </AttendanceDetailBox>
      </BottomContent>
    </>
  );
};

export default TeacherAttendanceCard;

const TopContent = styled.div`
  width: 100%;
  display: flex;
`;

const BottomContent = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
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
  margin: 0 auto;
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

const AttendanceDetailBox = styled.div`
  margin: 10px auto;
  width: 300px;
  height: 200px;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const AttendanceDetailDate = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  justify-content: center;
  padding-top: 4px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 0 0 5px;
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px 8px;
  display: flex;
  justify-content: flex-end;
`;

const AttendanceEditButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const DetailContent = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Table = styled.table`
  width: 50%;
  margin: 0 auto;
  th {
    text-align: center;
  }
  & > tr:first-child {
    height: 60px; /* 줄 간격을 넓히는 예시 */
  }
`;
