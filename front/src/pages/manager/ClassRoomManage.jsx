import React, { useState, useEffect } from 'react';
import ClassRoomCard from '../../components/ClassRoomCard';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateClassModal from './components/CreateClassModal';
import useLoginStore from '../../store/loginStore';
import { classService } from '../../api/class';
import { ImInfo } from 'react-icons/im';

//출석 체크 시 반별 페이지(모든 반이 나옴)
const ClassRoomManage = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);

  //반 목록 불러오기
  useEffect(() => {
    if (!centerNo) return;

    classService
      .classroomlist(centerNo)
      .then((data) => setClassrooms(data))
      .catch((err) => console.error('반 목록 불러오기 실패 : ', err));
  }, [centerNo]);

  return (
    <Content>
      <ContentHeader
        Title={'반 목록'}
        Color={'blue'}
        ButtonProps={[
          { Title: '반 생성하기', func: () => setIsModalOpen(true) },
          { Title: '뒤로가기', func: () => navigate(-1) },
        ]}
      />

      <Div>
        <Hint>
          <ImInfo />
          확인하실 반을 선택해주세요.
        </Hint>
        <ClassRoomCard classrooms={classrooms} address={'/childattendance'} />
      </Div>
      {isModalOpen && (
        <CreateClassModal
          onClose={() => setIsModalOpen(false)}
          centerNo={centerNo}
          onSuccess={(newClassroom) => setClassrooms((prev) => [...prev, newClassroom])}
        />
      )}
    </Content>
  );
};

const Div = styled.div`
  padding: ${({ theme }) => theme.spacing[10]};
`;

const Hint = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-align: left;
  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[8]};
`;
const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ClassRoomManage;
