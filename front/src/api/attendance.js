import api from './axios';
import { API_ENDPOINTS } from './config';

export const attendanceService = {
  //교사 근태 목록 불러오기 (시설장)
  teacherAttendance: async (member_no) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ATTENDANCE.TEACHERATTENDANCE(member_no));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },
};
