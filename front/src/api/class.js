import api from './axios';
import { API_ENDPOINTS } from './config';

export const classService = {
  createClass: async ({ className, capacity, teacherNo, classColor, centerNo, classImage }) => {
    try {
      const formData = new FormData();

      formData.append('className', className);
      formData.append('capacity', capacity);
      formData.append('teacherNo', teacherNo);
      formData.append('classColor', classColor);
      formData.append('centerNo', centerNo);
      if (classImage) {
        formData.append('classImage', classImage);
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
};
