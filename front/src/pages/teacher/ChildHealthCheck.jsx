import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import CheckListSearchBar from './components/CheckListSearchBar';
import HealthCheckListTable from './components/HealthCheckListTable';
import { useState } from 'react';

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
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [matchedData, setMatchedData] = useState(null);

  const handleSearch = () => {
    if (!selectedDate || !selectedClass) {
      alert('반과 날짜를 모두 선택해주세요.');
      return;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
  };
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
        <CheckListSearchBar />
        <HealthCheckListTable data={mockData} />
      </Content>
    </Wrapper>
  );
};

export default ChildHealthCheck;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
