import axios from 'axios';
import api from './axios';
import { API_ENDPOINTS } from './config';
import { getPresignedUrl, uploadFileToS3 } from './fileApi';

export const vacationService = {
  //휴가 폼 제출
  requestVacation: async (request, attachment) => {
    try {
      let fileUrl = null;

      if (attachment instanceof File) {
        const path = 'vacation/';

        const presignedData = await getPresignedUrl(attachment.name, attachment.type, path);

        await uploadFileToS3(presignedData.presigned_url, attachment);

        fileUrl = presignedData.change_name;
      }

      if (fileUrl) {
        request.attachment_origin = attachment.name;
      }

      request.attachment = fileUrl;

      const { data } = await api.post(API_ENDPOINTS.VACATION.REQUEST, request);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error('서버 오류가 발생했습니다.');
      }
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
        attachmentOrigin: item.attachment_origin,
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
        attachmentOrigin: item.attachment_origin,
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
