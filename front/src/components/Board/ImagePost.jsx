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
      <OutlineImage>
        <ImageContent
          src={postData.boardContents ? `${CLOUDFRONT_URL}/${postData.boardContents[0].contentFile}` : defaultImg}
        />
      </OutlineImage>

      <Title>{postData.title}</Title>
      <DescriptionBox>
        <Description>{formatDate(postData.createDate)}</Description>
        <Description>조회수 : {postData.views}</Description>
      </DescriptionBox>
    </ImagePostContainer>
  );
};

const OutlineImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 230px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const ImagePostContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;
const ImageContent = styled.img`
  width: 100%;
  height: 100%;
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
