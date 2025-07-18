import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatFooter from './ChatFooter';
import styled from 'styled-components';
import { chatService } from '../../api/chat';
import useLoginStore from '../../store/loginStore';
import { IoIosArrowBack } from 'react-icons/io';

// 채팅 관련 전체 관리

/**
 * chatStatus : {
 *  type :
 *  ko :
 * }
 * type 값을 가지고 판단.
 * (members, 멤버
 * chatRooms, 채팅방 리스트
 * chatRoom) 현재 채팅방
 * ko : type의 표기 명 (표시하는데 씀.)
 */

function getWsUrl(chatRoomNo) {
  const base = 'http://localhost:8888';
  const token = sessionStorage.getItem('accessToken');
  return base.replace(/^http/, 'ws') + `/connect?chatRoomNo=${chatRoomNo}&token=${token}`;
}

const ChatContainer = () => {
  // 현재 선택한 탭의 대한 상태 값
  const [chatStatus, setChatStatus] = useState({
    type: 'members',
    ko: '사용자들',
  });
  // 사용자 목록 리스트
  const [memberList, setMemberList] = useState([]);
  // 나의 참여 채팅방 목록
  const [chatRoomList, setChatRoomList] = useState([]);
  // 현재 선택한 채팅방
  const [selectChatRoomNo, setSelectChatRoomNo] = useState(null);
  // 채팅방의 메세지들
  const [messages, setMessages] = useState([]);
  // 새 채팅
  const [newMessage, setNewMessage] = useState('');
  // 웹 소켓 상태 관리
  const [ws, setWs] = useState(null);

  // 로그인 한 현재 사용자 정보
  const { member } = useLoginStore();

  useEffect(() => {
    // 탭 상태가 변할 때마다, 사용자 목록, 채팅방 목록 등 새로고침함.
    if (chatStatus.type === 'chatRoom') return; // 현재 채팅방이라면, 새로고침 안함.

    // 채팅방 리스트 불러오는 코드
    // 참여중인 채팅방만 불러온다.
    const getChatRoomList = async () => {
      try {
        const responseData = await chatService.getMyChatRoom();
        // 불러온 참여중인 채팅방 리스트 저장
        setChatRoomList(responseData);
      } catch (error) {
        console.error('채팅방 조회 실패 : ', error);
        // alert('반 조회 실패');
      }
    };

    if (chatStatus.type === 'chatRooms') getChatRoomList();

    // 채팅 가능한 사용자 목록 불러오는 코드
    // 시설장 & 교사 인경우, 학부모 목록과 시설의 교사 시설장 목록을 불러온다.(본인 제외)
    // 부모 인경우, 시설 내의 교사 & 시설장 목록을 불러온다.
    const getMemberList = async () => {
      try {
        const responseData = await chatService.getMemberList(member.centerNo);

        const filteredData = responseData.filter((chatMember) => chatMember.member_no !== member.memberNo);
        // 시설 내 멤버 리스트 불러오기
        setMemberList(filteredData);
      } catch (error) {
        console.error('멤버 리스트 조회 실패 : ', error);
      }
    };
    if (chatStatus.type === 'members') getMemberList();
  }, [chatStatus.type]);

  // 채팅방 연결시, 이전 기록 불러오기
  useEffect(() => {
    // 현재 선택한 채팅방이 없는 경우엔 안불러옴.
    if (!selectChatRoomNo) return;

    // 채팅방 메세지 내역 삭제
    setMessages([]);

    // 채팅방 이전 채팅 기록 불러오기
    const getChatRoomHistory = async () => {
      try {
        const responseData = await chatService.getChatRoomHistory(selectChatRoomNo);

        // 불러온 메세지 기록들 저장
        setMessages(responseData);
      } catch (error) {
        console.error('이전 채팅 기록 불러오기 실패 : ', error);
      }
    };
    getChatRoomHistory();
    console.log('방에 입장.');
    connectWebsocket();

    return () => {
      disconnectWebSocket();
    };
  }, [selectChatRoomNo]);

  // 웹 소켓 연결 함수
  const connectWebsocket = () => {
    const websocket = new WebSocket(getWsUrl(selectChatRoomNo));

    websocket.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    websocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error('메시지 파싱 실패:', error);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket 연결 종료');
    };
    setWs(websocket);
  };

  // 웹 소켓 연결 종료 함수
  const disconnectWebSocket = async () => {
    try {
      // await readChatRoom(selectChatRoomNo);
      await chatService.readChatMessage(selectChatRoomNo);
    } catch (error) {
      console.error(error);
    }
    if (ws) {
      ws.close();
    }
  };

  // 채팅 보내기
  const sendMessage = () => {
    if (newMessage.trim() === '' || !ws) return;
    const message = {
      roomNo: Number(selectChatRoomNo),
      senderNo: member.memberNo,
      senderName: member.memberName,
      message: newMessage,
    };
    ws.send(JSON.stringify(message));
    setNewMessage('');
  };

  // 엔터 입력시 채팅 보내기
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 탭 변경 함수
  const onChangeStatus = (type, ko) => {
    setChatStatus({ type: type, ko: ko });
  };

  // 멤버 클릭시 1대1 채팅방 생성 함수
  const createPrivateChatRoom = async (otherMember) => {
    if (!otherMember) return;

    try {
      const chatRoomId = await chatService.privateChatCreate(otherMember.member_no);
      setSelectChatRoomNo(chatRoomId);
      onChangeStatus('chatRoom', otherMember.member_name);
    } catch (error) {
      console.error('개인 채팅 시작 실패 : ', error);
    }
  };

  // 채팅창에서 채팅방 리스트로 돌아가는 함수
  const backChatRoomList = () => {
    onChangeStatus('chatRooms', '채팅방');
    setSelectChatRoomNo(null);
    disconnectWebSocket();
  };

  // 채팅방 리스트에서 채팅방을 클릭하여 채팅방에 들어가는 함수.
  const enterChatRoom = (chatRoomId, chatRoomName) => {
    setSelectChatRoomNo(chatRoomId);
    onChangeStatus('chatRoom', chatRoomName);
  };

  return (
    <RoomContainer>
      <ChatHeader
        type={chatStatus.type}
        title={chatStatus.ko}
        buttonProps={[{ name: <IoIosArrowBack></IoIosArrowBack>, func: backChatRoomList }]}
      ></ChatHeader>
      <ChatContent
        type={chatStatus.type}
        memberList={memberList}
        chatRoomList={chatRoomList}
        messages={messages}
        createPrivateChatRoom={createPrivateChatRoom}
        enterChatRoom={enterChatRoom}
      ></ChatContent>
      <ChatFooter
        type={chatStatus.type}
        onChange={onChangeStatus}
        newMessage={newMessage}
        onMessageChange={(message) => setNewMessage(message)}
        onKeyPressFunc={handleKeyPress}
        sendMessage={sendMessage}
      ></ChatFooter>
    </RoomContainer>
  );
};

export default ChatContainer;

// 채팅방 스타일 컴포넌트
const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: #f0f0f0;
`;
