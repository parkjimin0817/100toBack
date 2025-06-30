import api from './axios';
import { API_ENDPOINTS } from './config';

export const vacationService = {
  //휴가 폼 제출
  requestVacation: async (memberNo, formData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.VACATION.REQUEST(memberNo), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const camelData = {
        vacationNo: data.vacation_no,
        type: data.type,
        typeDetail: data.type_detail,
        startDate: data.start_date,
        endDate: data.end_date,
        reason: data.reason,
        attachment: data.attachment,
        status: data.status,
        memberNo: data.member_no,
      };

      console.log(camelData);
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
