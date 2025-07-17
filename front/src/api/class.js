import api from './axios';
import { API_ENDPOINTS } from './config';
import { getPresignedUrl, uploadFileToS3 } from './fileApi';
import { toast } from 'react-toastify';

export const classService = {
  createClass: async ({ className, capacity, teacherNo, classColor, centerNo, classImage }) => {
    try {
      let uploadedImageUrl = null;

      // 반 이미지가 있으면 S3에 업로드
      if (classImage instanceof File) {
        const presignedData = await getPresignedUrl(classImage.name, classImage.type, 'profile/class/');
        await uploadFileToS3(presignedData.presigned_url, classImage);
        uploadedImageUrl = presignedData.change_name; // S3 경로 문자열
      }

      const formData = new FormData();

      formData.append('class_name', className);
      formData.append('capacity', capacity);
      formData.append('member_no', teacherNo);
      formData.append('color', classColor);
      formData.append('center_no', centerNo);

      // S3 업로드된 URL을 문자열로 전달
      if (uploadedImageUrl) {
        formData.append('class_image', uploadedImageUrl);
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
  updateClass: async (classNo, classRoomData) => {
    try {
      const { data } = await api.put(API_ENDPOINTS.CLASSROOM.UPDATE(classNo), classRoomData);
      return data;
    } catch (error) {
      console.error('반 수정 실패: ', error);
      throw error;
    }
  },

  deleteClass: async (classNo) => {
    try {
      const { data } = await api.delete(API_ENDPOINTS.CLASSROOM.DELETE(classNo));

      return data;
    } catch (error) {
      console.error('반 수정 실패: ', error);
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
  getAttendanceClassRate: async (classNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CLASSROOM.GETCLASSRATE(classNo));
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
  getClassHealthLogProgress: async (classNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CLASSROOM.GETCLASSHEALTHPROGRESS(classNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
