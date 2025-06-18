import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { GoDotFill } from 'react-icons/go';
import styled from 'styled-components';
import { media } from '../../styles/MediaQueries';
import useScheduleStore from '../../../store/scheduleStore';
import { useDailyScheduleForm } from '../../hook/useDailyScheduleForm';
import { useSchedule } from '../../api/schedule';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DailyScheduleDetail = () => {
  const { schedule } = useScheduleStore();
  // const {} = useDailyScheduleForm();

  const classNo = useParams();

  const [inSchedule, setInSchedule] = useState([
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '09:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '10:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '11:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '12:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '13:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '14:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '15:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '16:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '17:00', description: '', create_date: '' },
    { schedule_no: 0, center_no: 0, class_no: 0, member_no: 0, start_time: '18:00', description: '', create_date: '' },
  ]);

  const updated = inSchedule.map((item) => {
    const match = schedule.find((s) => s.start_time === item.start_time);
    return {
      ...item,
      schedule_no: match ? match.schedule_no : 0,
      center_no: match ? match.center_no : 0,
      class_no: match ? match.class_no : 0,
      member_no: match ? match.member_no : 0,
      description: match ? match.description : '',
      create_date: match ? match.create_date : '',
    };
  });

  //년도, 월, 일, 요일(숫자), 요일(글자)
  const [arWeek, setArWeek] = useState([]);

  useEffect(() => {
    setInSchedule(updated);
    const today = new Date();
    const todayDay = today.getDay(); // 0 (일요일) ~ 6 (토요일)

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - todayDay); // 일요일 기준 시작

    const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const newWeek = [...Array(7)].map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 1~12
      const day = date.getDate();
      const weekday = date.getDay(); // 요일 (0~6)

      return {
        year,
        month,
        day,
        weekday,
        weekdayNames: weekdayNames[weekday],
        allDate: year + '.' + month.toString().padStart(2, '0') + '.' + day.toString().padStart(2, '0'),
      };
    });

    setArWeek(newWeek);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInSchedule((prev) => prev.map((item) => (item.start_time === name ? { ...item, description: value } : item)));
  };

  const [writeAuthority, setWriteAuthority] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setWriteAuthority(false);
  };

  const today = new Date(); // 기준: 오늘
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // JS는 0-based
  const day = today.getDate();
  const [thisday, setThisday] = useState(
    year + '.' + month.toString().padStart(2, '0') + '.' + day.toString().padStart(2, '0')
  );

  //데이터를 모아서 보내줄 useState
  const [ad, setAd] = useState({
    center_no: 1,
    class_no: classNo,
    member_no: 1,
    create_date: thisday,
    type: 'ClassName',
  });

  const { inputSchedule } = useScheduleStore();
  const selecthandle = async (s) => {
    try {
      setThisday(s.allDate);

      const schedule = await useSchedule.searchDate(ad);
      if (!schedule) {
        throw new Error('일과표 없음');
      }

      inputSchedule({
        center_no: schedule.center_no,
        class_no: schedule.class_no,
        member_no: schedule.member_no,
        description: schedule.description,
        start_time: schedule.start_time,
      });

      toast.success('일과표 불러오기 성공');
    } catch (error) {
      toast.error('일과표 불러오는 중에 문제 발생하였습니다.');
      console.error('불러오기 에러 : ', error);
    }
  };

  return (
    <>
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
                {arWeek.map((s) => (
                  <WeekTr
                    key={s.day}
                    $thisday={thisday}
                    $day={s.year + '.' + s.month.toString().padStart(2, '0') + '.' + s.day.toString().padStart(2, '0')}
                    $weekNumber={s.weekday}
                    onClick={() => selecthandle(s)}
                  >
                    <td>{s.weekdayNames}</td>
                    <td>{s.day}</td>
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
                {inSchedule.map((sc) => (
                  <Tr key={sc.schedule_no || sc.start_time}>
                    <Td>
                      <IconDiv>
                        <GoDotFill />
                      </IconDiv>
                    </Td>
                    <Td>{sc.start_time}</Td>
                    <Td>
                      {writeAuthority === true ? (
                        <Input
                          type="text"
                          name={sc.start_time}
                          value={sc.description}
                          onChange={handleChange}
                          placeholder="활동 입력하기"
                        />
                      ) : (
                        <ActivityTitle>
                          {sc.description === '' ? <ActivityNone>활동을 등록해주세요.</ActivityNone> : sc.description}
                        </ActivityTitle>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Form>
        </Border>
      </Div>
    </>
  );
};

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
  width: 420px;
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
`;

const ActivityNone = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ActivityTitle = styled.span`
  padding: 0 ${({ theme }) => theme.spacing[1]};
`;
export default DailyScheduleDetail;
