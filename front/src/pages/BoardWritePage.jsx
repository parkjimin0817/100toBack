import React from 'react';
import { useLocation } from "react-router-dom";
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';

const categoryName = {
  familycommunity : "가정통신문",
  announcement : "공지사항",
  notice : "알림장",
  album : "사진 게시판",
  foodmenu : "식단표",
  default : "테스트"
}

const BoardWritePage = () => {
  const location = useLocation();
  const category = location.state?.category || "default";

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
      <BoardEditor category={category} />
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

export default BoardWritePage;