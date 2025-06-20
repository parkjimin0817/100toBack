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

  signUp: async (mergedData) => {
    try {
      let endpoint;

      switch (mergedData.member_type) {
        case 'TEACHER':
          endpoint = API_ENDPOINTS.MEMBERS.TEACHERSIGNUP;
          break;
        case 'PARENT':
          endpoint = API_ENDPOINTS.MEMBERS.PARENTSIGNUP;
          break;
        case 'MANAGER':
          endpoint = API_ENDPOINTS.MEMBERS.MANAGERSIGNUP;
          break;
        default:
          throw new Error('알 수 없는 사용자 유형입니다.');
      }

      const { data } = await api.post(endpoint, mergedData);
      return data; //memberNo
    } catch (error) {
      console.error('❌ 회원가입 요청 실패:', error); // 추가!
      console.error('❌ 응답 내용:', error.response);
      throw new Error('서버 통신 불량');
    }
  },
};
