import api from '../api/axios';
import { API_ENDPOINTS } from './config';

export const getPresignedUrl = async (fileName, contentType, path) => {
  const response = await api.post(API_ENDPOINTS.FILE.PRESIGNED_URL, {
    fileName: fileName,
    fileType: contentType,
    path: path,
  });
  return {
    presignedUrl: response.data.presigned_url,
    changeName: response.data.change_name,
  };
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
