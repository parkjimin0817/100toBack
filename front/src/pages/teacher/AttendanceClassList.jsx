import React, { useEffect, useState } from 'react';
import ClassRoomCard from '../../components/ClassRoomCard';
import ContentHeader from '../../components/Common/ContentHeader';
import sun from '../../assets/img/sun.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginStore from '../../store/loginStore';
import { classService } from '../../api/class';
import { ImInfo } from 'react-icons/im';
import { toast } from 'react-toastify';

//출석 체크 시 반별 페이지(모든 반이 나옴)
const AttendanceClassList = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    if (!member) {
      alert('잘못된 접근입니다.');
      return;
    }

    classService
      .classroomlist(centerNo)
      .then((data) => setClassrooms(data))
      .catch((err) => console.error('반 목록 불러오기 실패 : ', err));
  }, []);

  return (
    <Content>
      <ContentHeader Title={'유치원 출결 반 선택'} Color={'orange'} />
      <Div>
        <Hint>
          <ImInfo />
          해당 반을 선택하시면 아동들의 출결을 관리하실 수 있습니다.
        </Hint>
        <ClassRoomCard classrooms={classrooms} address={'/childattendance'} />
      </Div>
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

export default AttendanceClassList;
