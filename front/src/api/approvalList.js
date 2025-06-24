import api from './axios';
import { API_ENDPOINTS } from './config';

export const approvalListService = {
  //승인 대기 목록 조회
  getPendingList: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.APPLOVALLIST.PENDINGLIST(centerNo));
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
  //시설장, 교사, 학부모 승인거절
  updateMemberApprovalStatus: async (approvalNo, status, memberNo) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.APPLOVALLIST.DECISIONMEMBER, {
        approval_no: approvalNo,
        status: status,
        member_no: memberNo,
      });
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
  //아동 승인거절
  updateChildApprovalStatus: async (approvalNo, status, childNo) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.APPLOVALLIST.DECISIONCHILD, {
        approval_no: approvalNo,
        status: status,
        child_no: childNo,
      });
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
};
