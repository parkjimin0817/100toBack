import api from './axios';
import { API_ENDPOINTS } from './config';

export const chatService = {
	privateChatCreate : async (other_member_no) => {
    try {
      const { data } = await api.post(`/api/chat/room/private/create?other_member_no=${other_member_no}`);

      return data;
    } catch (error) {
      console.error('1대1 채팅방 생성 실패: ', error);
      throw error;
    }
  },
  groupChatCreate : async (chatRoomName) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.CHAT.CREATE, chatRoomName);

      return data;
    } catch (error) {
      console.error('그룹 채팅방 생성 실패: ', error);
      throw error;
    }
  },
  getMyChatRoom : async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CHAT.CHATROOMS);

      return data;
    } catch (error) {
      console.error('채팅방 조회 실패: ', error);
      throw error;
    }
  },
  groupChatJoin : async (chatRoomNo) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.CHAT.JOIN(chatRoomNo));

      return data;
    } catch (error) {
      console.error('그룹 채팅방 참여 실패: ', error);
      throw error;
    }
  },
  readChatMessage : async (chatRoomNo) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.CHAT.READMESSAGE(chatRoomNo));

      return data;
    } catch (error) {
      console.error('메세지 읽기 실패: ', error);
      throw error;
    }
  },
  groupChatLeave : async (chatRoomNo) => {
    try {
      const { data } = await api.delete(API_ENDPOINTS.CHAT.LEAVE(chatRoomNo));

      return data;
    } catch (error) {
      console.error('채팅방 나가기 실패: ', error);
      throw error;
    }
  },
  getMemberList : async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CHAT.MEMBERLIST, {
        params: { centerNo }, 
      });

      return data;
    } catch (error) {
      console.error('멤버 조회 실패: ', error);
      throw error;
    }
  },
  getChatRoomHistory : async (chatRoomNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CHAT.HISTORY(chatRoomNo));

      return data;
    } catch (error) {
      console.error('이전 메세지 기록 불러오기 실패: ', error);
      throw error;
    }
  }
};