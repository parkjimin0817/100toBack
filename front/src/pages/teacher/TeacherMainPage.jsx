import React, { useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildImage from '../../assets/img/cardchild.png';
import ScrollWrapper from '../common/ParentMain/components/ScrollWrapper';
import TeacherMainAttendance from './components/TeacherMainAttendance';
import TeacherMainChild from './components/TeacherMainChild';
import TeacherMainHealth from './components/TeacherMainHealth';
import RecentBoard from '../common/ParentMain/components/RecentBoard';
import MainSchedule from '../common/ParentMain/components/MainSchedule';

const data = [
  { name: '박지민', age: '5', time: '10:00~12:00', type: '채팅' },
  { name: '정형일', age: '5', time: '10:00~12:00', type: '채팅' },
  { name: '정의철', age: '5', time: '10:00~12:00', type: '대면' },
  { name: '양동민', age: '5', time: '10:00~12:00', type: '채팅' },
  { name: '김승기', age: '5', time: '10:00~12:00', type: '대면' },
  { name: '박지민', age: '5', time: '10:00~12:00', type: '채팅' },
  { name: '정형일', age: '5', time: '10:00~12:00', type: '대면' },
  { name: '정의철', age: '5', time: '10:00~12:00', type: '채팅' },
  { name: '양동민', age: '5', time: '10:00~12:00', type: '대면' },
  { name: '김승기', age: '5', time: '10:00~12:00', type: '채팅' },
];

const TeacherMainPage = () => {
  const [activeTab, setActiveTab] = useState('상담');
  const [activeCounselTab, setActiveCounselTab] = useState('상담 대기');

  return (
    <Wrapper>
      <TopContent>
        <FirstContent>
          {/* 상단 탭바 */}
          <TabBar>
            <Tab $active={activeTab === '상담'} onClick={() => setActiveTab('상담')}>
              상담
            </Tab>
            <Tab $active={activeTab === '아동관리'} onClick={() => setActiveTab('아동관리')}>
              아동관리
            </Tab>
            <Tab $active={activeTab === '건강관리'} onClick={() => setActiveTab('건강관리')}>
              건강관리
            </Tab>
          </TabBar>

          {/* 상담 탭 콘텐츠 */}
          {activeTab === '상담' && (
            <>
              <CounselBar>
                <CounselColumn
                  $active={activeCounselTab === '상담 대기'}
                  onClick={() => setActiveCounselTab('상담 대기')}
                >
                  상담 대기
                </CounselColumn>
                <CounselColumn
                  $active={activeCounselTab === '상담 완료'}
                  onClick={() => setActiveCounselTab('상담 완료')}
                >
                  상담 완료
                </CounselColumn>
              </CounselBar>
              <ScrollWrapper>
                <CardList>
                  {data.map((item, index) => (
                    <Card key={index}>
                      <CardTop>
                        <TypeBadge $type={item.type}>{item.type}</TypeBadge>
                        <Status>상담 대기</Status>
                      </CardTop>
                      <CardContent>
                        <Name>{item.name} 학부모</Name>
                        <AgeGender>({item.age}세/남)</AgeGender>
                        <Time>{item.time}</Time>
                      </CardContent>
                      <CardImage src={ChildImage} alt="아이" />
                    </Card>
                  ))}
                </CardList>
              </ScrollWrapper>
            </>
          )}

          {/* 아동관리 탭 콘텐츠 */}
          {activeTab === '아동관리' && (
            <>
              <CareContainer>
                <AttendanceBox>
                  <TeacherMainAttendance />
                </AttendanceBox>
                <AttendanceBox>
                  <TeacherMainChild />
                </AttendanceBox>
              </CareContainer>
            </>
          )}

          {/* 건강관리 탭 콘텐츠 */}
          {activeTab === '건강관리' && (
            <>
              <HealthContainer>
                <TeacherMainHealth />
              </HealthContainer>
            </>
          )}
        </FirstContent>

        {/* 일정 & 스케줄은 상담 탭일 때만 */}

        <ScheduleContent>
          <ContentHeader Title={'일정 & 스케줄'} Color={'orange'} />
          <MainSchedule></MainSchedule>
        </ScheduleContent>
      </TopContent>

      {/* 공지사항도 상담 탭일 때만 */}

      <BoardContent>
        <ContentHeader
          Title={'공지사항'}
          Color={'yellow'}
          ButtonProps={[{ Title: '더보기', func: () => alert('게시판가야함') }]}
        />
        <RecentBoards>
          <RecentBoard />
        </RecentBoards>
      </BoardContent>
    </Wrapper>
  );
};

export default TeacherMainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TopContent = styled.div`
  display: flex;
  gap: 40px;
`;

const FirstContent = styled.div`
  width: 70%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: 570px;
`;

const TabBar = styled.div`
  display: flex;
  background-color: #9dd9f3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px 20px;
`;

const Tab = styled.div`
  margin-right: 20px;
  padding: 8px 16px;
  border-radius: 10px;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.white : 'transparent')};
  color: ${({ $active, theme }) => ($active ? '#9dd9f3' : theme.colors.white)};
  font-weight: ${({ $active, theme }) => ($active ? theme.fontWeights.semibold : theme.fontWeights.regular)};
  cursor: pointer;
`;

const CounselBar = styled.div`
  display: flex;
  padding: 20px 30px;
  gap: 35px;
`;

const CounselColumn = styled.div`
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  border-bottom: ${({ $active }) => ($active ? '2px solid #00AEEF' : 'none')};
  padding-bottom: 4px;
`;

const CardList = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, 1fr); // 2줄
  gap: 20px;
  padding: 20px;
  width: max-content;
`;

const Card = styled.div`
  width: 180px;
  height: 180px;
  background-color: #d9f0ff;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypeBadge = styled.div`
  background-color: ${({ $type }) => ($type === '채팅' ? '#00bfff' : '#7fc8a9')};
  color: white;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const Status = styled.div`
  font-size: 12px;
  color: #555;
`;

const CardContent = styled.div`
  text-align: center;
  font-size: 13px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const AgeGender = styled.div`
  color: #666;
  font-size: 12px;
`;

const Time = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #333;
`;

const CardImage = styled.img`
  width: 64px;
  height: 77px;
  align-self: center;
`;

const ScheduleContent = styled.div`
  width: 30%;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const BoardContent = styled.div`
  width: 100%;
  height: 340px;
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const RecentBoards = styled.div`
  width: 95%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const AttendanceBox = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin: 40px 0px 0px 15px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 45%; // 부모 영역 45%만 사용
  height: 70%;
  padding: 20px; //  여백 추가
  box-sizing: border-box;
`;

const CareContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const HealthContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
