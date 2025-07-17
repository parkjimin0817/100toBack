import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.png';
import AttendanceChildSchedule from '../AttendanceChildSchedule';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import ChildBasicInfo from '../Child/ChildBasicInfo';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ChildDetailInfoArea = ({ childNo }) => {
  const [childData, setChildData] = useState(null);
  const [select, setSelect] = useState({
    health: true,
    life: false,
    attendance: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editHealth, setEditHealth] = useState({});
  const navigate = useNavigate();

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

  const handleInputChange = (field, value) => {
    setEditHealth((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setEditHealth({ ...childData.health });
      setIsEditing(true);
    } else {
      api
        .patch(`http://localhost:8888/api/childs/updatehealthdata?childNo=${childNo}`, editHealth)
        .then((res) => {
          setChildData((prev) => ({ ...prev, health: res.data }));
          setIsEditing(false);
          toast.success('건강 정보 수정이 완료되었습니다.');
        })
        .catch((err) => {
          toast.error('건강 정보 수정에 실패했습니다.', err);
        });
    }
  };

  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        const response = await api.get(`http://localhost:8888/api/childs/detail?childNo=${childNo}`);
        setChildData(response.data);
      } catch (error) {
        toast.error('아동 상세 정보 불러오기 실패:', error);
      }
    };

    if (childNo) {
      fetchChildDetail();
    }
  }, [childNo]);

  if (!childData) return <div>로딩중...</div>;

  const formatDate = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd');

  return (
    <>
      {/* 기본 정보 */}
      {/* <BasicInfo>
        <PictureLine>
          <Picture
            src={childData.child_profile ? `${CLOUDFRONT_URL}/${childData.child_profile}` : defaultImg}
            alt="아이 프로필"
          />
        </PictureLine>
        <FirstInfo>
          <thead>
            <NameTr>
              <td>{childData.child_name}</td>
            </NameTr>
          </thead>
          <tbody>
            <Info>
              <InfoColumn>생년월일</InfoColumn>
              <InfoResult>{getBirthAndAge(childData.child_birthday)}</InfoResult>
            </Info>
            <Info>
              <InfoColumn>키</InfoColumn>
              <InfoResult>{childData.child_height} cm</InfoResult>
            </Info>
            <Info>
              <InfoColumn>몸무게</InfoColumn>
              <InfoResult>{childData.child_weight} kg</InfoResult>
            </Info>
            <Info>
              <InfoColumn>주소</InfoColumn>
              <InfoResult>{childData.child_address}</InfoResult>
            </Info>
          </tbody>
        </FirstInfo>
        <FirstInfo>
          <thead>
            <Class>
              <td>{childData.class_name}반</td>
            </Class>
          </thead>
          <tbody>
            <Info>
              <InfoColumn>학부모</InfoColumn>
              <InfoResult>
                부:{childData.father_name}, 모:{childData.mother_name}
              </InfoResult>
            </Info>
            <Info>
              <InfoColumn>비상연락처</InfoColumn>
              <InfoResult1>
                <SpanWrapper>
                  <span>부:{childData.father_phone}</span>
                  <span>모:{childData.mother_phone}</span>
                </SpanWrapper>
              </InfoResult1>
            </Info>
          </tbody>
        </FirstInfo>
      </BasicInfo> */}
      <ChildBasicInfo child={childData}></ChildBasicInfo>

      {/* 탭 */}
      <HealthInfoContainer>
        <SelectHeader>
          <HealthStyle select={select} onClick={() => setSelect({ health: true, life: false, attendance: false })}>
            건강
          </HealthStyle>
          <LifeStyle select={select} onClick={() => setSelect({ health: false, life: true, attendance: false })}>
            생활
          </LifeStyle>
          <Attendance select={select} onClick={() => setSelect({ health: false, life: false, attendance: true })}>
            출석
          </Attendance>
        </SelectHeader>

        <DetailInfoContainer>
          {/* 건강 탭 */}
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
                  {childData.healthLogs?.slice(0, 4).map((record, index) => (
                    <HealthContentTr key={index}>
                      <td>{formatDate(record.create_date)}</td>
                      <td>{record.temperature} ℃</td>
                      <td>{record.height} cm</td>
                      <td>{record.weight} kg</td>
                      <td>{record.symptoms}</td>
                      <td>{record.healthLogMemo}</td>
                    </HealthContentTr>
                  ))}
                </tbody>
              </Table>
              <LoadMoreButton onClick={() => navigate(`/child/healthlist?id=${childNo}`)}>더보기</LoadMoreButton>

              {/* 건강: 복약, 예방접종, 알레르기 */}
              <FooterInfoLine>
                <FooterBox>
                  <FooterTitle>복약정보</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>약 이름</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.medication_name || ''}
                              onChange={(e) => handleInputChange('medication_name', e.target.value)}
                            />
                          ) : (
                            childData.health.medication_name
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 용량</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.medication_amount || ''}
                              onChange={(e) => handleInputChange('medication_amount', e.target.value)}
                            />
                          ) : (
                            childData.health.medication_amount
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 시간</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.medication_time || ''}
                              onChange={(e) => handleInputChange('medication_time', e.target.value)}
                            />
                          ) : (
                            childData.health.medication_time
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 기간</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.medication_period || ''}
                              onChange={(e) => handleInputChange('medication_period', e.target.value)}
                            />
                          ) : (
                            childData.health.medication_period
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>복용 목적</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.medication_purpose || ''}
                              onChange={(e) => handleInputChange('medication_purpose', e.target.value)}
                            />
                          ) : (
                            childData.health.medication_purpose
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.medication_memo || ''}
                              onChange={(e) => handleInputChange('medication_memo', e.target.value)}
                            />
                          ) : (
                            childData.health.medication_memo
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
                            <Input
                              value={editHealth.allergy || ''}
                              onChange={(e) => handleInputChange('allergy', e.target.value)}
                            />
                          ) : (
                            childData.health.allergy
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>반응</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.allergy_reaction || ''}
                              onChange={(e) => handleInputChange('allergy_reaction', e.target.value)}
                            />
                          ) : (
                            childData.health.allergy_reaction
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>심각도</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.allergy_severity || ''}
                              onChange={(e) => handleInputChange('allergy_severity', e.target.value)}
                            />
                          ) : (
                            childData.health.allergy_severity
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>예방접종</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.vaccination || ''}
                              onChange={(e) => handleInputChange('vaccination', e.target.value)}
                            />
                          ) : (
                            childData.health.vaccination
                          )}
                        </FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>
                          {isEditing ? (
                            <Input
                              value={editHealth.allergy_memo || ''}
                              onChange={(e) => handleInputChange('allergy_memo', e.target.value)}
                            />
                          ) : (
                            childData.health.allergy_memo
                          )}
                        </FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox>
              </FooterInfoLine>
              <LoadMoreButton onClick={handleEditClick}>{isEditing ? '수정완료' : '수정'}</LoadMoreButton>
            </>
          )}

          {/* 생활 탭 */}
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
                  {childData.activityLogs?.slice(0, 4).map((record, index) => (
                    <HealthContentTr key={index}>
                      <td>{formatDate(record.create_date)}</td>
                      <td>{record.dailyMeal_amount}</td>
                      <td>
                        {record.napStart_time?.substring(0, 5)} ~ {record.napEnd_time?.substring(0, 5)}
                      </td>
                      <td>{record.play_participation}</td>
                      <td>{record.daily_friendship}</td>
                      <td>{record.activity_log_memo}</td>
                    </HealthContentTr>
                  ))}
                </tbody>
              </Table>

              <LoadMoreButton onClick={() => navigate(`/child/lifelist?id=${childNo}`)}>더보기</LoadMoreButton>

              <FooterInfoLine>
                <FooterBox2>
                  <FooterTitle>식습관</FooterTitle>
                  <FooterTable>
                    <tbody>
                      <tr>
                        <FooterTd1>좋아하는 음식</FooterTd1>
                        <FooterTd2>{childData.activity.like_food}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>싫어하는 음식</FooterTd1>
                        <FooterTd2>{childData.activity.dislike_food}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>식사량</FooterTd1>
                        <FooterTd2>{childData.activity.meal_amount}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>{childData.activity.meal_memo}</FooterTd2>
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
                        <FooterTd2>{childData.activity.close_friend}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>좋아하는 놀이</FooterTd1>
                        <FooterTd2>{childData.activity.like_play}</FooterTd2>
                      </tr>
                      <tr>
                        <FooterTd1>메모</FooterTd1>
                        <FooterTd2>{childData.activity.friend_memo}</FooterTd2>
                      </tr>
                    </tbody>
                  </FooterTable>
                </FooterBox2>
              </FooterInfoLine>
            </>
          )}

          {/* 출석 탭 */}
          {select.attendance && (
            <>
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
                  <AttendanceChildSchedule data={childData.attendanceLogs} />
                </CalendarOutline>
              </AttendanceOutline>
            </>
          )}
        </DetailInfoContainer>
      </HealthInfoContainer>
    </>
  );
};

export default ChildDetailInfoArea;

const BasicInfo = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
`;

const PictureLine = styled.div`
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 45px;
  margin-right: 45px;
`;

const Picture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

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

const InfoColumn = styled.td`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const InfoResult = styled.td``;

const InfoResult1 = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Class = styled.tr`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 40px;
`;

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
  width: 35%;
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const FooterTd2 = styled.td`
  width: 65%;
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

const HealthInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

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

const Input = styled.input`
  padding-left: 10px;
`;
