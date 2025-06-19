// components/ScheduleList.jsx
import React from 'react';
import styled from 'styled-components';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ScheduleList = ({ schedules, emptyMessage = '일정이 없습니다.', onEditClick }) => {
  if (!schedules || schedules.length === 0) {
    return <Message>{emptyMessage}</Message>;
  }

  return (
    <>
      {schedules.map((item) => (
        <Box key={item.id}>
          <BoxLeft>
            <BoxTime>
              {item.start_time} ~ {item.end_time}
            </BoxTime>
            <BoxSchedule>{item.title}</BoxSchedule>
          </BoxLeft>
          <BoxRight>
            <BoxButton>
              <EditButton onClick={() => onEditClick(item)} />
            </BoxButton>
            <BoxButton>
              <DeleteButton />
            </BoxButton>
          </BoxRight>
        </Box>
      ))}
    </>
  );
};

export default ScheduleList;

const Box = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 4px solid ${({ theme }) => theme.colors.purple};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const BoxLeft = styled.div`
  width: 70%;
  height: 100%;
`;

const BoxTime = styled.div`
  width: 50%;
  height: 40%;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  padding: ${({ theme }) => theme.spacing[1]};

  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const BoxSchedule = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  justify-content: start;
  align-items: center;

  padding: ${({ theme }) => theme.spacing[2]};

  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const BoxRight = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: ${({ theme }) => theme.spacing[1]};
`;

const BoxButton = styled.button`
  aspect-ratio: 1 / 1;
  width: 45%;
  height: 100%;

  border: 2px solid ${({ theme }) => theme.colors.purple};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const EditButton = styled(TbEdit)`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.purple};

  padding: ${({ theme }) => theme.spacing[1]};
`;

const DeleteButton = styled(RiDeleteBin6Line)`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.purple};

  padding: ${({ theme }) => theme.spacing[1]};
`;

const Message = styled.p`
  color: #aaa;
  font-style: italic;
`;
