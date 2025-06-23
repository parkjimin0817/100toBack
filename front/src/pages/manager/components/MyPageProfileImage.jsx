import React, { useRef } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import defaultImg from '../../../assets/defaultImg.png';

const infodata = {
  imageUrl: defaultImg,
};

const MyPageProfileImage = ({ isEditMode }) => {
  const [data, setData] = useState(infodata);
  const fileInputRef = useRef(null);

  const handleImgClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <ImageWrapper onClick={handleImgClick}>
        <Img src={data.imageUrl} alt="profileImage" onClick={handleImgClick} $isEditMode={isEditMode} />
        {isEditMode && <Overlay>+</Overlay>}
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
