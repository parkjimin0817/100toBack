import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { List } from '../../components/ChildDummyData';
import TeacherPicture from '../../assets/Child.png';

const TeacherIntroList = () => {
  const navigate = useNavigate();
  const headerButtons = [
    { Title: '반 목록', func: () => navigate('/classlist') },
    { Title: '뒤로가기', func: () => navigate(-1) },
  ];

  const teachers = List.filter((person) => person.role === 'teacher').slice(0, 4);

  return (
    <Content>
      <ContentHeader Title="교사 소개 및 조회" Color="blue" ButtonProps={headerButtons} />
      <CardGrid>
        {teachers.map((teacher) => (
          <Card
            key={teacher.id}
            onClick={() => {
              navigate(`/manager/teacherdetail?id=${teacher.id}`);
            }}
          >
            <TeacherImage src={TeacherPicture} alt="교사 사진" />
            <TextBox>
              <Name>{teacher.name} 선생님</Name>
              <Info>담당 반 | {teacher.className}</Info>
              <Info>전화번호 | {teacher.phone.father}</Info>
              <Info>입사일 | {teacher.createDate}</Info>
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
