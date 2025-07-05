import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ContentHeader from '../../components/Common/ContentHeader';
import CheckListSearchBar from '../teacher/components/CheckListSearchBar';
import HealthCheckListTable from '../teacher/components/HealthCheckListTable';
import { format } from 'date-fns';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';

const CouncelSettingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClassNo, setSelectedClassNo] = useState('');
  const [classList, setClassList] = useState([]);
  const [checklist, setChecklist] = useState([]);

  const member = useLoginStore((state) => state.member);
  const centerNo = member.centerNo;
  const memberType = member.memberType;

  // 시설별 반 목록 가져오기, 학부모가 들어올 경우 반 목록 안 불러오기
  useEffect(() => {
    if (!centerNo || !memberType || memberType === 'PARENT') return;

    const fetchClassList = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/classroom/list/${centerNo}`);
        setClassList(response.data);
      } catch (error) {
        toast.error('반 목록 불러오기 실패', error);
      }
    };

    fetchClassList();
  }, [centerNo, memberType]);

  // 검색 시 실행
  const handleSearch = async () => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    if (!selectedDate) {
      toast.error('날짜를 선택해주세요.');
      return;
    }

    if (memberType !== 'PARENT' && !selectedClassNo) {
      toast.error('반과 날짜를 모두 선택해주세요.');
      return;
    }

    try {
      let children = [];
      let logs = [];

      if (memberType === 'PARENT') {
        //로그 데이터가 없을 경우에도 아동의 이름과 빈칸을 띄워야 하기 때문에 불러와서 로그 데이터들과 병합을 한다.
        const childRes = await axios.get(`http://localhost:8888/api/childs/parentChild`, {
          params: { memberNo: member.memberNo },
        });
        children = childRes.data;

        const logRes = await axios.get(`http://localhost:8888/api/childs/healthlog/parent`, {
          params: { memberNo: member.memberNo, date: formattedDate },
        });
        logs = logRes.data;
      } else {
        //로그 데이터가 없을 경우에도 아동의 이름과 빈칸을 띄워야 하기 때문에 불러와서 로그 데이터들과 병합을 한다.
        const childRes = await axios.get(`http://localhost:8888/api/childs`, {
          params: { classNo: selectedClassNo },
        });
        children = childRes.data;

        const logRes = await axios.get(`http://localhost:8888/api/childs/healthlog/class`, {
          params: { classNo: selectedClassNo, date: formattedDate },
        });
        logs = logRes.data;
      }

      //  병합
      const checklist = children.map((child) => {
        const matchedLog = logs.find((log) => log.child_no === child.child_no);
        return {
          name: child.child_name,
          child_no: child.child_no,
          temp: matchedLog?.temperature || '',
          height: matchedLog?.height || '',
          weight: matchedLog?.weight || '',
          symptom: matchedLog?.symptoms || '',
          memo: matchedLog?.healthLogMemo || '',
          editable: false,
        };
      });

      setChecklist(checklist);
    } catch (error) {
      toast.error('건강 체크리스트 불러오기 실패', error);
    }
  };

  const toggleEdit = async (index) => {
    const item = checklist[index];
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    if (item.editable) {
      try {
        await axios.patch(
          `http://localhost:8888/api/childs/updatehealthlog`,
          {
            temperature: item.temp,
            height: item.height,
            weight: item.weight,
            symptoms: item.symptom,
            healthLogMemo: item.memo,
          },
          {
            params: {
              childNo: item.child_no,
              date: formattedDate,
            },
          }
        );
        toast.success('저장되었습니다!');
      } catch (error) {
        toast.error('저장 실패하였습니다.', error);
      }
    }

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
        <HealthCheckListTable data={checklist} onEdit={toggleEdit} onChange={handleChange} memberType={memberType} />
      </Content>
    </Wrapper>
  );
};

export default CouncelSettingPage;

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
