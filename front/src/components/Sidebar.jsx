import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { LuBaby } from "react-icons/lu";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { MdFilterFrames } from "react-icons/md";
import { RiHealthBookLine } from "react-icons/ri";

const SideBar = () => {
  const [isExpanded , setIsExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    menu1 : false,
    menu2 : false,
    menu3 : false,
    menu4 : false,
    menu5 : false,
  });
  const sidebarRef = useRef(null);

  return (
    <SidebarContainer
      ref={sidebarRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      $isExpanded={isExpanded}
    >
      <SidebarList
        $isExpanded={isExpanded}
      >
        <SidebarItem
          onMouseLeave={() => setOpenMenus(menus => ({...menus, menu1 : false}))}
        >
          <SidebarItemButton 
            onClick={() => setOpenMenus(menus => ({...menus, menu1 : !menus.menu1}))}
            $isExpanded={openMenus.menu1 && isExpanded}
          >
            <LuBaby />
            <p>아동 관리</p>
          </SidebarItemButton>
          {openMenus.menu1 && isExpanded && (
            <SidebarSublist>
              <SidebarSubItem>아동 목록</SidebarSubItem>
              <SidebarSubItem>아동 출결</SidebarSubItem>
              <SidebarSubItem>아동 건강</SidebarSubItem>
              <SidebarSubItem>아동 생활</SidebarSubItem>
            </SidebarSublist>
          )}
        </SidebarItem>
        <SidebarItem
          onMouseLeave={() => setOpenMenus(menus => ({...menus, menu2 : false}))}
        >
          <SidebarItemButton 
            onClick={() => setOpenMenus(menus => ({...menus, menu2 : !menus.menu2}))}
            $isExpanded={openMenus.menu2 && isExpanded}
          >
            <FaRegCalendarAlt />
            <p>일정 관리</p>
          </SidebarItemButton>
          {openMenus.menu2 && isExpanded && (
            <SidebarSublist>
              <SidebarSubItem>유치원 일정</SidebarSubItem>
              <SidebarSubItem>일과표</SidebarSubItem>
              <SidebarSubItem>학부모 상담 일정</SidebarSubItem>
            </SidebarSublist>
          )}
        </SidebarItem>
        <SidebarItem
          onMouseLeave={() => setOpenMenus(menus => ({...menus, menu3 : false}))}
        >
          <SidebarItemButton 
            onClick={() => setOpenMenus(menus => ({...menus, menu3 : !menus.menu3}))}
            $isExpanded={openMenus.menu3 && isExpanded}
          >
            <MdFilterFrames />
            <p>유치원 게시판</p>
          </SidebarItemButton>
          {openMenus.menu3 && isExpanded && (
            <SidebarSublist>
              <SidebarSubItem>공지사항</SidebarSubItem>
              <SidebarSubItem>가정통신문</SidebarSubItem>
              <SidebarSubItem>식단표</SidebarSubItem>
              <SidebarSubItem>알림장</SidebarSubItem>
              <SidebarSubItem>사진 게시판</SidebarSubItem>
            </SidebarSublist>
          )}
        </SidebarItem>
        <SidebarItem
          onMouseLeave={() => setOpenMenus(menus => ({...menus, menu4 : false}))}
        >
          <SidebarItemButton 
            onClick={() => setOpenMenus(menus => ({...menus, menu4 : !menus.menu4}))}
            $isExpanded={openMenus.menu4 && isExpanded}
          >
            <FaRegClock />
            <p>업무 관리</p>
          </SidebarItemButton>
          {openMenus.menu4 && isExpanded && (
            <SidebarSublist>
              <SidebarSubItem>근태 관리</SidebarSubItem>
              <SidebarSubItem>휴가 관리</SidebarSubItem>
              <SidebarSubItem>학부모 연락처 관리</SidebarSubItem>
            </SidebarSublist>
          )}
        </SidebarItem>
        <SidebarItem
          onMouseLeave={() => setOpenMenus(menus => ({...menus, menu5 : false}))}
        >
          <SidebarItemButton 
            onClick={() => setOpenMenus(menus => ({...menus, menu5 : !menus.menu5}))}
            $isExpanded={openMenus.menu5 && isExpanded}
          >
            <RiHealthBookLine />
            <p>내 건강 관리</p>
          </SidebarItemButton>
          {openMenus.menu5 && isExpanded && (
            <SidebarSublist>
              <SidebarSubItem>나의 건강 데이터</SidebarSubItem>
              <SidebarSubItem>건강 관리</SidebarSubItem>
            </SidebarSublist>
          )}
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: ${({ $isExpanded }) => ($isExpanded ? '300px' : '120px')};
  z-index: 100;
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: ${({ $isExpanded }) => ($isExpanded ? 'flex-start' : 'center')};
  z-index: 100;
`;

const SidebarItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarItemButton = styled.li`
  display : flex;
  align-items: center;
  flex-direction: ${({ $isExpanded }) => ($isExpanded ? 'row' : 'column')};
  justify-content: ${({ $isExpanded }) => ($isExpanded ? 'flex-start' : 'center')};
  width: ${({ $isExpanded }) => ($isExpanded ? '260px' : '80px')};
  height: 80px;
  border: 3px black solid;
  border-radius: 10px;
  font-size: 12px;
  z-index : 100;

  & > svg {
    width: 35px;
    height: 40px;
    margin-bottom: ${({ $isExpanded }) => ($isExpanded ? '0' : '5px')};
    margin-left: ${({ $isExpanded }) => ($isExpanded ? '20px' : '0')};
    margin-right: ${({ $isExpanded }) => ($isExpanded ? '15px' : '0')};
  }

  &:hover {
    background-color : black;
    color: white;
  }
`;

const SidebarSublist = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 40px;
  text-align: left;
  gap: 10px;
  top: calc(100%);
  right: 0;

  &::before {
    content: ''; /* content는 꼭 있어야 함 (비워도 됨) */
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    
    width: 4px;             /* 작대기 두께 */
    height: 100%;           /* 작대기 길이 */
    background-color: black;  /* 작대기 색상 (예: 주황) */
    border-radius: 2px;     /* 끝을 둥글게 처리 */
  }
`;

const SidebarSubItem = styled.li`
  margin-left: 20px;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 5px;

  &:hover {
    background-color : black;
    color: white;
  }
`;

export default SideBar;
