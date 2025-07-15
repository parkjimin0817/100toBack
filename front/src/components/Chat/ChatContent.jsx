import React from 'react'
import styled from 'styled-components';

const ChatContent = ({ type, memberList, chatRoomList, messages, createPrivateChatRoom }) => {
  return (
    <MessagesContainer>
      {type === 'members' ? ( // 멤버 리스트
        <>
          {memberList && memberList.length > 0 && memberList.map((member) => (
            <div onClick={() => createPrivateChatRoom(member)}>
              <p>{member.member_name}</p>
            </div>
          ))}
        </>
      ) : type === 'chatRooms' ? ( // 참여중인 채팅방 리스트
        <></>
      ) : ( // 채팅방
        <>
          {messages && messages.length > 0 && messages.map((message) => (
            <div>
              <p>{message?.senderId}</p>
              <p>{message?.message}</p>
            </div>
          ))}
        </>
      )}
    </MessagesContainer>
  )
}

export default ChatContent;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
  overflow-y: auto;
`;