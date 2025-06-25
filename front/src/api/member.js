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
      formData.append('member.member_name', mergedData.member_name);
      formData.append('member.member_id', mergedData.member_id);
      formData.append('member.member_pwd', mergedData.member_pwd);
      formData.append('member.member_phone', mergedData.member_phone);
      formData.append('member.member_birth', mergedData.member_birth); // yyyy-MM-dd
      formData.append('member.member_type', mergedData.member_type);
      formData.append('member.address', mergedData.address);
      if (mergedData.member_profile instanceof FileList || Array.isArray(mergedData.member_profile)) {
        formData.append('member.member_profile', mergedData.member_profile[0]);
      } else if (mergedData.member_profile instanceof File) {
        formData.append('member.member_profile', mergedData.member_profile);
      }

      //교사 추가 정보
      if (mergedData.member_type === 'TEACHER') {
        formData.append('member.center_no', mergedData.center_no);
      }

      //학부모 추가 정보
      if (mergedData.member_type === 'PARENT') {
        formData.append('member.center_no', mergedData.center_no);
        formData.append('child.center_no', mergedData.center_no);
        formData.append('child.child_name', mergedData.child_name);
        formData.append('child.child_resident_no', mergedData.child_RNo);
        formData.append('child.f_parents_name', mergedData.father_name);
        formData.append('child.f_parents_phone', mergedData.father_phone);
        formData.append('child.m_parents_name', mergedData.mother_name);
        formData.append('child.m_parents_phone', mergedData.mother_phone);
        if (mergedData.child_profile instanceof FileList || Array.isArray(mergedData.child_profile)) {
          formData.append('child.child_profile', mergedData.child_profile[0]);
        } else if (mergedData.child_profile instanceof File) {
          formData.append('child.child_profile', mergedData.child_profile);
        }
      }

      //시설장 정보 정보
      if (mergedData.member_type === 'MANAGER') {
        formData.append('center.center_name', mergedData.center_name);
        formData.append('center.center_address', mergedData.center_address);
        formData.append('center.center_type', mergedData.center_type);
        formData.append('center.center_tel', mergedData.center_tel);
      }

      const { data } = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '회원가입에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
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

  //교사 목록 불러오기
  teacherlist: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.TEACHERLIST(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },

  //마이페이지
  Mypage: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.MYPAGE(memberNo));

      const camelData = {
        memberName: data.member_name,
        memberBirth: data.member_birth,
        memberType: data.member_type,
        centerName: data.center_name,
        centerTel: data.center_tel,
        centerAddress: data.center_address,
        centerType: data.center_type,
      };

      return camelData;
    } catch (error) {
      const errorMessage = error.response?.data?.message || '정보를 불러오는데 실패했습니다.';
      throw new Error(errorMessage);
    }
  },

  //아이디 찾기
  searchId: async (memberName, memberPhone) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.SEARCHID(member_name, member_birth));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || '아이디 찾기에 실패했습니다.';
      throw new Error(errorMessage);
    }
  },
};
