import DailySchedule from '../pages/teacher/DailySchedule';
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
  // 오늘 스케줄 목록 조회
  getTodayScheduleList: async (centerNo, memberNo, today) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.SCHEDULES.TODAYLISTS, {
        params: { centerNo, memberNo, today },
      });
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
  // 스케줄 수정
  updateSchedule: async (mergedData) => {
    try {
      const formData = new FormData();
      formData.append('schedule_no', mergedData.scheduleNo);
      formData.append('title', mergedData.title);
      formData.append('description', mergedData.description);
      formData.append('start_time', mergedData.startTime);
      formData.append('end_time', mergedData.endTime);

      const { data } = await api.patch(API_ENDPOINTS.SCHEDULES.EDIT, formData);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
  // 스케줄 삭제
  deleteSchedule: async (scheduleNo) => {
    try {
      const { data } = await api.delete(`${API_ENDPOINTS.SCHEDULES.DELETE}`, {
        params: { scheduleNo },
      });
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },

  //일과표 생성
  dailyCreate: async (formData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.SCHEDULES.DAILYSCHEDULE, formData);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },

  //일과표 조회
  dailyScheduleSelect: async (centerNo, memberNo, classNo, scheduleDate) => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.SCHEDULES.DAILYSCHEDULELIST(centerNo, memberNo, classNo, scheduleDate)
      );
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },

  //일과표 등록(수정)
  dailyUpdate: async (updateData) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.SCHEDULES.UPDATEDAILY, updateData);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },

  //일과표 삭제
  dailyDelete: async (scheduleNo) => {
    try {
      const { data } = await api.delete(API_ENDPOINTS.SCHEDULES.DELETEDAILY(scheduleNo));
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
};
