import { useState } from 'react';
import ContentHeader from '../../../components/Common/ContentHeader';
import styled from 'styled-components';
import TeacherProfilePhoto from './TeacherProfilePhoto';
import TeacherAttendanceEditModal from './TeacherAttendanceEditModal';

const TeacherAttendanceCard = ({ selectedDate }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ContentHeader Title="근태 관리" Color={'blue'} FontSize={'sm'} />
      <TopContent>
        <ProfileDiv>
          <TeacherProfilePhoto />
        </ProfileDiv>
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
          <AttendanceDetailDate>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })}
          </AttendanceDetailDate>
          <ButtonDiv>
            <AttendanceEditButton onClick={() => setOpenModal(true)}>근태 수정</AttendanceEditButton>
          </ButtonDiv>
          <DetailContent>
            <Table>
              <tbody>
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
              </tbody>
            </Table>
          </DetailContent>
        </AttendanceDetailBox>
      </BottomContent>
      {openModal && (
        <TeacherAttendanceEditModal
          onClose={() => setOpenModal(false)}
          onEdit={(data) => {
            console.log(data);
            setOpenModal(false);
          }}
        />
      )}
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
  margin-top: 65px;
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
`;

const Table = styled.table`
  width: 50%;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;

  th,
  td {
    padding: 8px;
    text-align: center;
    border: none;
  }

  tbody > tr:first-child {
    height: 60px;
  }
`;
