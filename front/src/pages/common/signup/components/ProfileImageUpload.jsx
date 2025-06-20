import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const ProfileImageUpload = ({ label }) => {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('JPG, JPEG, PNG 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 200 * 1024) {
      alert('파일 크기는 200KB 이하만 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ImageUploadWrapper>
      <Label>{label}</Label>
      <PreviewRow>
        <PreviewImage src={preview || '/src/assets/defaultimg.png'} alt="프로필 미리보기" />
        <UploadButton type="button" onClick={() => fileInputRef.current.click()}>
          파일 선택
        </UploadButton>
        <HiddenInput
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </PreviewRow>
      <InfoText>사이즈: 150 x 150 픽셀, 파일 형식: JPG, JPEG, PNG, 용량: 200KB 이하</InfoText>
    </ImageUploadWrapper>
  );
};

export default ProfileImageUpload;

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const PreviewRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const UploadButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  height: 40px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[800]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const InfoText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  line-height: 1.4;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
  text-align: left;
`;
