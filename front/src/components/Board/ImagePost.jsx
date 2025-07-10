import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/img/img.png';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ImagePost = ({ postData, onClick }) => {
  const formatDate = (isoDate) => {
    if (!isoDate) return '';

    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <ImagePostContainer onClick={onClick}>
      <ImageContent src={postData.attachment ? `${CLOUDFRONT_URL}/${postData.attachment}` : defaultImg} />
      <Title>{postData.title}</Title>
      <DescriptionBox>
        <Description>{formatDate(postData.createDate)}</Description>
        <Description>조회수 : {postData.views}</Description>
      </DescriptionBox>
    </ImagePostContainer>
  );
};

const ImagePostContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;
const ImageContent = styled.img`
  width: 300px;
  height: 230px;
`;
const Title = styled.h2``;
const DescriptionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;
const Description = styled.p``;

export default ImagePost;
