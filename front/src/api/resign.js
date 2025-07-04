import { toast } from 'react-toastify';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const resignService = {
  resignMember: async (mergedData) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.RESIGN.MEMBER, mergedData);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
};
