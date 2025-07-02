// src/pages/teacher/ChildDetail.jsx

import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildImg from '../../assets/Child.png';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttendanceChildSchedule from '../../components/AttendanceChildSchedule';
import axios from 'axios';

const ChildDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // childNo
  const [select, setSelect] = useState({
    //건강 정보를 보냐, 생활 정보를 보냐, 출석을 보냐
    health: true,
    life: false,
    attendance: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editHealth, setEditHealth] = useState({});
  const [isLifeEditing, setIsLifeEditing] = useState(false);
  const [editActivity, setEditActivity] = useState({});

  const [child, setChild] = useState(null);

  const formatDate = (datetimeString) => {
    if (!datetimeString) return '';
    return datetimeString.split('T')[0]; // '2025-06-26T10:40:47' → '2025-06-26'
  };

  //만 몇 세인지 계산
  const getBirthAndAge = (jumin) => {
    if (!jumin || jumin.length !== 6) return '';

    const yy = parseInt(jumin.slice(0, 2), 10);
    const mm = parseInt(jumin.slice(2, 4), 10);
    const dd = parseInt(jumin.slice(4, 6), 10);

    const currentYear = new Date().getFullYear();
    const currentTwoDigitYear = currentYear % 100;
    const century = yy <= currentTwoDigitYear ? 2000 : 1900;
    const fullYear = century + yy;

    const birthDate = new Date(`${fullYear}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`);
    if (isNaN(birthDate.getTime())) return '';

    let age = currentYear - fullYear;
    const today = new Date();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${fullYear}.${String(mm).padStart(2, '0')}.${String(dd).padStart(2, '0')} (만 ${age}세)`;
  };

  console.log(id);

  //정보 불러오기
  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/childs/detail?childNo=${id}`);
        setChild(response.data);
      } catch (error) {
        console.error('아동 상세정보 불러오기 실패:', error);
      }
    };

    fetchChildDetail();
  }, [id]);

  if (!child) return <div>로딩중...</div>;

  const handleSelect = (tab) => {
    setSelect({
      health: tab === 'health',
      life: tab === 'life',
      attendance: tab === 'attendance',
    });
  };

  // 건강 정보 수정
  const handleEditClick = () => {
    if (!isEditing) {
      setEditHealth({ ...child.health });
      setIsEditing(true);
    } else {
      axios
        .patch(`http://localhost:8888/api/childs/updatehealthdata?childNo=${id}`, editHealth)
        .then((res) => {
          setChild((prev) => ({ ...prev, health: res.data }));
          setIsEditing(false);
        })
        .catch((err) => {
          console.error('건강정보 수정 실패:', err);
          alert('수정 실패');
        });
    }
  };

  const handleInputChange = (field, value) => {
    setEditHealth((prev) => ({ ...prev, [field]: value }));
  };

  // 생활 정보 수정
  const handleLifeEditClick = () => {
    if (!isLifeEditing) {
      setEditActivity({ ...child.activity });
      setIsLifeEditing(true);
    } else {
      axios
        .patch(`http://localhost:8888/api/childs/updateactivitydata?childNo=${id}`, editActivity)
        .then((res) => {
          setChild((prev) => ({ ...prev, activity: res.data }));
          setIsLifeEditing(false);
        })
        .catch((err) => {
          console.error('생활정보 수정 실패:', err);
          alert('수정 실패');
        });
    }
  };

  const handleActivityInputChange = (field, value) => {
    setEditActivity((prev) => ({ ...prev, [field]: value }));
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
                <td>{child.child_name}</td>
              </NameTr>
            </thead>
            <tbody>
              <Info>
                <InfoColumn>생년월일</InfoColumn>
                <InfoResult>{getBirthAndAge(child.child_birthday)}</InfoResult>
              </Info>
              <Info>
                <InfoColumn>키</InfoColumn>
                <InfoResult>{child.child_height}cm</InfoResult>
              </Info>
              <Info>
                <InfoColumn>몸무게</InfoColumn>
                <InfoResult>{child.child_weight}kg</InfoResult>
              </Info>
              <Info>
                <InfoColumn>주소</InfoColumn>
                <InfoResult>{child.child_address}</InfoResult>
              </Info>
            </tbody>
          </FirstInfo>
          <FirstInfo>
            <thead>
              <Class>
                <td>{child.class_name === '미배정' ? '미배정' : `${child.class_name}반`}</td>
              </Class>
            </thead>
            <tbody>
              <Info>
                <InfoColumn>학부모</InfoColumn>
                <InfoResult>
                  부:{child.father_name}, 모:{child.mother_name}
                </InfoResult>
              </Info>
              <Info>
                <InfoColumn>비상연락처</InfoColumn>
                <InfoResult1>
                  <SpanWrapper>
                    <span>부:{child.father_phone}</span>
                    <span>모:{child.mother_phone}</span>
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
          {select.health && (
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
                  {child.healthLogs?.slice(0, 4).map((record, index) => (
                    <HealthContentTr key={index}>
                      <td>{formatDate(record.create_date)}</td>
                      <td>{record.temperature}</td>
                      <td>{record.height}</td>
                      <td>{record.weight}</td>
                      <td>{record.symptoms}</td>
                      <td>{record.healthLogMemo}</td>
                    </HealthContentTr>
                  ))}
                </tbody>
              </Table>
              <LoadMoreButton onClick={() => navigate(`/child/healthlist?id=${id}`)}>더보기</LoadMoreButton>
              <FooterInfoLine>
                {child.health && (
                  <>
                    <FooterBox>
                      <FooterTitle>복약정보</FooterTitle>
                      <FooterTable>
                        <tbody>
                          <tr>
                            <FooterTd1>약 이름</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.medication_name || ''}
                                  onChange={(e) => handleInputChange('medication_name', e.target.value)}
                                />
                              ) : (
                                child.health.medication_name
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>복용 용량</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.medication_amount || ''}
                                  onChange={(e) => handleInputChange('medication_amount', e.target.value)}
                                />
                              ) : (
                                child.health.medication_amount
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>복용 시간</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.medication_time || ''}
                                  onChange={(e) => handleInputChange('medication_time', e.target.value)}
                                />
                              ) : (
                                child.health.medication_time
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>복용 기간</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.medication_period || ''}
                                  onChange={(e) => handleInputChange('medication_period', e.target.value)}
                                />
                              ) : (
                                child.health.medication_period
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>복용 목적</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.medication_purpose || ''}
                                  onChange={(e) => handleInputChange('medication_purpose', e.target.value)}
                                />
                              ) : (
                                child.health.medication_purpose
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>메모</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.medication_memo || ''}
                                  onChange={(e) => handleInputChange('medication_memo', e.target.value)}
                                />
                              ) : (
                                child.health.medication_memo
                              )}
                            </FooterTd2>
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
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.allergy || ''}
                                  onChange={(e) => handleInputChange('allergy', e.target.value)}
                                />
                              ) : (
                                child.health.allergy
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>반응</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.allergy_reaction || ''}
                                  onChange={(e) => handleInputChange('allergy_reaction', e.target.value)}
                                />
                              ) : (
                                child.health.allergy_reaction
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>심각도</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.allergy_severity || ''}
                                  onChange={(e) => handleInputChange('allergy_severity', e.target.value)}
                                />
                              ) : (
                                child.health.allergy_severity
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>내용</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.vaccination || ''}
                                  onChange={(e) => handleInputChange('vaccination', e.target.value)}
                                />
                              ) : (
                                child.health.vaccination
                              )}
                            </FooterTd2>
                          </tr>
                          <tr>
                            <FooterTd1>메모</FooterTd1>
                            <FooterTd2>
                              {isEditing ? (
                                <input
                                  value={editHealth.allergy_memo || ''}
                                  onChange={(e) => handleInputChange('allergy_memo', e.target.value)}
                                />
                              ) : (
                                child.health.allergy_memo
                              )}
                            </FooterTd2>
                          </tr>
                        </tbody>
                      </FooterTable>
                    </FooterBox>
                  </>
                )}
              </FooterInfoLine>

              <LoadMoreButton onClick={handleEditClick}>{isEditing ? '수정완료' : '수정'}</LoadMoreButton>
            </>
          )}

          {select.life && (
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
                  {child.activityLogs?.slice(0, 4).map((record, index) => (
                    <HealthContentTr key={index}>
                      <td>{formatDate(record.create_date)}</td>
                      <td>{record.dailyMeal_amount}</td>
                      <td>
                        {record.napStart_time}~{record.napEnd_time}
                      </td>
                      <td>{record.play_participation}</td>
                      <td>{record.daily_friendship}</td>
                      <td>{record.activity_log_memo}</td>
                    </HealthContentTr>
                  ))}
                </tbody>
              </Table>
              <LoadMoreButton onClick={() => navigate(`/child/lifelist?id=${id}`)}>더보기</LoadMoreButton>
              <FooterInfoLine>
                <FooterBox2>
                  <FooterTitle>식습관</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>좋아하는 음식</FooterTd1>
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.like_food || ''}
                              onChange={(e) => handleActivityInputChange('like_food', e.target.value)}
                            />
                          ) : (
                            child.activity.like_food
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>싫어하는 음식</FooterTd1>
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.dislike_food || ''}
                              onChange={(e) => handleActivityInputChange('dislike_food', e.target.value)}
                            />
                          ) : (
                            child.activity.dislike_food
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>식사량</FooterTd1>
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.meal_amount || ''}
                              onChange={(e) => handleActivityInputChange('meal_amount', e.target.value)}
                            />
                          ) : (
                            child.activity.meal_amount
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.meal_memo || ''}
                              onChange={(e) => handleActivityInputChange('meal_memo', e.target.value)}
                            />
                          ) : (
                            child.activity.meal_memo
                          )}
                        </FooterTd2>
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
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.close_friend || ''}
                              onChange={(e) => handleActivityInputChange('close_friend', e.target.value)}
                            />
                          ) : (
                            child.activity.close_friend
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>좋아하는 놀이</FooterTd1>
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.like_play || ''}
                              onChange={(e) => handleActivityInputChange('like_play', e.target.value)}
                            />
                          ) : (
                            child.activity.like_play
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>
                          {isLifeEditing ? (
                            <input
                              value={editActivity.friend_memo || ''}
                              onChange={(e) => handleActivityInputChange('friend_memo', e.target.value)}
                            />
                          ) : (
                            child.activity.friend_memo
                          )}
                        </FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox2>
              </FooterInfoLine>

              <LoadMoreButton onClick={handleLifeEditClick}>{isLifeEditing ? '수정완료' : '수정'}</LoadMoreButton>
            </>
          )}

          {select.attendance && (
            <AttendanceOutline>
              <CalendarHeader>
                <h2>출석표</h2>
                <div>
                  <InfoTable>
                    <tbody>
                      <tr>
                        <Point1></Point1>
                        <td>출석</td>
                      </tr>
                      <tr>
                        <Point2></Point2>
                        <td>지각</td>
                      </tr>
                      <tr>
                        <Point3></Point3>
                        <td>결석</td>
                      </tr>
                    </tbody>
                  </InfoTable>
                </div>
              </CalendarHeader>
              <CalendarOutline>
                <AttendanceChildSchedule data={child.attendanceLogs} />
              </CalendarOutline>
            </AttendanceOutline>
          )}
        </DetailInfoContainer>
      </HealthInfoContainer>
    </>
  );
};

export default ChildDetail;

const InfoTable = styled.table`
  border-collapse: separate;
  border-spacing: 6px;
`;

const Point1 = styled.td`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.green};
  width: 20px;
  height: 20px;
`;
const Point3 = styled.td`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.orange};
  width: 20px;
  height: 20px;
`;
const Point2 = styled.td`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.yellow};
  width: 20px;
  height: 20px;
`;

const AttendanceOutline = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const CalendarOutline = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const FooterTable = styled.table`
  border-collapse: separate;
  border-spacing: 10px;
`;

const FooterTd1 = styled.td`
  width: 40%;
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
  padding-top: ${({ theme }) => theme.spacing[8]};
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
  width: 400px;
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
