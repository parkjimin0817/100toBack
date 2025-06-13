import React from 'react';
import styled from 'styled-components';
import sun from '../assets/img/sun.png';

/**
 * img : 반 별 이미지
 * className : 반 이름
 * mateCount : 현재 반에 속해 있는 아이들
 * pullConut : 정해진 반의 총 인원
 * teacher : 선생님 이름
 * classColor : 각 반의 색깔
 */

const ClassList = ({ img, className, mateCount, pullCount, teacher, classColor }) => {
  return (
    <Card $Color={classColor}>
      <CardInfo>
        <div>
          <CardImg>
            <img src={img} alt="사진" />
          </CardImg>
        </div>
        <CardInner>
          <h3>{className}반</h3>
          <Cardinnerinner>
            <span>현재 : {mateCount}명</span>
            <span>정원 : {pullCount}명</span>
          </Cardinnerinner>
        </CardInner>
      </CardInfo>
      <CardTeacherName>{teacher} 선생님</CardTeacherName>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: 10px;
  width: 240px;
  background-color: ${({ theme, $Color }) => theme.colors[$Color]};
  color: ${({ theme }) => theme.colors.white};
  gap: 5px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;

  &:hover {
    scale: 1.01;
    transition: 0.33s ease-out;
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

export default ClassList;
