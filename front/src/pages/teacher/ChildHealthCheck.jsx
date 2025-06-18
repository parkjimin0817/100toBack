import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import CheckListSearchBar from './components/CheckListSearchBar';
import { List } from '../../components/ChildDummyData';
import { format } from 'date-fns';
import HealthCheckListTable from './components/HealthCheckListTable';

const ChildHealthCheck = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('햇님반');
  const [checklist, setChecklist] = useState([]);

  const handleSearch = () => {
    if (!selectedDate || !(selectedDate instanceof Date) || !selectedClass) {
      alert('반과 날짜를 모두 선택해주세요.');
      return;
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    const childrenInClass = List.filter((child) => child.className === selectedClass);

    const filledChecklist = childrenInClass.map((child) => {
      const record = child.healthRecords?.find((r) => r.date === formattedDate);
      return {
        name: child.name,
        temp: record?.temp || '',
        height: record?.height || '',
        weight: record?.weight || '',
        symptom: record?.symptom || '',
        memo: record?.memo || '',
        editable: false,
      };
    });

    setChecklist(filledChecklist);
  };

  useEffect(() => {
    if (selectedDate && selectedClass) {
      handleSearch();
    }
  }, []);

  const toggleEdit = (index) => {
    setChecklist((prev) => prev.map((item, i) => (i === index ? { ...item, editable: !item.editable } : item)));
  };

  const handleChange = (index, field, value) => {
    setChecklist((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  return (
    <Wrapper>
      <ContentHeader Title={'아동 건강 체크리스트'} Color={'orange'} />
      <Content>
        <CheckListSearchBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          onSearch={handleSearch}
        />
        <HealthCheckListTable data={checklist} onEdit={toggleEdit} onChange={handleChange} />
      </Content>
    </Wrapper>
  );
};

export default ChildHealthCheck;

const Wrapper = styled.div`
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
