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
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },

  //교사별 휴가 조회
  getVacationList: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.VACATION.GETLIST(memberNo));

      const camelDataList = data.map((item) => ({
        vacationNo: item.vacation_no,
        type: item.type,
        typeDetail: item.type_detail,
        startDate: item.start_date,
        endDate: item.end_date,
        reason: item.reason,
        attachment: item.attachment,
        status: item.status,
        memberNo: item.member_no,
      }));

      return camelDataList;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },

  //시설별 휴가 조회
  getVacationListAll: async (centerNo, type, page, size) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.VACATION.GETLISTALL(centerNo, type, page, size));

      const camelDataList = data.content.map((item) => ({
        vacationNo: item.vacation_no,
        type: item.type,
        typeDetail: item.type_detail,
        startDate: item.start_date,
        endDate: item.end_date,
        reason: item.reason,
        attachment: item.attachment,
        status: item.status,
        memberNo: item.member_no,
        memberName: item.member_name,
        createDate: item.create_date,
        decisionDate: item.decision_date,
      }));
      return {
        content: camelDataList,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        currentPage: data.number + 1,
      };
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },

  deleteVacation: async (vacationNo) => {
    try {
      await api.delete(API_ENDPOINTS.VACATION.DELETE(vacationNo));
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  approveVacation: async (vacationNo) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.VACATION.APPROVE(vacationNo));

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
        memberName: data.member_name,
        createDate: data.create_date,
        decisionDate: data.decision_date,
      };
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  rejectVacation: async (vacationNo) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.VACATION.REJECT(vacationNo));
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
        memberName: data.member_name,
        createDate: data.create_date,
        decisionDate: data.decision_date,
      };
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
