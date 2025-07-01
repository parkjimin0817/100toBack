import api from './axios';
import { API_ENDPOINTS } from './config';

export const leaveService = {
  //교사 연차 정보 조회
  getLeave: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.LEAVE.GETLEAVE(memberNo));

      const camelData = {
        leaveNo: data.leave_no,
        leaveDays: data.leave_days,
        usedLeave: data.used_leave,
        remainLeave: data.remain_leave,
        memberNo: data.member_no,
      };
      return camelData;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
