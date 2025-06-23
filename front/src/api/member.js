import api from './axios';
import { API_ENDPOINTS } from './config';

export const memberService = {
  //아이디 중복체크
  checkId: async (memberId) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.CHECKID(memberId));
      return data; //true면 중복, false면 사용 가능
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },

  //회원가입
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

      const formData = new FormData();

      //멤버 공통 정보
      formData.append('member_name', mergedData.member_name);
      formData.append('member_id', mergedData.member_id);
      formData.append('member_pwd', mergedData.member_pwd);
      formData.append('member_phone', mergedData.member_phone);
      formData.append('member_birth', mergedData.member_birth); // yyyy-MM-dd
      formData.append('member_type', mergedData.member_type);
      formData.append('address', mergedData.address); // 빠져있다면 추가 필요

      if (mergedData.member_profile instanceof File) {
        formData.append('member_profile', mergedData.member_profile);
      }

      if (mergedData.member_type === 'TEACHER') {
        formData.append('center_no', mergedData.center_no);
      }
      if (mergedData.member_type === 'PARENT') {
        formData.append('center_no', mergedData.center_no);
        formData.append('child_name', mergedData.child_name);
        formData.append('child_RNo', mergedData.child_RNo);
        if (mergedData.child_profile instanceof File) {
          formData.append('child_profile', mergedData.child_profile);
        }
        formData.append('father_name', mergedData.father_name);
        formData.append('father_phone', mergedData.father_phone);
        formData.append('mother_name', mergedData.mother_name);
        formData.append('mother_phone', mergedData.mother_phone);
      }

      if (mergedData.member_type === 'MANAGER') {
        formData.append('center_no', mergedData.center_no);
        formData.append('child_name', mergedData.child_name);
        formData.append('child_RNo', mergedData.child_RNo);
      }

      const { data } = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    } catch (error) {
      console.error('회원가입 요청 실패:', error);
      throw new Error('서버 통신 불량');
    }
  },

  //로그인
  login: async (memberId, memberPwd) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.MEMBERS.LOGIN, { memberId, memberPwd });

      const camelData = {
        memberNo: data.member_no,
        memberName: data.member_name,
        memberId: data.member_id,
        memberType: data.member_type,
        centerNo: data.center_no,
      };

      return camelData;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '로그인에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
};
