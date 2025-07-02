import api from './axios';
import { API_ENDPOINTS } from './config';

export const holidayService = {
  //공휴일 불러오기
  getHoliday: async (year, month) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.HOLIDAY.GET(year, month));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
