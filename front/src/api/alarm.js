import api from './axios';
import { API_ENDPOINTS } from './config';

export const alarmService = {
  getAlarms: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ALARM.GET);
      return data;
    } catch (error) {
      console.error('📛 알람 API 에러:', error.response || error.message || error);
      throw error; // 디버깅용으로 그냥 원본 던짐
    }
  },
};
