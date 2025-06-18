import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/defaultImg.png';

const TeacherProfilePhoto = () => {
  return (
    <CardLine>
      <Card>
        <PictureBox>
          <Pic src={defaultImg} alt="아이사진" />
        </PictureBox>
        <NameBox>
          <NameLine>이선생</NameLine>
          <ClassLine>햇님반</ClassLine>
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
