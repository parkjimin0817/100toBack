import { create } from 'zustand';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const useSchedule = {
  //날짜에 맞게 데이터를 찾아옴
  searchDate: async (date) => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.SCHEDULES.FORDATE(date.center_no, date.class_no, date.member_no, date.create_date, date.type)
      );

      return data[0];
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '해당 날짜의 데이터가 없습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
};
