import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import BoardTable from '../components/Board/BoardTable';
import theme from "../styles/theme";
import ContentHeader from '../components/Common/ContentHeader';
import ImagePost from '../components/Board/ImagePost';
import { boardService } from '../api/boards';
import Pagination from '../components/Common/Pagenation';

const columns = [
  {
    label: '번호',
    key: 'id',
    width: '100px',
    align: 'center'
  },
  {
    label: '파일',
    key: 'file',
    width: '120px',
  },
  {
    label: '등록자',
    key: 'writer',
    width: '120px',
  },
  {
    label: '제목',
    key: 'title',
  },
  {
    label: '생성 날짜',
    key: 'created_Date',
    width: '160px',
  },
];

const BoardData = [
  { id : 1, title : "[공지사항] 6월1주차", writer : "정형일", file: "", created_Date : "2025-06-03"},
  { id : 2, title : "[공지사항] 6월2주차", writer : "정형일", file: "", created_Date : "2025-06-10"},
  { id : 3, title : "[공지사항] 6월3주차", writer : "정형일", file: "", created_Date : "2025-06-17"},
  { id : 4, title : "[공지사항] 6월4주차", writer : "정형일", file: "", created_Date : "2025-06-24"},
];

const tableInfo = {
  color : theme.colors.white,
  backgroundColor : theme.colors.green,
  thFontSize : theme.fontSizes.lg,
  tbFontSize : theme.fontSizes.base,
}

const MealPlanPage = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // 1부터 시작
  const navigate = useNavigate();

  useEffect(() => {
    const getPostList = async () => {
      try {
        const responseData = await boardService.typeBoardList("MEAL_PLAN", page);
        console.log(responseData);
        setData(responseData);
        // alert("게시글 조회 성공");
      } catch (error) {
        console.error("게시글 조회 실패 : ", error);
        alert("게시글 조회 실패");
      }
    }
    getPostList();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleClick = (boardNo) => {
    const currentPath = location.pathname;
    const basePath = currentPath.split('/')[1]; // "notice" 등
    navigate(`/${basePath}/${boardNo}`);
  };

  return (
    <PageContainer>
      <ContentHeader
        Title={'식단표 게시판'}
        Color={'green'}
        // 교사면 버튼 추가, 학부모면 없음.
        ButtonProps={[
          { Title: '작성하기', 
            func: () => {
              navigate("/meal_plan/write", { state: { category: "meal_plan" }, })
            } 
          },
        ]}
      ></ContentHeader>
      {data && (
        <BoardContainer>
          {data.content.map((post) => (
            <ImagePost onClick={() => handleClick(post.boardNo)} postData={post}></ImagePost>
          ))}
        </BoardContainer>
      )}
      {data && (
        <Pagination
          currentPage={data.number + 1}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
  flex-wrap: wrap;
  margin-left: 50px;
  margin-right: 50px;
  gap: 20px;
`;

export default MealPlanPage;