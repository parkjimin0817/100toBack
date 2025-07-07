import api from '../api/axios';

// 파일 업로드용 presigned url 발급
export const getPresignedUploadUrl = async ({ filename, contentType }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('filename', filename);
    formData.append('contentType', contentType);
    const response = await api.post('/v1/files/upload-url', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (response.data && response.data.url) {
      return response.data.url;
    } else {
      throw new Error('Presigned URL 발급 실패');
    }
  } catch (error) {
    console.error('Presigned URL 발급 실패:', error);
    throw error;
  }
};

export const getUploadUrl = async (fileName, contentType, path = '') => {
  console.log(typeof fileName);
  console.log(typeof contentType);
  console.log(typeof path);
  const response = await api.post('/api/AWS/upload-url', null, {
    params: {
      file_name: fileName,
      content_type: contentType,
      path,
    },
  });
  return {
    presignedUrl: response.data.presigned_url,
    changeName: response.data.change_name,
  };
};

export const completeUpload = async (originalName, changeName, contentType) => {
  const response = await api.post('/v1/files/complete', {
    original_name: originalName,
    change_name: changeName,
    content_type: contentType,
  });
  return response.data;
};

export const uploadFileToS3 = async (presignedUrl, file) => {
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const getDownloadUrl = async (fileId) => {
  const response = await api.get(`/v1/files/${fileId}/download-url`);
  return {
    presignedUrl: response.data.presigned_url,
    originalFileName: response.data.original_file_name,
  };
};

export const getAllFiles = async () => {
  const response = await api.get('/v1/files');
  return response.data;
};
