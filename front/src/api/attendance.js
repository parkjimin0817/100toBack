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
      console.log(camelData);
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
  //교사 근태 달별 목록 불러오기 (시설장)
  teacherAttendance: async (memberNo, centerNo, year, month) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ATTENDANCE.TEACHERATTENDANCE(memberNo, centerNo, year, month));

      const camelDataList = data.map((a) => ({
        attendanceNo: a.attendance_no,
        attendanceDate: a.attendance_date,
        inTime: a.in_time,
        outTime: a.out_time,
        memberNo: a.member_no,
        status: a.status,
      }));

      return camelDataList;
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },
  //시설장이 교사 근태 수정하기
  updateTeacherAttendance: async (attendanceNo, data) => {
    try {
      await api.patch(API_ENDPOINTS.ATTENDANCE.UPDATETEACHERATTENDANCE(attendanceNo), data);
    } catch (error) {
      throw new Error('서버 통신 불량: ' + error.message);
    }
  },

  //해당 반 출결 정보 가져오기
  classAttendance: async (class_no, create_date) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.ATTENDANCE.CHILDATTENDANCE, { class_no, create_date });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '해당 반의 정보를 가져오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버 통신 불량' + error.message);
    }
  },

  //해당 반 출결 상태 수정하기
  updateChildAttendance: async (child_no, class_no, create_date, status) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.ATTENDANCE.UPDATECHILDATTENDANCE, {
        child_no,
        class_no,
        create_date,
        status,
      });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '출석 상태 수정을 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
