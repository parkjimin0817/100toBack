import React from 'react';
import styled from 'styled-components';
import { IoDownloadOutline } from 'react-icons/io5';
import defaultImg from '../../assets/img/img.png';

import "./EditorComponent/tiptap-templates/editor.scss";
import "./EditorComponent/tiptap-node/list-node.scss";
import "./EditorComponent/tiptap-node/paragraph-node.scss";

const BoardDetail = ({ category, post }) => {
  const formatKoreanDate = (isoString) => {
    if (!isoString) return '';

    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <DetailContainer>
      {/* 게시글 타이틀 */}
      <PostTitle>{post.title}</PostTitle>
      <PostDescriptionBox>
        <PostDescription>{formatKoreanDate(post.createDate)}</PostDescription>
        <PostDescriptionBox>
          {(category === 'NOTE' || category === 'LETTERHOME') && (
            <>
              <PostLabel>반 이름</PostLabel>
              <PostDescription>{post.className}</PostDescription>
            </>
          )}
          <PostLabel>작성자</PostLabel>
          <PostDescription>{post.memberName}</PostDescription>
        </PostDescriptionBox>
      </PostDescriptionBox>
      {/* 게시글 내용 */}
      <PostContentList  id='editorBox'>
        {post.boardContents &&
          post.boardContents.map((content, index) => (
            <PostContentBox key={index}>
              {content.type === 'TEXT' ? (
                <div className={"tiptap ProseMirror"} dangerouslySetInnerHTML={{ __html: content.contentText }}></div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PostImg
                    src={content.contentFile ?? defaultImg}
                    onError={(e) => {
                      e.currentTarget.src = defaultImg;
                    }}
                  ></PostImg>
                </div>
              )}
            </PostContentBox>
          ))}
      </PostContentList>
      {/* 파일이 있는 경우에만 나오도록. */}
      {post && post.attachment && (
        <>
          <AttachmentLabel>첨부파일</AttachmentLabel>
          <AttachmentBox>
            <IoDownloadOutline />
            <FileLink href={post && post.attachment ? post.attachment : ''} download>
              {post && post.attachment ? post.attachment : ''}
            </FileLink>
          </AttachmentBox>
        </>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  /* margin: 40px; */
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
  text-align: start;
`;

const PostTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 1px solid #000;
  padding-bottom: 0.5rem;
`;

const PostDescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #222;
`;

const PostLabel = styled.label`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const PostDescription = styled.p`
  margin-right: 1rem;
`;

const PostContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  min-height: 300px;
`;

const PostContentBox = styled.div`
  /* display: flex; */
  /* justify-content: flex-start; */
  /* align-items: center; */
  /* flex-direction: column; */
  /* border: 1px solid #333; */
  padding: 1rem;
  /* min-height: 200px; */
  font-size: 0.95rem;
  color: #222;
  white-space: pre-line;
`;

const PostImg = styled.img`
  max-width: 100%;
  border-radius: 4px;
  max-height: 500px;
`;

export default BoardDetail;

const AttachmentLabel = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const AttachmentBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

const FileLink = styled.a`
  color: blue;
  margin-left: 0.5rem;
  text-decoration: underline;
`;
