import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/defaultImg.png';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const TeacherProfilePhoto = ({ teacher }) => {
  return (
    <CardLine>
      <Card>
        <PictureBox>
          <Pic
            src={teacher.member_profile ? `${CLOUDFRONT_URL}/${teacher.member_profile}` : defaultImg}
            alt="사용자 프로필"
          />
        </PictureBox>
        <NameBox>
          <NameLine>{teacher.member_name}</NameLine>
          <ClassLine>{teacher.class_name}반</ClassLine>
        </NameBox>
      </Card>
    </CardLine>
  );
};

export default TeacherProfilePhoto;

const CardLine = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Card = styled.div`
  position: relative;
  width: 160px;
  height: 185px;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PictureBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

const Pic = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 10px;
`;

const NameBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const NameLine = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const ClassLine = styled.div`
  font-size: 10px;
  color: white;
`;
