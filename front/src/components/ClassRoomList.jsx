import React, { useState } from 'react';
import sun from '../assets/img/sun.png';
import ClassRoomCard from './ClassRoomCard';
import styled from 'styled-components';
import useLoginStore from '../store/loginStore';
import { toast } from 'react-toastify';

/**
 * 반 카드 리스트 컴포넌트입니다.
 *
 * ex.유치원 반 목록, 일과표, 반 생성 페이지 부분에서 사용됩니다.
 *
 * classrooms : 반 리스트 데이터가 들어옵니다.
 * clickEventFunc : 반 카드 클릭 이벤트 함수가 들어옵니다.
 */

const ClassRoomList = ({ classrooms, clickEventFunc = () => {} }) => {
  return (
    <>
      <FlexContainer>
        {classrooms.map((classroom) => (
          <ClassRoomCard key={classroom.class_no} classRoom={classroom} clickEventFunc={clickEventFunc} />
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

export default ClassRoomList;
