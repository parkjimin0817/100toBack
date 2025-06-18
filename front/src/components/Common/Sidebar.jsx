import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const sidebarRef = useRef(null);

  const handleMenuToggle = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <SidebarContainer
      ref={sidebarRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setOpenMenus({});
      }}
      $isExpanded={isExpanded}
    >
      <SidebarList $isExpanded={isExpanded}>
        {sidebarMenus.map((menu) => (
          <SidebarItem
            key={menu.id}
            $SidebarColor={menu.color}
            onMouseLeave={() => setOpenMenus((prev) => ({ ...prev, [menu.id]: false }))}
          >
            <SidebarItemButton
              $SidebarColor={menu.color}
              $isExpanded={isExpanded}
              onMouseEnter={() => handleMenuToggle(menu.id)}
            >
              {menu.icon}
              <p>{menu.label}</p>
            </SidebarItemButton>

            {openMenus[menu.id] && isExpanded && (
              <SidebarSublist $SidebarColor={menu.color}>
                {menu.subItems.map((item, idx) => (
                  <NavLink to={item.link}>
                    <SidebarSubItem key={idx} $SidebarColor={menu.color}>
                      {item.label}
                    </SidebarSubItem>
                  </NavLink>
                ))}
              </SidebarSublist>
            )}
          </SidebarItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

export default SideBar;

import { LuBaby } from 'react-icons/lu';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { MdFilterFrames } from 'react-icons/md';
import { RiHealthBookLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { IoPeopleOutline } from 'react-icons/io5';

const sidebarMenus = [
  {
    id: 'menu1',
    label: '아동 관리',
    icon: <LuBaby />,
    color: 'orange',
    subItems: [
      { label: '아동 목록', link: '/childlist' },
      { label: '아동 출결', link: '/classlist' },
      { label: '아동 건강', link: '/childhealthcheck' },
      { label: '아동 생활', link: '/childlifecheck' },
    ],
  },
  {
    id: 'menu2',
    label: '일정 관리',
    icon: <FaRegCalendarAlt />,
    color: 'purple',
    subItems: [
      { label: '유치원 일정', link: '' },
      { label: '일과표', link: '/daily' },
      { label: '학부모 상담 일정', link: '' },
    ],
  },
  {
    id: 'menu3',
    label: '유치원 게시판',
    icon: <MdFilterFrames />,
    color: 'green',
    subItems: [
      { label: '공지사항', link: '' },
      { label: '가정통신문', link: '/familycommunity/list' },
      { label: '식단표', link: '' },
      { label: '알림장', link: '' },
      { label: '사진 게시판', link: '' },
    ],
  },
  {
    id: 'menu4',
    label: '업무 관리',
    icon: <FaRegClock />,
    color: 'blue',
    subItems: [
      { label: '근태 관리', link: '' },
      { label: '휴가 관리', link: '/myvacation' },
      { label: '학부모 연락처 관리', link: '/parentcontact' },
    ],
  },
  {
    id: 'menu5',
    label: '내 건강 관리',
    icon: <RiHealthBookLine />,
    color: 'yellow',
    subItems: [
      { label: '나의 건강 데이터', link: '/myhealth' },
      { label: '건강 관리', link: '' },
    ],
  },
  {
    id: 'menu6',
    label: '사용자 관리',
    icon: <IoPeopleOutline />,
    color: 'blue',
    subItems: [
      { label: '근태 관리', link: '/teacherattendance' },
      { label: '휴가 관리', link: '' },
      { label: '회원가입 승인', link: '/approvalList' },
      { label: '교사 소개', link: '' },
      { label: '반 배정', link: '/manager/classplacement' },
    ],
  },
];

const SidebarContainer = styled.div`
  width: ${({ $isExpanded }) => ($isExpanded ? '300px' : '120px')};
  transition: width 0.3s ease;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  z-index: 100;
  position: relative;
`;

const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: ${({ $isExpanded }) => ($isExpanded ? 'flex-start' : 'center')};
  z-index: 100;
`;

const SidebarItem = styled.li`
  color: ${({ theme, $SidebarColor }) => theme.colors[$SidebarColor]};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarItemButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ $isExpanded }) => ($isExpanded ? 'row' : 'column')};
  justify-content: ${({ $isExpanded }) => ($isExpanded ? 'flex-start' : 'center')};
  width: ${({ $isExpanded }) => ($isExpanded ? '260px' : '80px')};
  height: 80px;
  border: 3px solid ${({ theme, $SidebarColor }) => theme.colors[$SidebarColor]};
  border-radius: 10px;
  transition: all 0.3s ease;
  font-size: 12px;

  & > svg {
    width: 35px;
    height: 40px;
    margin-left: ${({ $isExpanded }) => ($isExpanded ? '20px' : '0')};
    margin-right: ${({ $isExpanded }) => ($isExpanded ? '15px' : '0')};
    margin-bottom: ${({ $isExpanded }) => ($isExpanded ? '0' : '5px')};
  }

  &:hover {
    background-color: ${({ theme, $SidebarColor }) => theme.colors[$SidebarColor]};
    color: white;
    font-size: 16px;
  }
`;

const SidebarSublist = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideDown 0.3s ease forwards;
  margin-left: 40px;
  position: relative;
  gap: 10px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ theme, $SidebarColor }) => theme.colors[$SidebarColor]};
    border-radius: 2px;
  }

  @keyframes slideDown {
    0% {
      max-height: 0;
      opacity: 0;
    }
    100% {
      max-height: 500px;
      opacity: 1;
    }
  }
`;

const SidebarSubItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin-left: 20px;
  font-size: 12px;
  border-radius: 5px;
  min-height: 40px;

  &:hover {
    background-color: ${({ theme, $SidebarColor }) => theme.colors[$SidebarColor]};
    color: white;
    font-size: 16px;
  }
`;
