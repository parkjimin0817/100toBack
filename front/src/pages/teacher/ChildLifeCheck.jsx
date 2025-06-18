import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import CheckListSearchBar from './components/CheckListSearchBar';
import { List } from '../../components/ChildDummyData';
import { format } from 'date-fns';
import LifeCheckListTable from './components/LifeCheckListTable';

const ChildLifeCheck = () => {
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
      const record = child.lifeRecords?.find((r) => r.date === formattedDate);
      return {
        name: child.name,
        meal: record?.meal || '',
        napTime: record?.napTime || '',
        play: record?.play || '',
        social: record?.social || '',
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
      <ContentHeader
        Title="아동 생활 체크리스트"
        Color="orange"
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
        <LifeCheckListTable data={checklist} onEdit={toggleEdit} onChange={handleChange} />
      </Content>
    </Wrapper>
  );
};

export default ChildLifeCheck;

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
