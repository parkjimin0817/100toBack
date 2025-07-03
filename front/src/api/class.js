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
  getAttendanceRate: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CLASSROOM.GETRATE(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  getHealthLogProgress: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CLASSROOM.GETHEALTHPROGRESS(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
