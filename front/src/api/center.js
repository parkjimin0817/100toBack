import api from './axios';
import { API_ENDPOINTS } from './config';

export const centerservice = {
  getCenterList: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CENTERS.BASE);
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량');
    }
  },
};
