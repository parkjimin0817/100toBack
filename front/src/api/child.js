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
};
