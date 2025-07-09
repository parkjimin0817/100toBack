import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import ContentHeader from '../../components/Common/ContentHeader';
import CouncelSearchBar from './CouncelSearchBar';
import CouncelListTable from './CouncelListTable';
import { toast } from 'react-toastify';
import useLoginStore from '../../store/loginStore';
import CouncelScheduleModal from './components/CouncelScheduleModal';
import api from '../../api/axios';

const CouncelSettingPage = () => {
  const { classNo } = useParams();

  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [dateFilterType, setDateFilterType] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checklist, setChecklist] = useState([]);

  const member = useLoginStore((state) => state.member);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.get(`http://localhost:8888/api/counsel`, {
        params: {
          classNo,
        },
      });

      const allData = response.data;

      const filtered = allData.filter((item) => {
        const matchStatus = selectedStatus === 'ALL' || item.counsel_status === selectedStatus;
        const matchDate =
          dateFilterType === 'ALL' ||
          format(new Date(item.counsel_date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        return matchStatus && matchDate;
      });

      const mapped = filtered.map((item) => ({
        counselNo: item.counsel_no,
        name: item.child_name,
        type: item.counsel_type,
        time: `${item.counsel_start} ~ ${item.counsel_end}`,
        date: item.counsel_date,
        status: item.counsel_status,
      }));

      setChecklist(mapped);
    } catch (err) {
      toast.error('상담 정보를 불러오지 못했습니다.', err);
    }
  };

  return (
    <Wrapper>
      <ContentHeader
        Title="상담 일정"
        Color="purple"
        ButtonProps={[
          {
            Title: '뒤로가기',
            func: () => navigate(-1),
          },
        ]}
      />
      <Content>
        <CouncelSearchBar
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          dateFilterType={dateFilterType}
          setDateFilterType={setDateFilterType}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSearch={handleSearch}
          onCreate={() => setOpenModal(true)}
        />
        <CouncelListTable data={checklist} memberType={member.memberType} onRefresh={handleSearch} />
      </Content>
      <CouncelScheduleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        classNo={classNo}
        onSuccess={handleSearch}
      />
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