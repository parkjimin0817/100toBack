// ChildDetail.jsx
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildImg from '../../assets/Child.png';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { List } from '../../components/ChildDummyData';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ChildDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // URL에서 ?id= 추출

  const [select, setSelect] = useState({
    health: true,
    life: false,
    attendance: false,
  });
  const [child, setChild] = useState(null);

  useEffect(() => {
    const found = List.find((item) => item.id === parseInt(id));
    if (found) setChild(found);
  }, [id]);

  if (!child) return <div>로딩중...</div>;

  const handleSelect = (tab) => {
    setSelect({
      health: tab === 'health',
      life: tab === 'life',
      attendance: tab === 'attendance',
    }); // true 또는 false로 설정
  };

  const attendanceData = [
    {
      child_attendance_no: 1,
      child_no: 101,
      class_no: 201,
      create_date: '2025-06-17T08:30:00Z',
      status: 'present',
    },
    {
      child_attendance_no: 1,
      child_no: 101,
      class_no: 201,
      create_date: '2025-06-16T08:30:00Z',
      status: 'absent',
    },
    {
      child_attendance_no: 1,
      child_no: 101,
      class_no: 201,
      create_date: '2025-06-15T08:30:00Z',
      status: 'half',
    },
  ];

  const attendanceCall = () => {
    const dateKey = new Date(item.create_date).toISOString().split('T')[0];
  };

  return (
    <>
      <BasicInfoContainer>
        <ContentHeader
          Title={'아동 상세보기'}
          Color={'orange'}
          ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }, { Title: '아동정보 삭제' }]}
        />
        <BasicInfo>
          <PictureLine>
            <Picture src={ChildImg} alt="아이사진" />
          </PictureLine>
          <FirstInfo>
            <thead>
              <NameTr>
                <td>{child.name}</td>
              </NameTr>
            </thead>
            <tbody>
              <Info>
                <InfoColumn>생년월일</InfoColumn>
                <InfoResult>{child.birth}</InfoResult>
              </Info>
              <Info>
                <InfoColumn>키</InfoColumn>
                <InfoResult>{child.height}</InfoResult>
              </Info>
              <Info>
                <InfoColumn>몸무게</InfoColumn>
                <InfoResult>{child.weight}</InfoResult>
              </Info>
              <Info>
                <InfoColumn>주소</InfoColumn>
                <InfoResult>{child.address}</InfoResult>
              </Info>
            </tbody>
          </FirstInfo>
          <FirstInfo>
            <thead>
              <Class>
                <td>{child.className}</td>
              </Class>
            </thead>

            <tbody>
              <Info>
                <InfoColumn>학부모</InfoColumn>
                <InfoResult>
                  부:{child.parents.father}, 모:{child.parents.mother}
                </InfoResult>
              </Info>
              <Info>
                <InfoColumn>비상연락처</InfoColumn>
                <InfoResult1>
                  <SpanWrapper>
                    <span>부:{child.phone.father}</span>
                    <span>모:{child.phone.mother}</span>
                  </SpanWrapper>
                </InfoResult1>
              </Info>
            </tbody>
          </FirstInfo>
        </BasicInfo>
      </BasicInfoContainer>
      <HealthInfoContainer>
        <SelectHeader>
          <HealthStyle select={select} onClick={() => handleSelect('health')}>
            건강
          </HealthStyle>
          <LifeStyle select={select} onClick={() => handleSelect('life')}>
            생활
          </LifeStyle>
          <Attendance select={select} onClick={() => handleSelect('attendance')}>
            출석
          </Attendance>
        </SelectHeader>
        <DetailInfoContainer>
          {select.health ? (
            <>
              <Title>하루 건강</Title>
              <Table>
                <tbody>
                  <HealthTr>
                    <th>날짜</th>
                    <th>체온</th>
                    <th>키</th>
                    <th>몸무게</th>
                    <th>증상</th>
                    <th>메모</th>
                  </HealthTr>
                  {child.healthRecords &&
                    [...child.healthRecords]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 4)
                      .map((record, index) => (
                        <HealthContentTr key={index}>
                          <td>{record.date}</td>
                          <td>{record.temp}</td>
                          <td>{record.height}</td>
                          <td>{record.weight}</td>
                          <td>{record.symptom}</td>
                          <td>{record.memo}</td>
                        </HealthContentTr>
                      ))}
                </tbody>
              </Table>
              <LoadMoreButton>더보기</LoadMoreButton>

              <FooterInfoLine>
                <FooterBox>
                  <FooterTitle>복약정보</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>약 이름</FooterTd1>
                        <FooterTd2>{child.medication.name}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 용량</FooterTd1>
                        <FooterTd2>{child.medication.dose}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 시간</FooterTd1>
                        <FooterTd2>{child.medication.time}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 기간</FooterTd1>
                        <FooterTd2>{child.medication.period}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 목적</FooterTd1>
                        <FooterTd2>{child.medication.purpose}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>{child.medication.note}</FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox>

                <FooterBox>
                  <FooterTitle>예방접종</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>BCG</FooterTd1>
                        <FooterTd2>{child.vaccination.BCG}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>접종 예정</FooterTd1>
                        <FooterTd2>{child.vaccination.schedule}</FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox>

                <FooterBox>
                  <FooterTitle>알레르기</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>알레르기</FooterTd1>
                        <FooterTd2>{child.allergy.items}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>반응</FooterTd1>
                        <FooterTd2>{child.allergy.reaction}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>심각도</FooterTd1>
                        <FooterTd2>{child.allergy.severity}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>{child.allergy.note}</FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox>
              </FooterInfoLine>
              <LoadMoreButton>수정</LoadMoreButton>
            </>
          ) : (
            ''
          )}
          {select.life ? (
            <>
              <Title>하루 생활</Title>
              <Table>
                <tbody>
                  <HealthTr>
                    <th>날짜</th>
                    <th>식사</th>
                    <th>낮잠시간</th>
                    <th>놀이참여</th>
                    <th>교우관계</th>
                    <th>메모</th>
                  </HealthTr>

                  {child.lifeRecords &&
                    [...child.lifeRecords]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 4) //최신순으로 상위 4개까지 잘라냄
                      .map((record, index) => (
                        <HealthContentTr key={index}>
                          <td>{record.date}</td>
                          <td>{record.meal}</td>
                          <td>{record.napTime}</td>
                          <td>{record.play}</td>
                          <td>{record.social}</td>
                          <td>{record.memo}</td>
                        </HealthContentTr>
                      ))}
                </tbody>
              </Table>

              <LoadMoreButton>더보기</LoadMoreButton>

              <FooterInfoLine>
                <FooterBox2>
                  <FooterTitle>식습관</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>좋아하는 음식</FooterTd1>
                        <FooterTd2>{child.eatingHabit.likes}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>싫어하는 음식</FooterTd1>
                        <FooterTd2>{child.eatingHabit.dislikes}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>식사량</FooterTd1>
                        <FooterTd2>{child.eatingHabit.status}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>{child.eatingHabit.note}</FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox2>
                <FooterBox2>
                  <FooterTitle>교우관계</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>친한친구</FooterTd1>
                        <FooterTd2>{child.socialRelation.closeFriends}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>좋아하는 놀이</FooterTd1>
                        <FooterTd2>{child.socialRelation.favoritePlay}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>{child.socialRelation.note}</FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox2>
              </FooterInfoLine>
              <LoadMoreButton>수정</LoadMoreButton>
            </>
          ) : (
            ''
          )}
          {select.attendance ? (
            <>
              <StyledCalendar
                calendarType="gregory"
                formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
                prev2Label={null}
                next2Label={null}
                minDetail="year"
                maxDetail="month"
                tileClassName={({ date, view }) => {
                  if (view === 'month' && date.getDay() === 0) {
                    return 'sunday';
                  } else if (view === 'month' && date.getDay() === 6) {
                    return 'saturday';
                  }
                }}
              />
            </>
          ) : (
            ''
          )}
        </DetailInfoContainer>
      </HealthInfoContainer>
    </>
  );
};

export default ChildDetail;

const StyledCalendar = styled(Calendar)`
  width: 90%;
  height: 90%;
  border: none;

  .react-calendar {
    width: 100%;

    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  /* 날짜 셀 영역을 grid로 6행 고정 */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr); /* 항상 6행 */
    height: 90%; /* 캘린더 전체 높이 고정 */
  }

  /* 주말 색상 */
  .sunday {
    color: ${({ theme }) => theme.colors.lightorange};
  }

  .saturday {
    color: ${({ theme }) => theme.colors.lightblue};
  }

  /* 네비게이션 버튼 스타일 */
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    border: none;
    background: transparent !important;
    font-size: 16px;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;
  }

  .react-calendar__navigation__prev-button:hover,
  .react-calendar__navigation__next-button:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }

  /* 현재 달/년 표시 부분 */
  .react-calendar__navigation__label {
    background: transparent !important;
    font-weight: bold;
  }

  .react-calendar__navigation__label span {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  /* 날짜 셀 크기 축소 및 정사각형 비율 */
  .react-calendar__tile {
    padding: ${({ theme }) => theme.spacing[1]} !important;
    aspect-ratio: 16 / 9;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    background: transparent !important;
  }

  .react-calendar__tile abbr {
    font-size: ${({ theme }) => theme.fontSizes.base};
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }

  /* 선택한 날짜 스타일 */
  .react-calendar__tile--active abbr {
    color: ${({ theme }) => theme.colors.black};
  }

  /* 오늘 날짜 (배경색 제거 + 테두리만) */
  .react-calendar__tile--now {
    background: transparent !important;
  }

  /* 오늘 날짜 스타일: 작고 테두리만 */
  .react-calendar__tile--now abbr {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const FooterTable = styled.table`
  border-collapse: separate;
  border-spacing: 10px;
`;

const FooterTd1 = styled.td`
  width: 30%;
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const FooterTd2 = styled.td`
  width: 50%;
  text-align: left;
`;

const Table = styled.table`
  width: 100%;
`;

const HealthTr = styled.tr`
  background-color: #ffce6540;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const HealthContentTr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const BasicInfoContainer = styled.div`
  min-width: 1024px;
`;

const BasicInfo = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const PictureLine = styled.div`
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 45px;
  margin-right: 45px;
`;

const Picture = styled.img``;

const FirstInfo = styled.table`
  text-align: left;
  border-collapse: separate;
  border-spacing: 10px;
`;

const NameTr = styled.tr`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Info = styled.tr``;

const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 또는 row로 가로배치 */
  justify-content: center; /* 세로 가운데 정렬 */
  height: 100%;
  padding-top: 40px;
`;

const InfoColumn = styled.td`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const InfoResult = styled.td``;

const InfoResult1 = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Class = styled.tr`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const HealthInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1024px;
  margin-top: 10px;
`;

const SelectHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const HealthStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'select',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 180px;
  height: 48px;
  background-color: ${({ select, theme }) => (select.health ? theme.colors.yellow : 'rgba(255, 206, 101, 0.25)')};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const LifeStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'select',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 180px;
  height: 48px;
  background-color: ${({ select, theme }) => (select.life ? theme.colors.yellow : 'rgba(255, 206, 101, 0.25)')};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Attendance = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'select',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 180px;
  height: 48px;
  background-color: ${({ select, theme }) => (select.attendance ? theme.colors.yellow : 'rgba(255, 206, 101, 0.25)')};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const DetailInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 1024px;

  border: 8px solid ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
  background-color: white;
  padding: ${({ theme }) => theme.spacing[16]};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  text-align: left;
`;

const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.yellow};
  margin: ${({ theme }) => theme.spacing[6]} 0;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    scale: 0.98;
  }
`;

const FooterInfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 330px;
  background-color: rgba(255, 206, 101, 0.25);
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing[3]};
`;

const FooterBox2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 260px;
  background-color: rgba(255, 206, 101, 0.25);
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing[3]};
`;

const FooterTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const FooterColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 220px;
  font-size: 14px;
`;

const FooterColumn2 = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 220px;
  font-size: 14px;
`;

const FooterDetailColumn = styled.div`
  font-weight: bold;
  white-space: nowrap; // 줄바꿈 금지(메모 글자가 세로로 들어가서)
`;
