import React, { useEffect, useState } from 'react';

import sun from '../../assets/img/sun.png';
import ContentHeader from '../../components/Common/ContentHeader';
import ClassRoomList from '../../components/ClassRoomList';
import styled from 'styled-components';
import useLoginStore from '../../store/loginStore';
import { classService } from '../../api/class';
import { ImInfo } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

//일과표 반별 리스트 페이지(모든 반이 나옴)
const CouncelClassList = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [classrooms, setClassrooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!member) {
      alert('잘못된 접근입니다.');
      return;
    }

    classService
      .classroomlist(centerNo)
      .then((data) => setClassrooms(data))
      .catch((err) => toast.error('반 목록 불러오기 실패 : ', err));
  }, []);
  return (
    <Content>
      <ContentHeader Title={'상담일정 반 선택'} Color={'purple'} />
      <Div>
        <Hint>
          <ImInfo />
          반을 선택하시면 해당 반의 상담일정을 관리하실 수 있습니다.
        </Hint>
        <ClassRoomList classrooms={classrooms} clickEventFunc={(no) => navigate(`/councel/detail/${no}`)} />
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

export default CouncelClassList;
