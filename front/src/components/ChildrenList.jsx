import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ChildImg from '../assets/Child.png';
import { toast } from 'react-toastify';
import api from '../api/axios';

const ChildrenList = ({
  showAll,
  sortBy,
  roleBy,
  classFilter,
  Color,
  nameFilter,
  classPlacement,
  selectedItem,
  setSelectedItem,
  centerNo,
}) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;

        if (roleBy === 'child') {
          if (classFilter) {
            res = await api.get(`http://localhost:8888/api/childs`, {
              params: { classNo: classFilter },
            });
          } else {
            res = await api.get(`http://localhost:8888/api/childs/all`, {
              params: { centerNo },
            });
          }
        } else if (roleBy === 'teacher') {
          res = await api.get(`http://localhost:8888/api/members/getteacher`, {
            params: { id: centerNo },
          });
        }
        if (res?.data) setList(res.data);
      } catch (err) {
        toast.error('데이터 조회 실패:', err);
      }
    };
    fetchData();
  }, [roleBy, classFilter, centerNo]);

  let filtered = [...list];

  if (!showAll) {
    filtered = filtered.filter((item) => item.class_name === '미배정');
  }

  if (sortBy === 'class') {
    filtered.sort((a, b) => a.class_name?.localeCompare(b.class_name));
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => (a.child_name || a.member_name)?.localeCompare(b.child_name || b.member_name));
  } else if (sortBy === 'createDate') {
    filtered.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  }

  if (nameFilter) {
    filtered = filtered.filter((item) =>
      (item.child_name || item.member_name)?.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  return (
    <Container>
      <CardLine>
        {filtered.map((item, index) => {
          const id = item.child_no || item.member_no || index;
          const name = item.child_name || item.member_name || '이름 없음';
          const className = item.class_name || '미배정';
          const role = roleBy;

          return (
            <Card
              key={id}
              className={classPlacement && selectedItem?.id === id && selectedItem?.role === role ? 'selected' : ''}
              onClick={() => {
                const id = item.child_no || item.member_no;

                if (classPlacement) {
                  // 이미 선택된 항목을 다시 누르면 선택 해제
                  if (selectedItem?.id === id && selectedItem?.role === role) {
                    setSelectedItem(null);
                  } else {
                    const classNo = item.class_no || 0;
                    setSelectedItem({ id, role, class_no: classNo });
                  }
                } else {
                  if (role === 'child') {
                    navigate(`/child/detail/${id}`);
                  } else if (role === 'teacher') {
                    navigate(`/manager/teacherattendance/${id}`);
                  }
                }
              }}
            >
              <PictureBox color={Color}>
                <ChildPic src={ChildImg} alt="아이사진" />
              </PictureBox>
              <NameBox color={Color}>
                <NameLine>{name}</NameLine>
                <ClassLine>{className}반</ClassLine>
              </NameBox>
            </Card>
          );
        })}
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
    transform: translateY(-5px); // 위로 살짝 띄우기
    box-shadow: 0 8px 24px rgba(0, 123, 255, 0.4); // 강조
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
    border: solid 5px ${({ theme, color }) => theme.colors[color]};
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
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  color: white;
`;

const ClassLine = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: white;
`;
