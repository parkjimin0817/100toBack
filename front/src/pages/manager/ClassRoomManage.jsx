import React, { useState, useEffect } from 'react';
import ClassRoomCard from '../../components/ClassRoomCard';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateClassModal from './components/CreateClassModal';
import useLoginStore from '../../store/loginStore';
import { classService } from '../../api/class';

//출석 체크 시 반별 페이지(모든 반이 나옴)
const ClassRoomManage = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    if (!centerNo) return;

    classService
      .classroomlist(centerNo)
      .then((data) => setClassrooms(data))
      .catch((err) => console.error('반 목록 불러오기 실패 : ', err));
  }, [centerNo]);

  console.log(classrooms);

  return (
    <Content>
      <ContentHeader
        Title={'반 목록'}
        Color={'blue'}
        ButtonProps={[{ Title: '반 생성하기', func: () => setIsModalOpen(true) }]}
      />
      <ClassRoomCard classrooms={classrooms} />
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
