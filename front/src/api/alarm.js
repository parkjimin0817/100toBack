import api from './axios';
import { API_ENDPOINTS } from './config';

export const alarmService = {
  getAlarms: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ALARM.GET);
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량', error);
    }
  },
  readAlarm: async (alarmNo) => {
    try {
      await api.patch(API_ENDPOINTS.ALARM.READ(alarmNo));
    } catch (error) {
      throw new Error('서버 통신 불량', error);
    }
  },
};
