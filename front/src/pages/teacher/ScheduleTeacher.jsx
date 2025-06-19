import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import { useState } from 'react';
import CustomCalendar from '../common/CustomCalendar';
import ScheduleList from './components/ScheduleList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import ScheduleModal from '../common/ScheduleModal';

dayjs.locale('ko');

const data = [
  // 시설장 일정 5개 (날짜 분산)
  {
    id: 1,
    member_no: '1',
    title: '안전 점검 회의',
    description: '정기적인 시설 안전 점검',
    create_date: '2025-06-01',
    start_time: '09:00',
    end_time: '10:00',
    type: '센터',
  },
  {
    id: 2,
    member_no: '1',
    title: '급식 업체 미팅',
    description: '급식 만족도 조사를 위한 미팅',
    create_date: '2025-06-03',
    start_time: '14:00',
    end_time: '15:00',
    type: '센터',
  },
  {
    id: 3,
    member_no: '1',
    title: '보건소 방문',
    description: '아동 건강관리 관련 논의',
    create_date: '2025-06-05',
    start_time: '11:00',
    end_time: '12:00',
    type: '센터',
  },
  {
    id: 4,
    member_no: '1',
    title: '교사 회의',
    description: '월간 교육계획 공유',
    create_date: '2025-06-07',
    start_time: '16:00',
    end_time: '17:00',
    type: '센터',
  },
  {
    id: 5,
    member_no: '1',
    title: '소방 훈련 점검',
    description: '소방훈련 대비 및 장비 확인',
    create_date: '2025-06-10',
    start_time: '10:30',
    end_time: '11:30',
    type: '센터',
  },

  // 교사 일정 5개 (같은 날짜)
  {
    id: 6,
    member_no: '2',
    title: '아침 조회',
    description: '아이들과 하루 시작 준비',
    create_date: '2025-06-10',
    start_time: '09:00',
    end_time: '09:30',
    type: '멤버',
  },
  {
    id: 7,
    member_no: '2',
    title: '수업 준비',
    description: '오전 수업 교구 준비',
    create_date: '2025-06-10',
    start_time: '10:00',
    end_time: '11:00',
    type: '멤버',
  },
  {
    id: 8,
    member_no: '2',
    title: '아이들 점심 지도',
    description: '점심 시간 아이들 식사 지도 및 청소',
    create_date: '2025-06-10',
    start_time: '12:00',
    end_time: '13:00',
    type: '멤버',
  },
  {
    id: 9,
    member_no: '2',
    title: '오후 활동',
    description: '그림 그리기 시간 지도',
    create_date: '2025-06-12',
    start_time: '14:00',
    end_time: '15:00',
    type: '멤버',
  },
  {
    id: 10,
    member_no: '2',
    title: '하원 준비',
    description: '아이들 귀가 준비 및 정리',
    create_date: '2025-06-13',
    start_time: '16:30',
    end_time: '17:00',
    type: '멤버',
  },
];

const ScheduleTeacher = () => {
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD (ddd)'));

  //modal
  const [openModal, setOpenModal] = useState(false);

  const [editSchedule, setEditSchedule] = useState(null);

  const handleDateClick = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    console.log(dateStr);

    const selectDay = dayjs(date).format('YYYY-MM-DD (ddd)');
    setSelectedDate(selectDay);

    const matched = data.filter((item) => item.create_date === dateStr);
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
                      setOpenModal(true), setEditSchedule(null);
                    },
                  },
                ]}
              />
              <ContentSceduleArea>
                <AreaDate>{selectedDate}</AreaDate>
                <AreaList>
                  <ScheduleList
                    schedules={selectedSchedules.filter((item) => item.type === '멤버')}
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
                  <ScheduleList schedules={selectedSchedules.filter((item) => item.type === '센터')} />
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
