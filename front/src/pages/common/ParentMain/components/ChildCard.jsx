import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { childInfo } from '../../../../api/childInfo';
import boy2 from '../../../../assets/boy2.png';

const ChildCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      {data.map((item) => {
        const { age, gender, birthday } = childInfo(item.child_resident_no);
        return (
          <Card key={item.child_no} onClick={() => navigate('/child/detail?id=1')}>
            <ProfileDiv>
              <NameDiv> 씩씩한 {item.child_name} </NameDiv>
              <AgeDiv>
                ({age}세/ {gender})
              </AgeDiv>
              <BirthDiv> {birthday} </BirthDiv>
            </ProfileDiv>
            <ImgDiv>
              <Img src={boy2} />
            </ImgDiv>
          </Card>
        );
      })}
    </>
  );
};
export default ChildCard;

const Card = styled.div`
  width: 240px;
  height: 360px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;

  :hover {
    cursor: pointer;
  }
`;

const ProfileDiv = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[8]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.white};
  gap: ${({ theme }) => theme.spacing[1]};
`;

const NameDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AgeDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const BirthDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: flex-end;
`;

const Img = styled.img``;
