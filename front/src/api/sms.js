import { toast } from 'react-toastify';
import api from './axios';
import { API_ENDPOINTS } from './config';
import { getPresignedUrl, uploadFileToS3 } from './fileApi';

export const smsService = {
  //전화번호 인증 요청
  authCall: async (formdata) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.SMS.AUTHCALL, formdata);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '인증 번호 전송 실패하였습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  //인증번호 보내서 허가요청
  phoneAccess: async (auth) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.SMS.AUTHPERMISSION, auth);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '인증 번호를 잘못입력하셨습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  //회원가입 시 본인확인 용 인증번호
  signUpAuth: async (member_phone) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.SMS.SIGNUPAUTHNUMBER, { member_phone });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '인증 번호를 잘못입력하셨습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
};
