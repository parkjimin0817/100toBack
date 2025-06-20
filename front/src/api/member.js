import api from './axios';
import { API_ENDPOINTS } from './config';

export const memberService = {
  //아이디 중복체크
  checkId: async (memberId) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.CHECKID(memberId));
      return data; //true면 중복, false면 사용 가능
    } catch (error) {
      throw new Error('서버 통신 불량');
    }
  },
};
