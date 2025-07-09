import React, { use, useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TeacherPicture from '../../assets/Child.png';
import { memberService } from '../../api/member';
import useLoginStore from '../../store/loginStore';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const TeacherIntroList = () => {
  const navigate = useNavigate();
  const { member } = useLoginStore();
  const [teachers, setTeachers] = useState([]);

  //교사 목록 불러오기
  const fetchData = async () => {
    try {
      const data = await memberService.teacherIntroList(member.centerNo);
      setTeachers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (member?.centerNo) {
      fetchData();
    }
  }, []);

  return (
    <Content>
      <ContentHeader Title="교사 소개 및 조회" Color="blue" />
      <CardGrid>
        {teachers.map((teacher) => (
          <Card
            key={teacher.member_no}
            onClick={() => {
              navigate(`/manager/teacherIntroDetail/${teacher.member_no}`);
            }}
          >
            <TeacherImage src={`${CLOUDFRONT_URL}/${teacher.member_profile}`} alt="교사 사진" />
            <TextBox>
              <Name>{teacher.member_name} 선생님</Name>
              <Info>담당 반 | {teacher.class_name || '배정되지 않음'}</Info>
              <Info>전화번호 | {teacher.member_phone}</Info>
              <Info>입사일 | {teacher.decision_date && teacher.decision_date.split('T')[0]}</Info>
            </TextBox>
          </Card>
        ))}
      </CardGrid>
    </Content>
  );
};

export default TeacherIntroList;

const Content = styled.div`
  width: 100%;
  min-height: 840px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
  justify-content: center;
  margin-top: 70px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 240px;
  border: 1px solid black;
  border-radius: 10px;
  padding-left: 20px;
  padding-top: 40px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    cursor: pointer;
  }
`;

const TeacherImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover; // 이미지가 비율을 유지한 채로 꽉 차게 보여지도록
  margin-right: 20px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
`;

const Info = styled.div`
  font-size: 16px;
  color: #999999;
  margin-bottom: 10px;
`;
