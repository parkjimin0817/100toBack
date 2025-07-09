import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import ClassRoomCard from '../../components/ClassRoomCard';
import styled from 'styled-components';
import useLoginStore from '../../store/loginStore';
import { classService } from '../../api/class';
import { ImInfo } from 'react-icons/im';
import { BounceLoader } from 'react-spinners';
import { ErrorDiv, Hint, NoneDiv } from '../../styles/Common/Container';

//일과표 반별 리스트 페이지(모든 반이 나옴)
const DailySchedule = () => {
  const { member } = useLoginStore();
  const centerNo = member?.centerNo;
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

  useEffect(() => {
    if (!member) {
      alert('잘못된 접근입니다.');
      return;
    }

    selectClassRoom();
  }, []);
  return (
    <Content>
      <ContentHeader Title={'일과표'} Color={member.memberType === 'PARENT' ? 'green' : 'purple'} />
      {loading ? (
        <ErrorDiv>
          <BounceLoader color={member.memberType === 'PARENT' ? '#4FD377' : '#8772D3'} />
        </ErrorDiv>
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
            해당 반을 선택하시면 일과표가 나옵니다.
          </Hint>
          <ClassRoomCard classrooms={classrooms} address={'/dailyDetail'} />
        </Div>
      )}
    </Content>
  );
};

const Div = styled.div`
  padding: ${({ theme }) => theme.spacing[10]};
`;

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default DailySchedule;
