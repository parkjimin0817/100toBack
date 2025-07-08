import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import ChildImg from '../assets/Child.png';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ParentChildrenList = ({ childFilter, onChildClick }) => {
  const [childList, setChildList] = useState([]);

  const fetchChildren = useCallback(async () => {
    try {
      const response = await api.get(`http://localhost:8888/api/childs/parentChild?memberNo=${childFilter}`);
      setChildList(response.data);
    } catch (error) {
      toast.error('아동 목록 조회 실패:', error);
    }
  }, [childFilter]);

  useEffect(() => {
    if (childFilter) {
      fetchChildren();
    }
  }, [childFilter, fetchChildren]);

  // 자녀 목록 새로고침 함수를 전역으로 노출
  useEffect(() => {
    window.refreshChildList = fetchChildren;
    return () => {
      delete window.refreshChildList;
    };
  }, [fetchChildren]);

  return (
    <Container>
      <CardLine>
        {childList.map((child) => (
          <Card key={child.child_no} onClick={() => onChildClick(child)}>
            <PictureBox>
              <ChildPic src={ChildImg} alt="아이사진" />
            </PictureBox>
            <NameBox>
              <NameLine>{child.child_name}</NameLine>
              <ClassLine>{child.class_name || '미배정'}</ClassLine>
            </NameBox>
          </Card>
        ))}
      </CardLine>
    </Container>
  );
};

export default ParentChildrenList;

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
`;

const PictureBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  &:hover {
    border: solid 5px ${({ theme }) => theme.colors.orange};
    cursor: pointer;
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
  background-color: ${({ theme }) => theme.colors.orange};
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
