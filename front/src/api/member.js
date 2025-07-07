import { toast } from 'react-toastify';
import api from './axios';
import { API_ENDPOINTS } from './config';

// Presigned URL 요청
export const getPresignedUrl = async (fileName, fileType) => {
  try {
    const { data } = await api.post(API_ENDPOINTS.FILE.PRESIGNED_URL, {
      fileName,
      fileType,
      path: '',
    });
    return data;
  } catch (error) {
    throw new Error('Presigned URL 요청 실패: ' + error.message);
  }
};

// S3 파일 업로드
export const uploadFileToS3 = async (presignedUrl, file) => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error('파일 업로드에 실패했습니다.');
    }

    return true;
  } catch (error) {
    throw new Error('S3 업로드 실패: ' + error.message);
  }
};

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

      // 프로필 이미지 S3 업로드 처리
      let profileImageUrl = null;
      if (mergedData.member_profile) {
        const file =
          mergedData.member_profile instanceof FileList || Array.isArray(mergedData.member_profile)
            ? mergedData.member_profile[0]
            : mergedData.member_profile;

        if (file instanceof File) {
          // Presigned URL 요청
          const presignedData = await getPresignedUrl(file.name, file.type);

          // S3에 파일 업로드
          await uploadFileToS3(presignedData.presigned_url, file);

          // 업로드된 파일 URL 저장
          profileImageUrl = presignedData.change_name;
        }
      }

      // 자식 프로필 이미지 S3 업로드 처리 (학부모인 경우)
      let childProfileImageUrl = null;
      if (mergedData.member_type === 'PARENT' && mergedData.child_profile) {
        const childFile =
          mergedData.child_profile instanceof FileList || Array.isArray(mergedData.child_profile)
            ? mergedData.child_profile[0]
            : mergedData.child_profile;

        if (childFile instanceof File) {
          // Presigned URL 요청
          const presignedData = await getPresignedUrl(childFile.name, childFile.type);

          // S3에 파일 업로드
          await uploadFileToS3(presignedData.presigned_url, childFile);

          // 업로드된 파일 URL 저장
          childProfileImageUrl = presignedData.presigned_url;
        }
      }

      const formData = new FormData();

      //멤버 공통 정보
      formData.append('member.member_name', mergedData.member_name);
      formData.append('member.member_id', mergedData.member_id);
      formData.append('member.member_pwd', mergedData.member_pwd);
      formData.append('member.member_phone', mergedData.member_phone);
      formData.append('member.member_birth', mergedData.member_birth);
      formData.append('member.member_type', mergedData.member_type);
      formData.append('member.address', mergedData.address);

      // S3에 업로드된 프로필 이미지 URL 추가
      if (profileImageUrl) {
        formData.append('member.member_profile', profileImageUrl);
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

        // S3에 업로드된 자식 프로필 이미지 URL 추가
        if (childProfileImageUrl) {
          formData.append('child.child_profile', childProfileImageUrl);
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
        accessToken: data.accessToken,
        memberNo: data.member_no,
        memberName: data.member_name,
        memberId: data.member_id,
        memberBirth: data.member_birth,
        memberPhone: data.member_phone,
        memberType: data.member_type,
        centerNo: data.center_no,
        classNo: data.class_no,
        centerTel: data.center_tel,
      };

      localStorage.setItem('accessToken', camelData.accessToken);

      return camelData;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '로그인에 실패했습니다.';
        toast.error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
  //비밀번호 찾기
  searchPwd: async (member_id) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.MEMBERS.PWDSEARCHID, { member_id });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '비밀번호 찾기에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  //전화번호 인증 요청
  phoneAccess: async (phone_number) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.MEMBERS.PHONEACCESS, { phone_number });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '인증 번호 전송 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  //비밀번호 변경
  pwdUpdate: async (member_id, member_pwd) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.MEMBERS.PWDUPDATE, { member_id, member_pwd });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '비밀번호 변경 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
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
  //마이페이지 수정
  // MypageUpdate: async (memberNo, mergedData) => {

  // },

  //아이디 찾기
  searchId: async (member_name, member_birth) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.MEMBERS.SEARCHID, { member_name, member_birth });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '아이디 찾기에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  //교사 상세 목록 불러오기
  teacherDetailList: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.TEACHER_DETAIL_LIST(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },
  //교사 간단 목록 불러오기
  teacherlist: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.TEACHERLIST(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },

  //교사 개별 상세 불러오기 (memberNo)
  getTeacherDetail: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.TEACHER_DETAIL(memberNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },

  //교사 소개 목록 불러오기
  teacherIntroList: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBERS.TEACHER_INTRO_LIST(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },
};
