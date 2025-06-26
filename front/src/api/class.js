import api from './axios';
import { API_ENDPOINTS } from './config';

export const classService = {
  createClass: async ({ className, capacity, teacherNo, classColor, centerNo, classImage }) => {
    try {
      const formData = new FormData();

      formData.append('class_name', className);
      formData.append('capacity', capacity);
      formData.append('member_no', teacherNo);
      formData.append('color', classColor);
      formData.append('center_no', centerNo);
      if (classImage) {
        formData.append('class_image', classImage);
      }

      const { data } = await api.post(API_ENDPOINTS.CLASSROOM.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('반 생성 실패: ', error);
      throw error;
    }
  },

  //시설별 반 목록
  classroomlist: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CLASSROOM.CLASSROOMLIST(centerNo));
      return data; // 시설별 반 목록
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },

  //해당 반 출결 정보 가져오기
  classAttendance: async (classNo, selectedDate) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ATTENDANCE.CHILDATTENDANCE, { classNo, selectedDate });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '해당 반의 정보를 가져오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
