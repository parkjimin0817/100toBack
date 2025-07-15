import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BsChatSquare } from 'react-icons/bs';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosMove } from 'react-icons/io';
import ChatContainer from './ChatContainer';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const changeSet = () => {
    setIsOpen(!isOpen);
  }

  // 드래그 앤 드롭
  const itemRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, startPosition]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setPosition(prevPosition => ({
      x: Math.min(prevPosition.x, windowWidth - 100),
      y: Math.min(prevPosition.y, windowHeight - 100),
    }));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 채팅 창 부분
  // const [isRoom, setRoom] = useState(false);

  return (
    <>
      <ChatBox
        style={{
          transform: `translate(${position.x}px, ${position.y-100}px)`,
          display: `${isOpen ? "" : "none"}`
        }}>
          <ChatContainer></ChatContainer>
        <div></div>
      </ChatBox>
      {/* 이동 부분 */}
      <div>
        <ChatClickBox
          ref={itemRef} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }} onClick={changeSet} className={"chatClickBox"}
          >
            { isOpen ?
              <MdClose className={"icons"} style={{color: "white"}}></MdClose>
              :
              <BsChatSquare className={"icons"} style={{color: "white"}}></BsChatSquare>
            }
        </ChatClickBox>
        {isHovered && (
          <MoveChatBox onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleMouseDown} style={{
              transform: `translate(${position.x-100}px, ${position.y}px)`,
            }} className={"moveChatBox"}>
            <IoIosMove className={"icons"}></IoIosMove>
          </MoveChatBox>
        )}
      </div>
    </>
  )
}

export default ChatButton

const ChatClickBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  right: 50px;
  bottom: 50px;
  background-color: rgb(163, 175, 237);
  cursor: pointer;
  position: fixed;
  z-index: 999;
  border-radius: 50px;

  & > svg {
    width: 30px;
    height: 30px;
  }
`;

const MoveChatBox = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  height: 75px;
  right: -50px;
  bottom: 50px;
  background-color: white;
  cursor: move;
  position: fixed;
  z-index: 998;
  border-radius: 50px;

  & > svg {
    width: 30px;
    height: 30px;
  }
`;

const ChatBox = styled.div`
  width: 300px;
  height: 500px;
  right: 50px;
  bottom: 50px;
  border-radius: 25px;
  background-color: white;
  position: fixed;
  z-Index: 999;
  border: 1px solid #e4e4e4;
  overflow: hidden;
`

// [채팅 컴포넌트 설계]
// 하단 푸터 메뉴 - [선생님 목록(사람 아이콘), 내 채팅방 목록(채팅방 아이콘)]
// 상단 헤더 메뉴 - [채팅방 이면 채팅방 이름과 뒤로가기 버튼 추가, 아닌경우, 메뉴이름 나오도록]

// 채팅컨텐츠 컨테이너 
// - 내부에 그때마다 필요한 컴포넌트 넣어서 해결






// 채팅 구현 순서

// 멤버 리스트로 교사 & 시설장이 나오도록 함.

// 클릭 하면, 카톡처럼 상세 정보 창이 나오도록 함.

// 상세 정보 창에서 1:1 채팅 버튼을 누를 수 있음.

// 1ㄷ1 채팅 버튼 누르면, 백엔드의 1:1 채팅방 생성 api 호출

// 채팅방 목록 불러와서 띄우기

// 채팅방 접속 할 수 있도록 만들기

// 채팅방에서 채팅 가능하도록 만들기

// 채팅방에서 초대 가능하도록 만들기



// restAPI 정리

// [1:1 채팅방 생성 또는 조회]
// /api/chat/room/private/create
// Post
// 필요 변수 
// other_member_no 
// - 반환 값
// chatRoomNo 

// [채팅방 이전 메세지 조회]
// /api/chat/history/{chatRoomNo}
// Get
// 필요 변수
// chatRoomNo
// - 반환 값
// chatMessage 배열로

// [그룹채팅목록 조회]
// /api/chat/room/group/list
// Get
// 필요 변수
// X
// - 반환 값
// chatRooms 배열로

// [그룹 채팅방 개설]
// /api/chat/room/group/create
// Post
// 필요 변수
// chatRoomName
// - 반환 값


// [그룹채팅방 참여]
// /api/chat/room/group/{chatRoomNo}/join
// Post
// 필요 변수
// chatRoomNo
// - 반환 값

// [내 채팅방 목록 조회]
// /api/chat/my/chatRooms
// Get
// 필요 변수
// X
// - 반환 값

// [채팅메세지 읽음 처리]
// /api/chat/room/{chatRoomNo}/read
// Post
// 필요 변수
// chatRoomNo
// - 반환 값

// [채팅방 나가기]
// /api/chat/room/group/{chatRoomNo}/leave
// Delete
// 필요 변수
// chatRoomNo
// - 반환 값

// [시설 인원 불러오기]
// /api/members/memberList
// Get
// 필요 변수 
// centerNo

