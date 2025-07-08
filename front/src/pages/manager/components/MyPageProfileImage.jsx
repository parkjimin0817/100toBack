import React, { useRef } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import defaultImg from '../../../assets/defaultImg.png';
import { getPresignedUrl, uploadFileToS3 } from '../../../api/fileApi';
import { toast } from 'react-toastify';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const infodata = {
  imageUrl: defaultImg,
};

const MyPageProfileImage = ({ isEditMode, memberProfile, memberType, onProfileUpdate }) => {
  const [data, setData] = useState(infodata);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImgClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsUploading(true);

    try {
      // 미리보기 표시
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);

      // S3 업로드 - memberType에 따른 경로 설정
      let presignedUrl, changeName;
      if (memberType === 'MANAGER') {
        const result = await getPresignedUrl(file.name, file.type, 'profile/manager/');
        presignedUrl = result.presignedUrl;
        changeName = result.changeName;
      } else if (memberType === 'TEACHER') {
        const result = await getPresignedUrl(file.name, file.type, 'profile/teacher/');
        presignedUrl = result.presignedUrl;
        changeName = result.changeName;
      } else {
        // 오류
        const result = await getPresignedUrl(file.name, file.type, 'profile/etc');
        presignedUrl = result.presignedUrl;
        changeName = result.changeName;
      }

      await uploadFileToS3(presignedUrl, file);

      // 부모 컴포넌트에 업데이트된 파일명 전달
      if (onProfileUpdate) {
        onProfileUpdate(changeName);
      }

      toast.success('프로필 이미지가 업로드되었습니다.');
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);

      // 에러 타입에 따른 구체적인 메시지
      if (error.message.includes('S3 업로드 실패')) {
        toast.error('파일 업로드에 실패했습니다. 네트워크 연결을 확인해주세요.');
      } else if (error.response?.status === 404) {
        toast.error('업로드 서비스를 찾을 수 없습니다. 관리자에게 문의해주세요.');
      } else if (error.response?.status === 401) {
        toast.error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        toast.error('프로필 이미지 업로드에 실패했습니다.');
      }

      // 업로드 실패 시 원래 이미지로 복원
      setData({ ...data, imageUrl: memberProfile ? `${CLOUDFRONT_URL}/${memberProfile}` : defaultImg });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Wrapper>
      <ImageWrapper onClick={handleImgClick}>
        <Img
          src={memberProfile ? `${CLOUDFRONT_URL}/${memberProfile}` : defaultImg}
          alt="profileImage"
          onClick={handleImgClick}
          $isEditMode={isEditMode}
          $isUploading={isUploading}
        />
        {isEditMode && !isUploading && <Overlay>+</Overlay>}
        {isUploading && <UploadingOverlay>업로드 중...</UploadingOverlay>}
      </ImageWrapper>
      {isEditMode && <HiddenInput type="file" accept="image/*" ref={fileInputRef} onChange={handleImgChange} />}
    </Wrapper>
  );
};

export default MyPageProfileImage;

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const Img = styled.img`
  width: 170px;
  height: 170px;
  opacity: ${(props) => (props.$isUploading ? 0.6 : 1)};
  transition: opacity 0.3s ease;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(68, 68, 68, 0.2);
  color: white;
  font-size: 48px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(68, 68, 68, 0.7);
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
