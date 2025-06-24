import React from 'react';
import { useLocation } from "react-router-dom";
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import BoardDetail from '../components/Board/BoardDetail';
import content from "../components/Board/content.json";

const categoryName = {
  letterhome : "가정통신문",
  notice : "공지사항",
  note : "알림장",
  photo : "사진 게시판",
  mealplan : "식단표",
  default : "테스트"
}

const BoardDetailPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const category = pathSegments[0]; // 현재 들어온 게시판 확인 가능.

  // 상태관리 : 수정중인가 아닌가, 수정중이라면, PostEditor를 보이게하며, 수정 페이지로.

  return (
    <PageContainer>
      <ContentHeader
        Title={categoryName[category]}
        Color={'green'}
        ButtonProps={[
          { Title: '작성하기', func: () => alert('작성하기 페이지 이동~') },
          { Title: '뒤로가기', func: () => alert('돌아간다.')},
        ]}
      ></ContentHeader>

      {/* 공통 에디터 컴포넌트 */}
      {/* <BoardEditor category={category} /> */}

      {/* 더미데이터를 사용했으므로, 추후 수정해야함. */}
      <BoardDetail category={content.Post[1].type} post={content.Post[1]}></BoardDetail>
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