import api from './axios';
import { API_ENDPOINTS } from './config';
import { getPresignedUrl, uploadFileToS3 } from './fileApi';

export const boardService = {
  // 게시글 작성
  createBoard: async (boardData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.BOARDS.ADD, boardData);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 생성에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  typeBoardList: async (type, centerNo, page) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.BOARDS.TYPE(type, centerNo, page));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 목록 조회에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  boardDetail: async (boardNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.BOARDS.DETAIL(boardNo));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 상세 조회에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  boardDelete: async (boardNo) => {
    try {
      const { data } = await api.delete(API_ENDPOINTS.BOARDS.DELETE(boardNo));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 상세 조회에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
  getRecent3Boards: async (centerNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.BOARDS.GETRECENT3(centerNo));
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
  uploadDoc: async (memberNo, title, file) => {
    try {
      let fileUrl = null;

      if (file instanceof File) {
        const path = 'board/private_doc/';

        const presignedData = await getPresignedUrl(file.name, file.type, path);

        await uploadFileToS3(presignedData.presigned_url, file);

        fileUrl = presignedData.change_name;
      }

      const request = {
        memberNo,
        title,
        fileUrl,
      };

      const { data } = await api.post(API_ENDPOINTS.BOARDS.UPLOADDOC, request);

      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '파일 업로드에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버 통신 실패');
    }
  },
  getDocumentList: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.BOARDS.GETDOCLIST);
      return data;
    } catch (error) {
      throw new Error('서버 통신 불량' + error.message);
    }
  },
};
