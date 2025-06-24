import React from 'react'
import styled from 'styled-components';
import { IoDownloadOutline } from "react-icons/io5";

const BoardDetail = ({ category, post }) => {
  return (
    <DetailContainer>
      {/* 게시글 타이틀 */}
      <PostTitle>{post.title}</PostTitle>
      <PostDescriptionBox>
        <PostDescription>{post.create_date}</PostDescription>
        <PostDescriptionBox>
          {(category === "note" || category === "letterhome") && (
            <>
              <PostLabel>반 이름</PostLabel>
              <PostDescription>{post.class.name}</PostDescription>
            </>
          )}
          <PostLabel>작성자</PostLabel>
          <PostDescription>{post.member.name}</PostDescription>
        </PostDescriptionBox>
      </PostDescriptionBox>
      {/* 게시글 내용 */}
      <PostContentList>
        {post.contents && post.contents.map((content) => (
          <PostContentBox>
            {content.type === "TEXT" ?
            (
              <div dangerouslySetInnerHTML={{__html : content.content}}></div>
            ) : (
              <PostImg src={content.content}></PostImg>
            )}
          </PostContentBox>
        ))}
      </PostContentList>
      {/* 파일이 있는 경우에만 나오도록. */}
      {(post && post.file) && (
        <>
          <AttachmentLabel>첨부파일</AttachmentLabel>
          <AttachmentBox>
            <IoDownloadOutline />
            <FileLink href={post && post.file ? post.file.url : ""} download>{post && post.file ? post.file.name : ""}</FileLink>
          </AttachmentBox>
        </>
      )}
    </DetailContainer>
  )
}

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
`;

const PostContentBox = styled.div`
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
`;

export default BoardDetail

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