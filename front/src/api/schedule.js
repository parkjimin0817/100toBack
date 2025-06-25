import api from './axios';
import { API_ENDPOINTS } from './config';

export const useScheduleService = {
  // 스케줄 생성
  createSchedule: async (mergedData) => {
    try {
      const formData = new FormData();
      formData.append('center_no', mergedData.centerNo);
      formData.append('member_no', mergedData.memberNo);
      formData.append('title', mergedData.title);
      formData.append('description', mergedData.description);
      formData.append('schedule_date', mergedData.selectedDate);
      formData.append('create_date', mergedData.createDate);
      formData.append('start_time', mergedData.startTime);
      formData.append('end_time', mergedData.endTime);
      formData.append('type', mergedData.type);

      const { data } = await api.post(API_ENDPOINTS.SCHEDULES.CREATE, formData);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },

  // 스케줄 목록 조회
  getScheduleList: async (centerNo, memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.SCHEDULES.LISTS, {
        params: { centerNo, memberNo },
      });
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
};
