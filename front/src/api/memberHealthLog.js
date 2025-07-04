import { toast } from 'react-toastify';
import api from './axios';
import { API_ENDPOINTS } from './config';
import { he } from 'date-fns/locale';

export const memberHealthLogService = {
  // 건강 기록 생성
  createHealthLog: async (healthData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.MEMBER_HEALTH.CREATE, {
        member_no: healthData.memberNo,
        temperature: healthData.temperature,
        stress: healthData.stress,
        sleep: healthData.sleep,
        symptoms: healthData.symptoms,
      });
      return data;
    } catch (error) {
      toast.error('건강 기록 생성에 실패했습니다.');
      throw new Error(error, '서버 통신 불량');
    }
  },
  // 건강 기록 리스트
  getHealthLogList: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBER_HEALTH.LIST(memberNo));
      return data;
    } catch (error) {
      toast.error('건강 기록 목록 조회에 실패했습니다.');
      throw new Error(error, '서버 통신 불량');
    }
  },
  // 건강 기록 상세 조회
  getHealthLogDetail: async (memberHealthLogNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBER_HEALTH.DETAIL(memberHealthLogNo));
      return data;
    } catch (error) {
      toast.error('건강 기록 상세 조회에 실패했습니다.');
      throw new Error(error, '서버 통신 불량');
    }
  },
  // 건강 기록 수정
  updateHealthLog: async (mergedData) => {
    try {
      const formData = new FormData();
      formData.append('member_health_log_no', mergedData.healthLogNo);
      formData.append('member_no', mergedData.memberNo);
      formData.append('temperature', mergedData.temperature);
      formData.append('stress', mergedData.stress);
      formData.append('sleep', mergedData.sleep);
      formData.append('symptoms', mergedData.symptoms);

      const { data } = await api.patch(API_ENDPOINTS.MEMBER_HEALTH.EDIT, formData);
      return data;
    } catch (error) {
      toast.error('건강 기록 수정에 실패했습니다.');
      throw new Error(error, '서버 통신 불량');
    }
  },
  // 건강 기록 삭제
  deleteHealthLog: async (memberHealthLogNo) => {
    try {
      const { data } = await api.delete(API_ENDPOINTS.MEMBER_HEALTH.DELETE, {
        params: { memberHealthLogNo },
      });
      return data;
    } catch (error) {
      toast.error('건강 기록 삭제에 실패했습니다.');
      throw new Error(error, '서버 통신 불량');
    }
  },
  getAvg: async (memberNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MEMBER_HEALTH.GETAVG(memberNo));
      return data;
    } catch (err) {
      throw new Error('서버 통신 불량' + err.message);
    }
  },
};
