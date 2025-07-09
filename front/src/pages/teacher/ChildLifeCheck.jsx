import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import CheckListSearchBar from './components/CheckListSearchBar';
import LifeCheckListTable from './components/LifeCheckListTable';
import { format } from 'date-fns';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const ChildLifeCheck = () => {
  const member = useLoginStore((state) => state.member);
  const centerNo = member.centerNo;
  const memberType = member.memberType;
  const classNo = member.classNo;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClassNo, setSelectedClassNo] = useState(classNo ? classNo : '');
  const [classList, setClassList] = useState([]);
  const [checklist, setChecklist] = useState([]);

  // 반 목록: 교사/시설장만
  useEffect(() => {
    if (!centerNo || memberType === 'PARENT') return;

    const fetchClassList = async () => {
      try {
        const response = await api.get(`http://localhost:8888/api/classroom/list/${centerNo}`);
        setClassList(response.data);
      } catch (error) {
        toast.error('반 목록 불러오기 실패', error);
      }
    };

    fetchClassList();
  }, [centerNo, memberType]);

  useEffect(() => {
    // 부모가 아니고, 반이 미소속인 경우 불러오지 않음.
    if(memberType !== 'PARENT' && !selectedClassNo) return;

    // 부모이거나 소속된 반이 있는 경우 바로 조회
    handleSearch();
  }, [])

  // 검색 실행
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
        // 로그 데이터가 없을 경우에도 아이들을 불러와서 빈칸으로 보여줘야 하기 때문에
        const childRes = await api.get(`http://localhost:8888/api/childs/parentChild`, {
          params: { memberNo: member.memberNo },
        });
        children = childRes.data;

        const logRes = await api.get(`http://localhost:8888/api/childs/activitylog/parent`, {
          params: { memberNo: member.memberNo, date: formattedDate },
        });
        logs = logRes.data;
      } else {
        // 로그 데이터가 없을 경우에도 아이들을 불러와서 빈칸으로 보여줘야 하기 때문에
        const childRes = await api.get(`http://localhost:8888/api/childs`, {
          params: { classNo: selectedClassNo },
        });
        children = childRes.data;

        const logRes = await api.get(`http://localhost:8888/api/childs/activitylog/class`, {
          params: { classNo: selectedClassNo, date: formattedDate },
        });
        logs = logRes.data;
      }

      // 병합
      const checklist = children.map((child) => {
        const matchedLog = logs.find((log) => log.child_no === child.child_no);
        return {
          name: child.child_name,
          child_no: child.child_no,
          meal: matchedLog?.dailyMeal_amount || '',
          napStart: matchedLog?.napStart_time || '',
          napEnd: matchedLog?.napEnd_time || '',
          napTime:
            matchedLog?.napStart_time && matchedLog?.napEnd_time
              ? `${matchedLog.napStart_time.substring(0, 5)} ~ ${matchedLog.napEnd_time.substring(0, 5)}`
              : '',
          play: matchedLog?.play_participation || '',
          social: matchedLog?.daily_friendship || '',
          memo: matchedLog?.activity_log_memo || '',
          editable: false,
        };
      });

      setChecklist(checklist);
    } catch (error) {
      toast.error('생활 체크리스트 불러오기 실패', error);
    }
  };

  const toggleEdit = async (index) => {
    if (memberType === 'PARENT') return;

    const item = checklist[index];
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    if (item.editable) {
      try {
        await api.patch(
          `http://localhost:8888/api/childs/updateactivitylog`,
          {
            dailyMeal_amount: item.meal,
            napStart_time: item.napStart,
            napEnd_time: item.napEnd,
            play_participation: item.play,
            daily_friendship: item.social,
            activity_log_memo: item.memo,
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
        toast.error('저장 실패');
      }
    }

    setChecklist((prev) => prev.map((item, i) => (i === index ? { ...item, editable: !item.editable } : item)));
  };

  const handleChange = (index, field, value) => {
    setChecklist((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  return (
    <Wrapper>
      <ContentHeader Title="아동 생활 체크리스트" Color="orange" />
      <Content>
        <CheckListSearchBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedClassNo={selectedClassNo}
          setSelectedClassNo={setSelectedClassNo}
          onSearch={handleSearch}
          classList={memberType !== 'PARENT' ? classList : null}
        />
        <LifeCheckListTable data={checklist} onEdit={toggleEdit} onChange={handleChange} memberType={memberType} />
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
