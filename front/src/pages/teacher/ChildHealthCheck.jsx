import React, { useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import CheckListSearchBar from './components/CheckListSearchBar';
import HealthCheckListTable from './components/HealthCheckListTable';
import { useState } from 'react';
import { format } from 'date-fns';

const mockData = [
  {
    date: '2025-06-13',
    class: '햇님반',
    checklist: [
      {
        name: '박지민',
        temp: '37.5',
        height: '100',
        weight: '18',
        symptom: '기침',
        memo: '오늘 기침 조금 했어요',
      },
      {
        name: '양동민',
        temp: '36.9',
        height: '95',
        weight: '16',
        symptom: '없음',
        memo: '정상',
      },
    ],
  },
  {
    date: '2025-06-14',
    class: '달님반',
    checklist: [
      {
        name: '홍길동',
        temp: '37.1',
        height: '110',
        weight: '19',
        symptom: '콧물',
        memo: '콧물이 계속 나요',
      },
    ],
  },
];

const ChildHealthCheck = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('햇님반'); //로그인된 유저 반 예시
  const [matchedData, setMatchedData] = useState(null);

  const handleSearch = () => {
    if (!selectedDate || !(selectedDate instanceof Date) || !selectedClass) {
      alert('반과 날짜를 모두 선택해주세요.');
      return;
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd'); //뒤에 시간 버리기
    console.log('📅 formattedDate:', formattedDate);
    console.log('🏫 selectedClass:', selectedClass);
    const found = mockData.find((data) => data.date === formattedDate && data.class === selectedClass);
    console.log('🔍 matched result:', found);

    setMatchedData(found);
  };

  //페이지 들어오면 자동으로 1번 조회
  useEffect(() => {
    if (selectedDate && selectedClass) {
      handleSearch();
    }
  }, []);

  return (
    <Wrapper>
      <ContentHeader
        Title={'아동 건강 체크리스트'}
        Color={'orange'}
        FontSize="xl"
        ButtonProps={[
          { Title: '뒤로가기', func: () => alert('뒤로가기~') },
          { Title: '앞으로가기', func: () => alert('앞으로가기~') },
        ]}
      />
      <Content>
        <CheckListSearchBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          onSearch={handleSearch}
        />
        <HealthCheckListTable data={matchedData ? matchedData.checklist : []} />
        {!matchedData && <p style={{ marginTop: '10px' }}>조회된 결과가 없습니다.</p>}
      </Content>
    </Wrapper>
  );
};

export default ChildHealthCheck;
const Wrapper = styled.div``;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
