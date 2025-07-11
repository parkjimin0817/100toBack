import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import defaultImg from '../assets/defaultImg.png';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ParentChildrenList = ({ childFilter, onChildClick }) => {
  // url 파라미터로 아동의 아이디를 받아옴.
  const [searchParams, setSearchParams] = useSearchParams();

  const childNo = searchParams.get('childNo') ?? '';

  const changeChild = (newChild) => {
    // 기존 파라미터 유지 + page만 교체
    searchParams.set('childNo', newChild.child_no.toString());
    setSearchParams(searchParams); // 페이지 이동 없이 URL만 바뀜
    onChildClick(newChild);
  };

  const [childList, setChildList] = useState([]);

  const fetchChildren = useCallback(async () => {
    try {
      const response = await api.get(`http://localhost:8888/api/childs/parentChild?memberNo=${childFilter}`);
      console.log(response.data);
      setChildList(response.data);
      if (childNo) {
        const matchedChild = response.data.find((child) => child.child_no === Number(childNo));

        onChildClick(matchedChild ?? null);
      } else {
        const firstChild = response.data.length > 0 ? response.data[0] : null;
        onChildClick(firstChild ?? null);
      }
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
          <Card key={child.child_no} onClick={() => changeChild(child)}>
            <PictureBox>
              <ChildPic
                src={child.child_profile ? `${CLOUDFRONT_URL}/${child.child_profile}` : defaultImg}
                alt="아이 프로필"
              />
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
