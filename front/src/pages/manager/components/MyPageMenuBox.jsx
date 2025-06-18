import React from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import Button from '../../../components/Common/Button';
import { useNavigate } from 'react-router-dom';

const MyPageMenuBox = ({ menuName, icon, url, color }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(url);
  };
  return (
    <Wrapper>
      <Card>
        <MenuName>{menuName}</MenuName>
        <IconDiv $color={color}>{icon}</IconDiv>
        <Button width="130px" color="blue" onClick={handleClick}>
          바로가기
        </Button>
      </Card>
    </Wrapper>
  );
};

export default MyPageMenuBox;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;
const Card = styled.div`
  width: 280px;
  height: 360px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuName = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 30px 0;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid ${({ theme }) => theme.colors.lightorange};
  border-radius: 10px;
  background-color: white;
  width: 100px;
  height: 100px;
  margin: 30px 0 50px;
  color: ${({ theme, $color }) => theme.colors[$color]};
`;
