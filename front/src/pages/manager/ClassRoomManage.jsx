import React, { useState, useEffect } from 'react';
import ClassRoomCard from '../../components/ClassRoomCard';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateClassModal from './components/CreateClassModal';
import useLoginStore from '../../store/loginStore';
import { classService } from '../../api/class';
import { ImInfo } from 'react-icons/im';
import { BounceLoader } from 'react-spinners';
import { ErrorDiv, Hint, NoneDiv } from '../../styles/Common/Container';

//출석 체크 시 반별 페이지(모든 반이 나옴)
const ClassRoomManage = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectClassRoom = async () => {
    try {
      setLoading(true);
      setError('');

      const classList = await classService.classroomlist(centerNo);

      if (classList.length === 0) {
        setClassrooms([]);
      } else {
        setClassrooms(classList);
      }
    } catch (error) {
      console.error('반 목록 불러오기 실패: ', error.message);
      setError('반 목록 불러오는데 실패하였습니다.');
    } finally {
      setLoading(false);
    }
  };

  //반 목록 불러오기
  useEffect(() => {
    if (!centerNo) {
      alert('잘못된 접근입니다.');
      if (member) {
        navigate('/manager/main');
        return;
      } else {
        navigate('/');
        return;
      }
    }

    selectClassRoom();
  }, []);

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
      {loading ? (
        <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <BounceLoader color="#1A748E" />
        </Div>
      ) : error ? (
        <ErrorDiv>
          <h1>{error}</h1>
        </ErrorDiv>
      ) : classrooms.length === 0 ? (
        <NoneDiv>
          <h1>현재 개설된 반이 없습니다.</h1>
          <h1>새로운 반이 개설되면 이곳에 표시됩니다</h1>
        </NoneDiv>
      ) : (
        <Div>
          <Hint>
            <ImInfo />
            해당 반을 선택하시면 수정하실 수 있습니다.
          </Hint>
          <ClassRoomCard classrooms={classrooms} isDisabled={true} />
        </Div>
      )}

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
  min-height: 580px;
  padding: ${({ theme }) => theme.spacing[10]};
`;

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ClassRoomManage;
