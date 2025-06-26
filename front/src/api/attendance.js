import api from './axios';
import { API_ENDPOINTS } from './config';

export const attendanceService = {
  //교사 금일 출퇴근 정보 불러오기 (for 헤더 출퇴근 버튼)
  getTodayAttendance: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ATTENDANCE.TODAYATTENDANCE(memberNo));

      const camelData = {
        attendanceNo: data.attendance_no,
        inTime: data.in_time,
        outTime: data.out_time,
        memberNo: data.member_no,
      };
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  //교사 출근 시간 기록하기
  workIn: async (memberNo) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.ATTENDANCE.WORKIN(memberNo));

      const camelData = {
        attendanceNo: data.attendance_no,
        inTime: data.in_time,
        outTime: data.out_time,
        memberNo: data.member_no,
      };
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  //교사 퇴근 기록
  workOut: async (memberNo) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.ATTENDANCE.WORKOUT(memberNo));

      const camelData = {
        attendanceNo: data.attendance_no,
        inTime: data.in_time,
        outTime: data.out_time,
        memberNo: data.member_no,
      };

      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  //교사 근태 목록 불러오기 (시설장)
  teacherAttendance: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ATTENDANCE.TEACHERATTENDANCE(memberNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },
};
