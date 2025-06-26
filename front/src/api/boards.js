import api from "./axios";
import { API_ENDPOINTS } from './config';

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

  typeBoardList: async (type, page) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.BOARDS.TYPE(type, page));
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
  }
}