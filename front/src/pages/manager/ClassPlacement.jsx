// src/pages/manager/ClassPlacement.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../components/Common/ContentHeader';
import ChildrenList from '../../components/ChildrenList';
import Modal from '../../components/ClassPlacementModal';

const ClassPlacement = () => {
  const navigate = useNavigate();
  const headerButtons = [
    { Title: '반 목록', func: () => navigate('/classlist') },
    { Title: '뒤로가기', func: () => navigate(-1) },
  ];

  // true → 전체, false → 미배정
  const [showAll, setShowAll] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  // 정렬 초기값을 등록순으로
  const [sort, setSort] = useState('createDate');

  const [role, setRole] = useState('child');

  const today = new Date().toISOString().split('T')[0]; // "2025-06-20"

  const [selectedDate, setSelectedDate] = useState(today);

  const [selectedId, setSelectedId] = useState(null);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <Content>
        <ContentHeader Title="반 배정" Color="blue" ButtonProps={headerButtons} />

        <ButtonLine>
          <ToggleButton active={showAll} onClick={() => setShowAll(true)}>
            전체
          </ToggleButton>

          <ToggleButton active={!showAll} onClick={() => setShowAll(false)}>
            미배정
          </ToggleButton>
          <DropdownLine>
            <P>대상</P>
            <Dropdown value={role} onChange={handleRole}>
              <option value="child">아동</option>
              <option value="teacher">교사</option>
            </Dropdown>
          </DropdownLine>
          <DropdownLine style={{ marginLeft: '0px' }}>
            <P>정렬</P>
            <Dropdown value={sort} onChange={handleSort}>
              <option value="createDate">등록순</option>
              <option value="class">반별</option>
              <option value="name">이름순</option>
            </Dropdown>
          </DropdownLine>
          <PlacementButton onClick={() => setOpenModal(true)}>반 배정</PlacementButton>
        </ButtonLine>
        <ChildrenList
          Color="blue"
          showAll={showAll}
          sortBy={sort}
          roleBy={role}
          classPlacement={true}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
      </Content>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} selectedDate={selectedDate} id={selectedId} />
    </>
  );
};

export default ClassPlacement;

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ButtonLine = styled.div`
  display: flex;
  margin-left: 60px;
  gap: 25px;
`;

const ToggleButton = styled.button`
  width: 82px;
  height: 36px;
  margin-top: 30px;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  font-size: 16px;

  background-color: ${(props) => (props.active ? '#1A748E40' /* 선택된 버튼 */ : '#8FD7EB40')}; /* 선택 안된 버튼 */
`;

const DropdownLine = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 300px;
`;

const P = styled.p`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Dropdown = styled.select`
  width: 120px;
  height: 30px;
  border-radius: 5px;
`;

const PlacementButton = styled.button`
  width: 82px;
  height: 36px;
  margin-top: 30px;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  font-size: 16px;
  background-color: #8fd7eb40;

  &:hover {
    background-color: #1a748e40;
    cursor: pointer;
  }
`;
