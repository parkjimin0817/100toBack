import { get } from 'react-hook-form';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const centerservice = {
  getCenterList: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CENTERS.BASE);
      return data;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
  getCenterDetail: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CENTERS.DETAIL(centerNo));

      const camelData = {
        centerNo: data.center_no,
        centerName: data.center_name,
        centerTel: data.center_tel,
        centerAddress: data.center_address,
        centerType: data.center_type,
      };

      // //cetnerType를 한글로 변환
      // camelData.forEach((data) => {
      //   switch (data.centerType) {
      //     case 'DAYCARE':
      //       data.centerType = '어린이집';
      //       break;
      //     case 'KINDERGARTEN':
      //       data.centerType = '유치원';
      //       break;
      //     case 'CHILD_CENTER':
      //       data.centerType = '지역아동센터';
      //       break;
      //     case 'ETC':
      //       data.centerType = '기타';
      //       break;
      //     default:
      //       data.centerType = '알 수 없음';
      //   }
      // });
      return camelData;
    } catch (error) {
      throw new Error(error, '서버 통신 불량');
    }
  },
};
