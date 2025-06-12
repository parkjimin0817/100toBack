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

const ClassList = (img, className, mateCount, pullCount, teacher, classColor) => {
  return (
    <Card>
      <CardInfo>
        <div>
          <CardImg>
            <img src={sun} alt="사진" />
          </CardImg>
        </div>
        <CardInner>
          <h3>햇님반</h3>
          <Cardinnerinner>
            <span>현재 : 10명</span>
            <span>정원 : 12명</span>
          </Cardinnerinner>
        </CardInner>
      </CardInfo>
      <CardTeacherName>정의철 선생님</CardTeacherName>
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
  height: 160px;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const CardImg = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.ligthorange};
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: right;
`;

export default ClassList;
