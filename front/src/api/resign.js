import { toast } from 'react-toastify';
import api from './axios';
import { API_ENDPOINTS } from './config';
import { data } from 'react-router-dom';

export const resignService = {
  resignMember: async (mergedData) => {
    try {
      console.log('mergedData', mergedData);
      const { data } = await api.patch(API_ENDPOINTS.RESIGN.MEMBER, mergedData);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
};
