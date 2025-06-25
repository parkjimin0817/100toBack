import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import CustomCalendar from '../../components/CustomCalendar';
import ScheduleList from './components/ScheduleList';
import useLoginStore from '../../store/loginStore';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useScheduleService } from '../../api/schedule';

import ScheduleModal from '../../components/ScheduleModal';

dayjs.locale('ko');

const ScheduleTeacher = () => {
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD (ddd)'));
  const { member } = useLoginStore();
  const [data, setData] = useState([]);
  const [scheduleType, setScheduleType] = useState('');

  const fetchData = async () => {
    try {
      const scheduleData = await useScheduleService.getScheduleList(member.centerNo, member.memberNo);
      const sortedData = [...scheduleData].sort((a, b) => a.start_time.localeCompare(b.start_time));
      setData(sortedData);
      const today = dayjs().format('YYYY-MM-DD');
      const todaySchedules = sortedData.filter((item) => dayjs(item.schedule_date).format('YYYY-MM-DD') === today);
      setSelectedSchedules(todaySchedules);
      setSelectedDate(dayjs().format('YYYY-MM-DD (ddd)'));
    } catch (error) {
      console.error('스케줄 데이터 로딩 실패:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    handleDateClick(dayjs().format('YYYY-MM-DD'));
  }, []);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);

  const handleDateClick = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(dayjs(date).format('YYYY-MM-DD (ddd)'));
    const matched = data.filter((item) => dayjs(item.schedule_date).format('YYYY-MM-DD') === dateStr);
    setSelectedSchedules(matched);
  };

  const handleEditClick = (item) => {
    setEditSchedule(item);
    setOpenModal(true);
  };

  return (
    <>
      <Content>
        <ContentHeader Title={'교사 일정'} Color={'purple'}></ContentHeader>
        <ContentWrapper>
          <ContentLeft>
            <CustomCalendar scheduleData={data} onDateClick={handleDateClick} />
          </ContentLeft>
          <ContentRight>
            <ContentRightTop>
              <ContentHeader
                Title={'개인 일정'}
                Color={'purple'}
                FontSize={'xl'}
                ButtonProps={[
                  {
                    Title: '일정 추가',
                    func: () => {
                      setOpenModal(true), setEditSchedule(null), setScheduleType('MEMBER');
                    },
                  },
                ]}
              />
              <ContentSceduleArea>
                <AreaDate>{selectedDate}</AreaDate>
                <AreaList>
                  <ScheduleList
                    schedules={selectedSchedules.filter((item) => item.type === 'MEMBER')}
                    onEditClick={handleEditClick}
                  />
                </AreaList>
              </ContentSceduleArea>
            </ContentRightTop>
            <ContentRightBottom>
              <ContentHeader Title={'유치원 일정'} Color={'purple'} FontSize={'xl'} />
              <ContentSceduleArea>
                <AreaDate>{selectedDate}</AreaDate>
                <AreaList>
                  <ScheduleList schedules={selectedSchedules.filter((item) => item.type === 'CENTER')} />
                </AreaList>
              </ContentSceduleArea>
            </ContentRightBottom>
          </ContentRight>
        </ContentWrapper>
      </Content>
      <ScheduleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        selectedDate={selectedDate.split(' ')[0]}
        initialData={editSchedule}
        type={scheduleType}
        onSuccess={fetchData}
      />
    </>
  );
};

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: ${({ theme }) => theme.spacing[10]};
  gap: ${({ theme }) => theme.spacing[6]};
`;

const ContentLeft = styled.div`
  width: 60%;
  height: 100%;
  min-height: 600px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ContentRight = styled.div`
  width: 40%;
  height: 100%;
  min-height: 600px;
`;

const ContentRightTop = styled.div`
  width: 100%;
  height: 50%;

  min-height: 290px;
  margin-bottom: ${({ theme }) => theme.spacing[5]};

  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ContentSceduleArea = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const AreaDate = styled.div`
  width: 100%;
  height: 10%;
  padding: ${({ theme }) => theme.spacing[2]};
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AreaList = styled.div`
  width: 100%;
  height: 90%;
  padding: ${({ theme }) => theme.spacing[2]};
`;

const ContentRightBottom = styled.div`
  width: 100%;
  height: 50%;

  min-height: 290px;

  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export default ScheduleTeacher;
