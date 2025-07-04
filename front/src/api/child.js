import { toast } from 'react-toastify';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const childService = {
  // 학부모 자녀 목록 조회
  getParentChildList: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CHILDS.PARENTCHILDLIST(memberNo));
      return data;
    } catch (error) {
      toast.error('자녀 목록을 불러오는 데 실패했습니다.');
      throw error;
    }
  },

  // 자녀 정보 조회
  getChildInfo: async (childId) => {
    try {
      const { data } = await api.get(`${API_ENDPOINTS.CHILDS.GET}/${childId}`);
      return data;
    } catch (error) {
      toast.error('자녀 정보를 불러오는 데 실패했습니다.');
      throw error;
    }
  },
  // 자녀 등록
  createChild: async (mergedData) => {
    console.log('Merged Data:', mergedData);
    try {
      const formData = new FormData();

      formData.append('member_no', mergedData.memberNo);
      formData.append('center_no', mergedData.centerNo);
      formData.append('child_name', mergedData.childName);
      formData.append('child_resident_no', mergedData.childResidentNo);
      formData.append('f_parents_name', mergedData.fParentName);
      formData.append('f_parents_phone', mergedData.fParentPhone);
      formData.append('m_parents_name', mergedData.mParentName);
      formData.append('m_parents_phone', mergedData.mParentPhone);
      if (mergedData.childProfile instanceof FileList || Array.isArray(mergedData.childProfile)) {
        formData.append('child_profile', mergedData.childProfile[0]);
      } else if (mergedData.childProfile instanceof File) {
        formData.append('child_profile', mergedData.childProfile);
      }

      const { data } = await api.post(API_ENDPOINTS.CHILDS.ADD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      toast.error('자녀 등록에 실패했습니다.');
      throw error;
    }
  },

  //자녀 연결
  linkChild: async (mergedData) => {
    try {
      const dtoData = {
        member_no: mergedData.memberNo,
        child_name: mergedData.childName,
        child_resident_no: mergedData.childResidentNo,
      };
      const { data } = await api.post(API_ENDPOINTS.CHILDS.LINK, dtoData);
      return data;
    } catch (error) {
      toast.error('자녀 연결에 실패했습니다.');
      throw error;
    }
  },

  //학부모 연락처 조회
  getParentPhoneNumber: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CHILDS.PARENTPHONENUMBER(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },
};
