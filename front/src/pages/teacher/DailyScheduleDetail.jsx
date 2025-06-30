import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { GoDotFill } from 'react-icons/go';
import styled from 'styled-components';
// import { media } from '../../styles/MediaQueries';
import useScheduleStore from '../../store/scheduleStore';
// import { useDailyScheduleForm } from '../../hook/useDailyScheduleForm';
import { useScheduleService } from '../../api/schedule';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaMinus } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useLoginStore from '../../store/loginStore';

const DailyScheduleDetail = () => {
  // const {} = useDailyScheduleForm();
  const { member } = useLoginStore();

  const { class_no } = useParams();

  //데이터를 모아서 보내줄 useState
  const [ad, setAd] = useState([]);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('');
  const [writeAuthority, setWriteAuthority] = useState(false);

  const today = dayjs(); // 오늘 날짜
  const [thisday, setThisday] = useState(today.format('YYYY-MM-DD'));

  //년도, 월, 일, 요일(숫자), 요일(글자)
  const [arWeek, setArWeek] = useState([]);

  //년도, 월, 일, 요일(숫자), 요일(글자) 추가
  useEffect(() => {
    const today = dayjs();
    const startOfWeek = today.startOf('week'); // 일요일 시작

    const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const newWeek = Array.from({ length: 7 }, (_, i) => {
      const date = startOfWeek.add(i, 'day');

      return {
        year: date.year(),
        month: date.month() + 1, // 0-based → +1
        day: date.date(),
        weekday: date.day(), // 0 (일) ~ 6 (토)
        weekdayNames: weekdayNames[date.day()],
        allDate: date.format('YYYY-MM-DD'),
      };
    });

    setArWeek(newWeek);
  }, []);

  console.log(arWeek);

  //입력 시 상태 변경
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'activity':
        setTitle(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
      default:
        break;
    }
  };

  //수정 / 등록
  const handleSubmit = (ev) => {
    ev.preventDefault();

    setWriteAuthority(false);
  };

  const selecthandle = async (sch) => {
    try {
      setThisday(sch.allDate);

      setAd({
        title: title,
        center_no: member.center_no,
        class_no: class_no,
        member_no: member.member_no,
        create_date: thisday,
        start_time: startTime,
        end_time: endTime,
        type: 'CLASSROOM',
      });

      const schedule = await useScheduleService.searchDate(ad);
      if (!schedule) {
        throw new Error('일과표 없음');
      }

      toast.success('일과표 불러오기 성공');
    } catch (error) {
      toast.error('일과표 불러오는 중에 문제 발생하였습니다.');
      console.error('불러오기 에러 : ', error);
    }
  };

  const handleAddButton = () => {
    setAd();
  };

  return (
    <Content>
      <ContentHeader
        Title={'일과표'}
        Color={'purple'}
        ButtonProps={[
          {
            Title: '일과 등록 및 수정',
            func: () => {
              writeAuthority === false ? setWriteAuthority(true) : setWriteAuthority(false);
            },
          },
        ]}
      />
      <Div>
        <div>
          <h3>우리반 일과표</h3>
          <h1>{thisday}</h1>
          <WeekDiv>
            <WeekTable>
              <WeekTbody>
                {arWeek.map((schedule) => (
                  <WeekTr
                    key={schedule.day}
                    $thisday={thisday}
                    $day={
                      schedule.year +
                      '-' +
                      schedule.month.toString().padStart(2, '0') +
                      '-' +
                      schedule.day.toString().padStart(2, '0')
                    }
                    $weekNumber={schedule.weekday}
                    onClick={() => selecthandle(schedule)}
                  >
                    <td>{schedule.weekdayNames}</td>
                    <td>{schedule.day}</td>
                  </WeekTr>
                ))}
              </WeekTbody>
            </WeekTable>
          </WeekDiv>
        </div>

        <Border>
          <Form onSubmit={handleSubmit}>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <IconDiv>
                      <GoDotFill />
                    </IconDiv>
                  </Td>
                  <Td>
                    {writeAuthority === true ? (
                      <TableInput
                        type="text"
                        name="startTime"
                        value={startTime}
                        onChange={handleChange}
                        placeholder="시작 시간"
                      />
                    ) : (
                      <ActivityTitle>
                        {startTime === '' ? <ActivityNone>시작 시간</ActivityNone> : startTime}
                      </ActivityTitle>
                    )}
                  </Td>
                  <Td>-</Td>
                  <Td>
                    {writeAuthority === true ? (
                      <TableInput
                        type="text"
                        name="endTime"
                        value={endTime}
                        onChange={handleChange}
                        placeholder="종료 시간"
                      />
                    ) : (
                      <ActivityTitle>{endTime === '' ? <ActivityNone>종료 시간</ActivityNone> : endTime}</ActivityTitle>
                    )}
                  </Td>
                  <Td>
                    {writeAuthority === true ? (
                      <Input
                        type="text"
                        name="activity"
                        value={title}
                        onChange={handleChange}
                        placeholder="활동 입력하기"
                      />
                    ) : (
                      <ActivityTitle>
                        {title === '' ? <ActivityNone>활동을 등록해주세요.</ActivityNone> : title}
                      </ActivityTitle>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <AddButtonTd>
                    <AddButton type="button" onClick={handleAddButton}>
                      <FaPlus />
                    </AddButton>
                  </AddButtonTd>
                </Tr>
              </Tbody>
            </Table>
          </Form>
        </Border>
      </Div>
    </Content>
  );
};

const TableInput = styled.input`
  width: 70px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const AddButtonTd = styled.td`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.button`
  width: 100%;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const WeekDiv = styled.div`
  margin: 10px;
`;

const WeekTable = styled.table`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeekTbody = styled.tbody`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const WeekTr = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 30px;

  color: ${({ $weekNumber, theme }) => ($weekNumber === 0 ? theme.colors.orange : theme.colors.black)};
  background-color: ${({ $thisday, theme, $day }) => ($thisday === $day ? theme.colors.yellow : theme.colors.white)};

  &:hover {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;

const Div = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const Border = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Form = styled.form`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Table = styled.table`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Tbody = styled.tbody`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 15px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.lightyellow};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Td = styled.td`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const Tr = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  gap: 10px;
  width: 100%;
`;

const ActivityNone = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ActivityTitle = styled.span`
  padding: 0 ${({ theme }) => theme.spacing[1]};
`;
export default DailyScheduleDetail;
