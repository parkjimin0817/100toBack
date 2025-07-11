import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BsChatSquare } from 'react-icons/bs';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosMove } from 'react-icons/io';

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
        { isOpen ?
        // 채팅창
          <>
            <RoomContainer>
              <Header>
                <BackButton><IoIosArrowBack></IoIosArrowBack></BackButton>
                <RoomTitle>채팅방~</RoomTitle>
              </Header>
              <MessagesContainer>
              </MessagesContainer>
              {/* <ImagePreview images={imagePreviews} onRemove={removeImagePreview} /> */}
              <Footer>
                <ImageUpload type="file" accept=".png, .jpg, .jpeg" multiple id="imageUpload" />
                <ImageUploadLabel htmlFor="imageUpload"><FaPlus></FaPlus></ImageUploadLabel>
                <MessageInput placeholder="Type a message"
                  // onChange={(e: ChangeEvent<HTMLInputElement>)=> setMessage(e.target.value)}
                  // onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <SendButton>전송</SendButton>
              </Footer>
            </RoomContainer>
          </>
          :
            <>
            </>
          }
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


// 채팅방 스타일 컴포넌트
const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: #f0f0f0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgb(163, 175, 237);
  color: white;
  border-bottom: 1px solid #ccc;
`;

const BackButton = styled.div`
  margin-top: 5px;
  margin-right: 10px;
  font-size: 25px;
  cursor: pointer;
`;

const RoomTitle = styled.h1`
  font-size: 20px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
`;

const ImageUpload = styled.input`
  display: none;
`;

const ImageUploadLabel = styled.label`
  margin-right: 10px;
  width: 30px;
  cursor: pointer;
`

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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