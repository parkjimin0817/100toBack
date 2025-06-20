import styled from 'styled-components';
import { css } from 'styled-components';
import ChildImg from '../assets/Child.png';
import { useNavigate } from 'react-router-dom';
import { List } from './ChildDummyData';
import { useState } from 'react';

// 하드코딩된 예시 데이터

// ChildrenList.jsx 내부
const ChildrenList = ({
  showAll,
  sortBy,
  roleBy,
  classFilter,
  Color,
  nameFilter,
  classPlacement,
  selectedId,
  setSelectedId,
}) => {
  const navigate = useNavigate();
  let list = [...List];

  if (!showAll) {
    list = list.filter((child) => !child.className);
  }

  if (sortBy === 'class') {
    list.sort((a, b) => a.className.localeCompare(b.className));
  } else if (sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'createDate') {
    list.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  }

  // 역할(role) 필터링: 'child' 또는 'teacher'만 필터링
  if (roleBy === 'child' || roleBy === 'teacher') {
    list = list.filter((item) => item.role === roleBy);
  }

  if (classFilter) {
    list = list.filter((item) => item.className === classFilter);
  }

  if (nameFilter) {
    list = list.filter((item) => item.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  return (
    <Container>
      <CardLine>
        {list.map((child) => (
          <Card
            key={child.id}
            className={classPlacement && selectedId === child.id ? 'selected' : ''}
            onClick={() => {
              if (child.role === 'child') {
                navigate(`/child/detail/${child.id}`);
              } else if (child.role === 'teacher') {
                navigate(`/manager/teacherattendance/${child.id}`);
              }
            }}
          >
            <PictureBox color={Color}>
              <ChildPic src={ChildImg} alt="아이사진" />
            </PictureBox>
            <NameBox color={Color}>
              <NameLine>{child.name}</NameLine>
              <ClassLine>{child.className || '미배정'}</ClassLine>
            </NameBox>
          </Card>
        ))}
      </CardLine>
    </Container>
  );
};

export default ChildrenList;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const CardLine = styled.div`
  place-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Card = styled.div`
  position: relative;
  width: 160px;
  height: 185px;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &.selected {
    transform: translateY(-15px);
  }
`;

const PictureBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  transition: border 0.2s ease;
  &:hover {
    cursor: pointer;
    border: solid 5px ${({ theme }) => theme.colors.blue};
  }
`;

const ChildPic = styled.img`
  border-radius: 10px;
`;

const NameBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 50px;
  background-color: ${({ theme, color }) => theme.colors[color]};
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
