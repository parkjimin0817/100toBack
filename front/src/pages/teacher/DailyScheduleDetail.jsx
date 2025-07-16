import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { GoDotFill } from 'react-icons/go';
import styled from 'styled-components';
// import { media } from '../../styles/MediaQueries';
// import { useDailyScheduleForm } from '../../hook/useDailyScheduleForm';
import { useScheduleService } from '../../api/schedule';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaMinus } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useLoginStore from '../../store/loginStore';
import { ImInfo } from 'react-icons/im';
import { TiDelete } from 'react-icons/ti';

const DailyScheduleDetail = () => {
  const { member } = useLoginStore();
  const { class_no } = useParams();
  const navigate = useNavigate();

  //등록 / 수정으로 넘어가는 값
  const [writeAuthority, setWriteAuthority] = useState(false);

  //요청 보낼 데이터값
  const [inputs, setInputs] = useState([]);

  const today = dayjs(); // 오늘 날짜
  const [thisday, setThisday] = useState(today.format('YYYY-MM-DD'));

  //년도, 월, 일, 요일(숫자), 요일(글자)
  const [arWeek, setArWeek] = useState([]);

  //상태를 보여주는 글
  // const [status, setStatus] = useState('');

  const fetchdata = async (sch) => {
    try {
      setWriteAuthority(false);
      const selectedDate = sch?.allDate ?? dayjs().format('YYYY-MM-DD');
      setThisday(selectedDate);

      const schedule = await useScheduleService.dailyScheduleSelect(member.centerNo, class_no, selectedDate);

      if (!schedule) {
        throw new Error('일정표 없음');
      }

      setInputs(schedule);
    } catch (error) {
      toast.error('일정표 불러오는 중에 문제 발생하였습니다.');
      console.error('불러오기 에러 : ', error);
    }
  };

  //  PARENT가 아닌 경우에만 상태 메시지
  // useEffect(() => {
  //   if (member.memberType !== 'PARENT') {
  //     setStatus('일정을 등록해주세요.');
  //   }
  // }, [thisday]);

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
    fetchdata();
  }, []);

  //일정표 생성
  const handleAddButton = async () => {
    try {
      const newItem = {
        schedule_date: thisday,
        start_time: null,
        end_time: null,
        title: '일정표',
        description: null,
        type: 'CLASSROOM',
        center_no: member.centerNo,
        class_no: class_no,
        member_no: member.memberNo,
      };

      const scheduleNos = await useScheduleService.dailyCreate([newItem]);
      if (!scheduleNos || scheduleNos.length !== 1) {
        throw new Error('일정 등록 생성에 실패했습니다.');
      }

      const newItemWithScheduleNo = {
        ...newItem,
        schedule_no: scheduleNos[0],
      };

      setInputs((prev) => [...prev, newItemWithScheduleNo]);

      // setStatus('일정 등록에 성공했습니다.');
    } catch (error) {
      toast.error('일정 등록에 실패했습니다.');
      console.error('일정 등록 실패 : ', error);
    }
  };

  //입력 시 상태 변경
  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setInputs(updated);
  };

  //수정 / 등록
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (inputs.length === 0) {
        setWriteAuthority(false);
        return;
      }

      const updateDailySchedule = await useScheduleService.dailyUpdate(inputs);

      if (!updateDailySchedule) {
        throw new Error('일정 등록에 실패했습니다.');
      }

      toast.success('일정 등록에 성공했습니다.');
      // setStatus('일정 등록에 성공했습니다.');
    } catch (error) {
      toast.error('일정 등록에 실패했습니다.');
      // setStatus('일정 등록에 실패했습니다.');
    }
    setWriteAuthority(false);
  };

  //해당 일정표 삭제
  const handleDelete = async (schedule_no) => {
    try {
      const deleteDailySchedule = await useScheduleService.dailyDelete(schedule_no);

      if (!deleteDailySchedule) {
        throw new Error('일정 삭제 실패했습니다.');
      }

      // setStatus('일정 삭제 성공했습니다.');
      fetchdata({ allDate: thisday });
      setWriteAuthority(true);
    } catch (error) {
      toast.error('일정 삭제 실패했습니다.');
      // setStatus('일정 삭제 실패했습니다.');
    }
  };

  return (
    <Content onSubmit={handleSubmit}>
      <ContentHeader
        Title={'일과표'}
        Color={member.memberType === 'PARENT' ? 'green' : 'purple'}
        ButtonProps={[
          {
            Title: '뒤로 가기',
            func: () => navigate(-1),
          },
          // PARENT가 아닐 때만 일정표 작성/등록 버튼 노출
          ...(member.memberType !== 'PARENT'
            ? writeAuthority === false
              ? [
                  {
                    Title: '일정표 작성하기',
                    func: (e) => {
                      e.preventDefault();
                      setWriteAuthority(true);
                    },
                  },
                ]
              : [
                  {
                    Title: '일정표 등록하기',
                    type: 'submit',
                  },
                ]
            : []),
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
                    onClick={() => fetchdata(schedule)}
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
          <Form>
            {member &&
              member.memberType !== 'PARENT' && ( // 학부모 인경우에는 힌트 메세지가 필요 없음.
                <HintArea>
                  <ImInfo />
                  일정을 확인하고 등록해보세요!
                </HintArea>
              )}
            <InnerBorder $writeAuthority={writeAuthority}>
              {inputs.length === 0 && !writeAuthority ? (
                <NotingAnyMore>
                  <h1>일정이 없습니다.</h1>
                </NotingAnyMore>
              ) : (
                <div>
                  {inputs.map((input, index) => (
                    <Line key={index}>
                      <OutIconDiv>
                        <IconDiv>
                          <GoDotFill />
                        </IconDiv>
                      </OutIconDiv>
                      <TimeInputLine>
                        {writeAuthority === true ? (
                          <TableInput
                            type="time"
                            name="startTime"
                            value={input?.start_time ?? ''}
                            onChange={(e) => handleChange(index, 'start_time', e.target.value)}
                            placeholder="시작 시간"
                          />
                        ) : (
                          <ActivityTitle>
                            {input.start_time === null ? <ActivityNone>시작 시간</ActivityNone> : input.start_time}
                          </ActivityTitle>
                        )}
                        -
                        {writeAuthority === true ? (
                          <TableInput
                            type="time"
                            name="endTime"
                            value={input?.end_time ?? ''}
                            onChange={(e) => handleChange(index, 'end_time', e.target.value)}
                            placeholder="종료 시간"
                          />
                        ) : (
                          <ActivityTitle>
                            {input.end_time === null ? <ActivityNone>종료 시간</ActivityNone> : input.end_time}
                          </ActivityTitle>
                        )}
                      </TimeInputLine>
                      <ActivityLine>
                        {writeAuthority === true ? (
                          <Input
                            type="text"
                            name="description"
                            value={input?.description ?? ''}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            placeholder="활동 입력하기"
                          />
                        ) : (
                          <ActivityTitle>
                            {input.description === null ? (
                              <ActivityNone>활동을 등록해주세요.</ActivityNone>
                            ) : (
                              input.description
                            )}
                          </ActivityTitle>
                        )}
                        {writeAuthority === true ? (
                          <DailyDeleteButton type="button" onClick={() => handleDelete(input.schedule_no)}>
                            <DeleteIcon />
                          </DailyDeleteButton>
                        ) : (
                          ''
                        )}
                      </ActivityLine>
                    </Line>
                  ))}
                </div>
              )}
              {writeAuthority === true ? (
                <AddButtonDiv>
                  <AddButton type="button" onClick={handleAddButton}>
                    <FaPlus />
                  </AddButton>
                </AddButtonDiv>
              ) : (
                ''
              )}
            </InnerBorder>
            {/* <StatusDiv>{status}</StatusDiv> */}
          </Form>
        </Border>
      </Div>
    </Content>
  );
};

const StatusDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

const NotingAnyMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 250px;
  gap: 20px;
`;

const InnerBorder = styled.div`
  display: flex;
  justify-content: ${({ $writeAuthority }) => ($writeAuthority ? 'space-between' : 'flex-start')};
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  min-height: 270px;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const DeleteIcon = styled(TiDelete)`
  width: 25px;
  height: 25px;

  &:hover {
    scale: 0.98;
  }
`;

const DailyDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HintArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ActivityLine = styled.div`
  display: flex;
  justify-content: center;
  white-space: nowrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TimeInputLine = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const OutIconDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: 20px 1.5fr 2fr;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} 0;
`;

const TableInput = styled.input`
  width: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const AddButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing[4]};
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

const Content = styled.form`
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
  min-width: 700px;
  min-height: 300px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Form = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
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

const ActivityNone = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ActivityTitle = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[1]};
`;
export default DailyScheduleDetail;
