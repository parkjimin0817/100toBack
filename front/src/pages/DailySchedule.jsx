import React from 'react';
import ClassRoomCard from '../components/ClassRoomCard';
import ContentHeader from '../components/Common/ContentHeader';

//일과표 반별 리스트 페이지(모든 반이 나옴)
const DailySchedule = () => {
  return (
    <>
      <ContentHeader Title={'일과표'} Color={'purple'} />
      <ClassRoomCard />
    </>
  );
};

export default DailySchedule;
