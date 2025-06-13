import React from 'react';
import ClassRoomCard from '../components/ClassRoomCard';
import ContentHeader from '../components/Common/ContentHeader';

//출석 체크 시 반별 페이지(모든 반이 나옴)
const AttendanceClassList = () => {
  return (
    <>
      <ContentHeader Title={'유치원 출결 반 선택'} Color={'orange'} />
      <ClassRoomCard />
    </>
  );
};

export default AttendanceClassList;
