import React from 'react'
import styled from 'styled-components';

// 채팅의 상단 헤더.

/**
 * 제목과 버튼 함수가 들어옴.
 * title : 제목
 * buttonProps : {
 *  name : 버튼 명
 *  func : 버튼 함수
 * }
 */

const ChatHeader = ({ title, buttonProps }) => {
  return (
    <Header>
      <RoomTitle>{title}</RoomTitle>
      <div>
        {buttonProps &&
          buttonProps.length > 0 &&
          buttonProps.map((buttonProp, index) => (
            <BackButton 
              key={index} 
              onClick={buttonProp.func} 
              type="button"
            >
              {buttonProp.name}
            </BackButton>
          ))}
      </div>
    </Header>
  )
}

export default ChatHeader;


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

const RoomTitle = styled.h2`
  font-size: 20px;
`;