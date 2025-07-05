import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import BoardDetail from '../components/Board/BoardDetail';
// import content from "../components/Board/content.json";
import { boardService } from '../api/boards';
import useLoginStore from '../store/loginStore';

const categoryName = {
  family_notice : "가정통신문",
  notice : "공지사항",
  note : "알림장",
  photo : "사진 게시판",
  meal_plan : "식단표",
  default : "테스트"
}

const BoardDetailPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const category = pathSegments[0]; // 현재 들어온 게시판 확인 가능.
  const boardNo = pathSegments[1];
  const navigate = useNavigate();
  const [boardContent, setBoardContent] = useState(null);
  const member = useLoginStore((state) => state.member);

  const handleGoBack = () => {
    navigate(-1); // 브라우저의 이전 페이지로 이동
  };

  useEffect(() => {
      const getPost = async () => {
        try {
          const responseData = await boardService.boardDetail(boardNo);
          console.log(responseData);
          setBoardContent(responseData);
          // alert("게시글 조회 성공");
        } catch (error) {
          console.error("게시글 조회 실패 : ", error);
          alert("게시글 조회 실패");
        }
      }
      getPost();
    }, [boardNo]);
  
  const handleDelete = async () => {
    try {
      const responseData = await boardService.boardDelete(boardNo);
      console.log(responseData);
      handleGoBack();
    } catch (error) {
      console.error("게시글 삭제 실패 : ", error);
      alert("게시글 삭제 실패");
    }
  }

  // 상태관리 : 수정중인가 아닌가, 수정중이라면, PostEditor를 보이게하며, 수정 페이지로.

  return (
    <PageContainer>
      <ContentHeader
        Title={categoryName[category]}
        Color={'green'}
        ButtonProps={
          boardContent?.memberNo === member.memberNo ?
          [
            { Title: '수정하기', 
              func: () => {
                navigate(`/${category}/update/${boardNo}`, { state: { post: boardContent, category : category } })
              }  },
            { Title: '삭제하기', func: () => handleDelete()},
            { Title: '뒤로가기', func: () => handleGoBack()},
          ]
          :
          [
            { Title: '뒤로가기', func: () => handleGoBack()},
          ]
        }
      ></ContentHeader>

      {/* 공통 에디터 컴포넌트 */}
      {/* <BoardEditor category={category} /> */}

      {boardContent && (
        <BoardDetail category={category} post={boardContent}></BoardDetail>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default BoardDetailPage;