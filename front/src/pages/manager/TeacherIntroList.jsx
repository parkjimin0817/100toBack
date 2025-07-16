import React, { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TeacherPicture from '../../assets/Child.png';
import { memberService } from '../../api/member';
import useLoginStore from '../../store/loginStore';
import defaultImg from '../../assets/defaultImg.png';
import { toast } from 'react-toastify';

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
      toast.error(e);
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
            <TeacherImage
              src={teacher.member_profile ? `${CLOUDFRONT_URL}/${teacher.member_profile}` : defaultImg}
              alt="교사 사진"
            />
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
  padding: 0 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 240px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.blue};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue}, ${({ theme }) => theme.colors.blue}80);
  }
`;

const TeacherImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 24px;
  border: 3px solid ${({ theme }) => theme.colors.gray[100]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  ${Card}:hover & {
    border-color: ${({ theme }) => theme.colors.blue};
    transform: scale(1.05);
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  gap: 12px;
`;

const Name = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: 4px;
`;

const Info = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '•';
    color: ${({ theme }) => theme.colors.blue};
    font-weight: bold;
  }
`;
