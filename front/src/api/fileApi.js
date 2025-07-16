import api from '../api/axios';
import { API_ENDPOINTS } from './config';

// Presigned URL 요청
export const getPresignedUrl = async (fileName, fileType, path) => {
  try {
    const { data } = await api.post(API_ENDPOINTS.FILE.PRESIGNED_URL, {
      fileName,
      fileType,
      path,
    });
    return data;
  } catch (error) {
    throw new Error('Presigned URL 요청 실패: ' + error.message);
  }
};

// S3 파일 업로드
export const uploadFileToS3 = async (presignedUrl, file) => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error('파일 업로드에 실패했습니다.');
    }

    return true;
  } catch (error) {
    throw new Error('S3 업로드 실패: ' + error.message);
  }
};

// 게시글 첨부파일 다운로드 URL 요청
export const getBoardDownloadUrl = async (boardNo) => {
  const response = await api.get(API_ENDPOINTS.FILE.BOARD_DOWNLOAD_URL(boardNo));
  return {
    presignedUrl: response.data.presigned_url,
    originalFileName: response.data.original_name,
  };
};

// 휴가 첨부파일 다운로드 URL 요청
export const getVacationDownloadUrl = async (vacationNo) => {
  const response = await api.get(API_ENDPOINTS.FILE.VACATION_DOWNLOAD_URL(vacationNo));
  console.log('서버 원본 응답:', response.data);
  return {
    presignedUrl: response.data.presigned_url,
    originalFileName: response.data.original_name,
  };
};
