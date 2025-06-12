import React, { useState } from 'react';
import styled from 'styled-components';
import { LuBaby } from "react-icons/lu";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { MdFilterFrames } from "react-icons/md";
import { RiHealthBookLine } from "react-icons/ri";

const SideBar = () => {
  const [isHover , setIsHover] = useState(false);

  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarItemButton>
          <LuBaby />
          <p>아동 관리</p>
        </SidebarItemButton>
        <SidebarItemButton>
          <FaRegCalendarAlt />
          <p>일정 관리</p>
        </SidebarItemButton>
        <SidebarItemButton>
          <MdFilterFrames />
          <p>유치원 게시판</p>
        </SidebarItemButton>
        <SidebarItemButton>
          <FaRegClock />
          <p>업무 관리</p>
        </SidebarItemButton>
        <SidebarItemButton>
          <RiHealthBookLine />
          <p>내 건강 관리</p>
        </SidebarItemButton>
      </SidebarList>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 120px;
`;

const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const SidebarItemButton = styled.li`
  display : flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 3px black solid;
  border-radius: 10px;
  font-size: 12px;

  & > svg {
    width: 35px;
    height: 40px;
    margin-bottom: 5px;
  }

  &:hover {
    background-color : black;
    color: white;
  }
`;

const SidebarSublist = styled.ul``;

const SidebarSubItem = styled.li``;

export default SideBar;
