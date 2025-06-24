import React, { useState } from 'react';
import ClassRoomCard from '../../components/ClassRoomCard';
import ContentHeader from '../../components/Common/ContentHeader';
import sun from '../../assets/img/sun.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateClassModal from './components/CreateClassModal';
import useLoginStore from '../../store/loginStore';

//출석 체크 시 반별 페이지(모든 반이 나옴)
const ClassRoomManage = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const thermeData = [
    {
      id: 1,
      class_name: '햇님반',
      mate_count: 10,
      capacity: 12,
      teacher: '정의철',
      class_color: 'orange',
      class_image: sun,
    },
    {
      id: 2,
      class_name: '무지개개반',
      mate_count: 5,
      capacity: 12,
      teacher: '정형일',
      class_color: 'lightblue',
      class_image: sun,
    },
    {
      id: 3,
      class_name: '달님반',
      mate_count: 6,
      capacity: 20,
      teacher: '박지민',
      class_color: 'yellow',
      class_image: null,
    },
    {
      id: 4,
      class_name: '구름반',
      mate_count: 7,
      capacity: 12,
      teacher: '김승기',
      class_color: 'blue',
      class_image: sun,
    },
  ];

  return (
    <Content>
      <ContentHeader
        Title={'반 목록'}
        Color={'blue'}
        ButtonProps={[{ Title: '반 생성하기', func: () => setIsModalOpen(true) }]}
      />
      <ClassRoomCard rooms={thermeData} />
      {isModalOpen && <CreateClassModal onClose={() => setIsModalOpen(false)} centerNo={centerNo} />}
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ClassRoomManage;
