import React, { useRef, useState, useEffect } from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';
import styled from 'styled-components';
import theme from '../../styles/theme';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ImageInputBlock = ({ id, value, onChange, blockDelete }) => {
  const [preview, setPreview] = useState(value);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // 이미지가 바뀌면 미리보기 경로 갱신
  useEffect(() => {
    if (value && typeof value === 'object') {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  // 파일 처리 (드래그든 클릭이든)
  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onChange(id, file);
    }
  };

  // input 클릭
  const handleClickChange = (e) => {
    e.stopPropagation(); // button 누를 때 부모 div의 onClick 막기
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    processFile(file);
  };

  return (
    <div
      onClick={preview ? null : handleClickChange}
      onDragEnter={preview ? null : handleDrag}
      onDragLeave={preview ? null : handleDrag}
      onDragOver={preview ? null : handleDrag}
      onDrop={preview ? null : handleDrop}
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        margin: '2rem auto',
        background: dragActive ? '#f9f9f9' : 'white',
        cursor: preview ? '' : 'pointer',
        transition: 'background 0.2s ease-in-out',
      }}
    >
      <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      {preview ? (
        <div style={{ position: 'relative' }}>
          <img
            src={preview}
            alt="미리보기"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              marginBottom: '1rem',
            }}
          />
        </div>
      ) : (
        <>
          <MdOutlineUploadFile
            style={{
              width: '60px',
              height: '60px',
              marginBottom: '1rem',
            }}
          />
          <p>이미지를 선택해주세요</p>
        </>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ImageButton type="button" onClick={handleClickChange} $color={theme.colors.green}>
          {preview ? '이미지 변경' : '이미지 업로드'}
        </ImageButton>

        <ImageButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            blockDelete(id);
          }}
          style={{ marginLeft: '1rem' }}
          $color={theme.colors.orange}
        >
          삭제
        </ImageButton>
      </div>
    </div>
  );
};

export default ImageInputBlock;

const ImageButton = styled.button`
  background-color: ${({ $color }) => $color};
  color: white;
  padding: 10px;
  border-radius: 5px;
`;
