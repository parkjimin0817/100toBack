import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultimg.png';
import useLoginStore from '../../store/loginStore';

const CLOUD_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ChatContent = ({ type, memberList, chatRoomList, messages, createPrivateChatRoom, enterChatRoom }) => {
  // 로그인 한 현재 사용자 정보
  const { member } = useLoginStore();

  // 자동으로 스크롤 내려주기
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <MessagesContainer>
      {type === 'members' ? ( // 멤버 리스트
        <>
          {memberList &&
            memberList.length > 0 &&
            memberList.map((member) => (
              <MemberListItem key={member.member_no} onClick={() => createPrivateChatRoom(member)}>
                <MemberProfileImg
                  src={member.member_profile ? `${CLOUD_URL}/${member.member_profile}` : defaultImg}
                ></MemberProfileImg>
                <MemberNameTag>{member.member_name}</MemberNameTag>
              </MemberListItem>
            ))}
        </>
      ) : type === 'chatRooms' ? ( // 참여중인 채팅방 리스트
        <>
          {chatRoomList &&
            chatRoomList.length > 0 &&
            chatRoomList.map((chatRoom) => (
              <ChatRoomItem
                key={chatRoom.chatRoomNo}
                onClick={() => enterChatRoom(chatRoom.chatRoomNo, chatRoom.chatRoomName)}
              >
                <ChatRoomImg src={chatRoom.memberProfile ? `${CLOUD_URL}/${chatRoom.memberProfile}` : defaultImg} />
                <ChatRoomName>{chatRoom.chatRoomName}</ChatRoomName>
                {chatRoom.unReadCount > 0 && <ChatRoomUnreadCount>{chatRoom.unReadCount}</ChatRoomUnreadCount>}
              </ChatRoomItem>
            ))}
        </>
      ) : (
        // 채팅방
        <>
          <div style={{ marginTop: '10px' }}></div>
          {messages &&
            messages.length > 0 &&
            messages.map((message, index) => {
              const isMe = message?.senderId === member.memberNo;
              const isSameSenderAsPrevious = index > 0 && messages[index - 1]?.senderId === message?.senderId;

              return (
                <>
                  {!isMe && !isSameSenderAsPrevious && (
                    <ChatProfileBox>
                      <ChatMemberProfileImg src={defaultImg} />
                      <p>{message.senderName}</p>
                    </ChatProfileBox>
                  )}
                  <ChatBox key={index} $me={isMe}>
                    <ChatBubble $me={isMe}>
                      <p>{message?.message}</p>
                    </ChatBubble>
                  </ChatBox>
                </>
              );
            })}
          <div ref={chatContainerRef}></div>
        </>
      )}
    </MessagesContainer>
  );
};

export default ChatContent;

const MessagesContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  overflow-y: auto;
`;

// 사용자 목록 디자인
const MemberListItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const MemberProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const MemberNameTag = styled.p``;

// 채팅방 목록 디자인
const ChatRoomItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const ChatRoomImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const ChatRoomName = styled.p`
  text-align: start;
  flex: 1;
`;

const ChatRoomUnreadCount = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 20px;
  color: white;
`;

// 채팅방 디자인
const ChatBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ $me }) => ($me ? 'flex-end' : 'flex-start')};
  padding-left: 10px;
`;

const ChatProfileBox = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  padding-left: 10px;
`;

const ChatMemberProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

// const ChatBubble = styled.div`
//   display: flex;
//   padding: 5px;
//   margin-left: ${({ $me }) => $me ? "0" : "50px"};
// `;

const ChatBubble = styled.div`
  max-width: 70%;
  padding: 5px 10px;
  margin: 4px 8px;
  border-radius: 10px;
  position: relative;
  color: ${({ $me }) => ($me ? 'white' : 'black')};
  background-color: ${({ $me }) => ($me ? '#4f7df9' : '#f1f0f0')};
  align-self: ${({ $me }) => ($me ? 'flex-end' : 'flex-start')};
  margin-left: ${({ $me }) => ($me ? '0' : '50px')};
  margin-right: ${({ $me }) => ($me ? '15px' : '0')};

  p {
    margin: 0;
    word-break: break-word;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${({ $me }) => ($me ? '#4f7df9' : '#f1f0f0')};
    clip-path: polygon(0 0, 100% 100%, 100% 0);

    ${({ $me }) =>
      $me
        ? `
      right: -10px;
      bottom: 10px;
      transform: rotate(-90deg);
    `
        : `
      left: -10px;
      bottom: 10px;
    `}
  }
`;
