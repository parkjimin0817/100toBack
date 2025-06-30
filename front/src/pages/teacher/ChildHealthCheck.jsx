import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ContentHeader from '../../components/Common/ContentHeader';
import CheckListSearchBar from './components/CheckListSearchBar';
import HealthCheckListTable from './components/HealthCheckListTable';
import { format } from 'date-fns';
import useLoginStore from '../../store/loginStore';

const ChildHealthCheck = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClassNo, setSelectedClassNo] = useState('');
  const [classList, setClassList] = useState([]);
  const [checklist, setChecklist] = useState([]);

  const member = useLoginStore((state) => state.member);
  const centerNo = member.centerNo;

  // 시설별 반 목록 가져오기
  useEffect(() => {
    if (!centerNo) return;
    const fetchClassList = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/classroom/list/${centerNo}`);
        setClassList(response.data);
      } catch (error) {
        console.error('반 목록 불러오기 실패', error);
      }
    };
    fetchClassList();
  }, [centerNo]);

  // 검색 시 실행
  const handleSearch = async () => {
    if (!selectedDate || !selectedClassNo) {
      alert('반과 날짜를 모두 선택해주세요.');
      return;
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    try {
      // 1. 반에 속한 아동 전체 조회
      const childRes = await axios.get(`http://localhost:8888/api/childs`, {
        params: { classNo: selectedClassNo },
      });
      const children = childRes.data;

      // 2. 해당 날짜의 건강 로그 조회
      const logRes = await axios.get('http://localhost:8888/api/childs/healthlog/class', {
        params: {
          classNo: selectedClassNo,
          date: formattedDate,
        },
      });
      const logs = logRes.data;

      // 3. 아동 정보와 건강 기록 병합
      const mergedChecklist = children.map((child) => {
        const matchedLog = logs.find((log) => log.child_name === child.child_name);
        return {
          name: child.child_name,
          temp: matchedLog?.temperature || '',
          height: matchedLog?.height || '',
          weight: matchedLog?.weight || '',
          symptom: matchedLog?.symptoms || '',
          memo: matchedLog?.healthLogMemo || '',
          editable: false,
        };
      });

      setChecklist(mergedChecklist);
    } catch (error) {
      console.error('건강 체크리스트 불러오기 실패:', error);
    }
  };

  const toggleEdit = (index) => {
    setChecklist((prev) => prev.map((item, i) => (i === index ? { ...item, editable: !item.editable } : item)));
  };

  const handleChange = (index, field, value) => {
    setChecklist((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  return (
    <Wrapper>
      <ContentHeader Title="아동 건강 체크리스트" Color="orange" />
      <Content>
        <CheckListSearchBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedClassNo={selectedClassNo}
          setSelectedClassNo={setSelectedClassNo}
          onSearch={handleSearch}
          classList={classList}
        />
        <HealthCheckListTable data={checklist} onEdit={toggleEdit} onChange={handleChange} />
      </Content>
    </Wrapper>
  );
};

export default ChildHealthCheck;

// 스타일
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
