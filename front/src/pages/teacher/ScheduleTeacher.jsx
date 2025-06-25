import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import CustomCalendar from '../../components/CustomCalendar';
import ScheduleList from './components/ScheduleList';
import useLoginStore from '../../store/loginStore';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import ScheduleModal from '../../components/ScheduleModal';

dayjs.locale('ko');

const data = [
  // 시설장 일정 5개 (날짜 분산)
  {
    id: 1,
    member_no: '1',
    title: '안전 점검 회의',
    description: '정기적인 시설 안전 점검',
    create_date: '2025-06-26',
    start_time: '09:00',
    end_time: '10:00',
    type: '센터',
  },
  // 교사 일정 5개 (같은 날짜)
  {
    id: 6,
    member_no: '2',
    title: '아침 조회',
    description: '아이들과 하루 시작 준비',
    create_date: '2025-06-26',
    start_time: '09:00',
    end_time: '09:30',
    type: '멤버',
  },
];

const ScheduleTeacher = () => {
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD (ddd)'));
  const { member } = useLoginStore();

  console.log(member.memberName);

  useEffect(() => {
    console.log('스토어 member:', member);
  }, [member]);

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
