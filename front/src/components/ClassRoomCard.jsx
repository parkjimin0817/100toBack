import React, { useState } from 'react';
import styled from 'styled-components';
import sun from '../assets/img/sun.png';
import { useNavigate } from 'react-router-dom';
import { GiRialtoBridge } from 'react-icons/gi';
import useLoginStore from '../store/loginStore';
import { toast } from 'react-toastify';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

/**
 * classRoom : 반 데이터 객체입니다.
 * - class_no : 반 번호
 * - class_image : 반 이미지
 * - class_name : 반 이름
 * - child_count : 반 인원 수
 * - capacity : 반 정원 수
 * - member_name : 담임 선생님 명
 * - color : 반 색상
 * clickEventFunc : 반 카드 클릭시 이벤트. (매개변수로, 반 번호를 받습니다.)
 */

const ClassRoomCard = ({ classRoom, clickEventFunc }) => {

  return (
    <Card $Color={classRoom.color} onClick={() => clickEventFunc(classRoom.class_no)}>
      <CardInfo>
        <div>
          <CardImg>
            {classRoom.class_image ? (
              <Img src={`${CLOUDFRONT_URL}/${classRoom.class_image}`} alt="반 사진" />
            ) : (
              <Icon />
            )}
          </CardImg>
        </div>
        <CardInner>
          <h3>{classRoom.class_name}반</h3>
          <Cardinnerinner>
            <span>현재 : {classRoom.child_count}명</span>
            <span>정원 : {classRoom.capacity}명</span>
          </Cardinnerinner>
        </CardInner>
      </CardInfo>
      <CardTeacherName>{classRoom.member_name} 선생님</CardTeacherName>
    </Card>
  );
};

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: 10px;
  width: 240px;
  background-color: ${({ $Color }) => $Color};
  color: ${({ theme }) => theme.colors.white};
  gap: 5px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transition: 0.2s ease-out;
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const CardImg = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.lightwhite};
  padding: ${({ theme }) => theme.spacing[2]};
`;

const CardInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`;

const Cardinnerinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const CardTeacherName = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: right;
`;

const Icon = styled(GiRialtoBridge)`
  width: 60px;
  height: 60px;
  color: ${({ theme }) => theme.colors.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ClassRoomCard;
