import React from 'react'
import styled from 'styled-components';

const BoardDetail = ({ category, post }) => {
  return (
    <DetailContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostDescriptionBox>
        <PostDescription>{post.create_date}</PostDescription>
        <div>
          {(category === "note" || category === "letterhome") && (
            <>
              <PostLabel>반 이름</PostLabel>
              <PostDescription>{post.class.name}</PostDescription>
            </>
          )}
          <PostLabel>작성자</PostLabel>
          <PostDescription>{post.member.name}</PostDescription>
        </div>
      </PostDescriptionBox>
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
      <div>첨부파일</div>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
  margin: 40px;
`;

const PostTitle = styled.h1``;

const PostDescriptionBox = styled.div``;

const PostLabel = styled.label``;

const PostDescription = styled.p``;

const PostContentList = styled.div``;

const PostContentBox = styled.div``;

const PostImg = styled.img``;

export default BoardDetail