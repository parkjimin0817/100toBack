import React, { useState } from 'react';
import sun from '../assets/img/sun.png';
import ClassList from './ClassList';
import styled from 'styled-components';
import useLoginStore from '../store/loginStore';
import { toast } from 'react-toastify';

/**
 * 반별 카드 컴포넌트 입니다.
 *
 * ex.유치원 반 목록, 일과표, 반 생성 페이지 부분에서 사용됩니다.
 *
 *
 * rooms 모든 반들을 가르킵니다.
 *
 * address 부분은 페이지마다 다르게 들어가야합니다.
 */

const ClassRoomCard = ({ classrooms, address }) => {
  return (
    <>
      <FlexContainer>
        {classrooms.map((classroom) => (
          <ClassList
            key={classroom.class_no}
            img={classroom.class_image}
            className={classroom.class_name}
            mateCount={classroom.child_count}
            capacity={classroom.capacity}
            teacher={classroom.member_name}
            classColor={classroom.color}
            address={`${address}/${classroom.class_no}`}
          />
        ))}
      </FlexContainer>
    </>
  );
};

const FlexContainer = styled.div`
  place-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* padding: ${({ theme }) => theme.spacing[10]}; */
  gap: 60px;
  width: 100%;
`;

export default ClassRoomCard;
