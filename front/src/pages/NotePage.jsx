import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import BoardTable from '../components/Board/BoardTable';
import theme from "../styles/theme";
import ContentHeader from '../components/Common/ContentHeader';
import Pagination from '../components/Common/Pagenation';
import { boardService } from '../api/boards';
import useLoginStore from '../store/loginStore';

const columns = [
  {
    label: '번호',
    key: 'boardNo',
    width: '100px',
    align: 'center'
  },
  {
    label: '제목',
    key: 'title',
  },
  {
    label: '작성자',
    key: 'memberName',
    width: '120px',
  },
  {
    label: '작성일',
    key: 'createDate',
    width: '160px',
  },
  {
    label: '조회수',
    key: "views",
    width: "100px",
  }
];

const BoardData = [
  { id : 1, title : "[알림장] 6월1주차", writer : "정형일", created_Date : "2025-06-03"},
  { id : 2, title : "[알림장] 6월2주차", writer : "정형일", created_Date : "2025-06-10"},
  { id : 3, title : "[알림장] 6월3주차", writer : "정형일", created_Date : "2025-06-17"},
  { id : 4, title : "[알림장] 6월4주차", writer : "정형일", created_Date : "2025-06-24"},
];

const tableInfo = {
  color : theme.colors.white,
  backgroundColor : theme.colors.green,
  thFontSize : theme.fontSizes.lg,
  tbFontSize : theme.fontSizes.base,
}

const NotePage = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // 1부터 시작
  const navigate = useNavigate();
  const member = useLoginStore((state) => state.member);

  useEffect(() => {
    const getPostList = async () => {
      try {
        const responseData = await boardService.typeBoardList("NOTE", member.centerNo, page);
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


  return (
    <PageContainer>
      <ContentHeader
        Title={'알림장'}
        Color={'green'}
        // 교사면 버튼 추가, 학부모면 없음.
        ButtonProps={
          member.memberType === "FARENT" ? 
          []
          : [
          { Title: '작성하기', 
            func: () => {
              navigate("/note/write", { state: { category: "note" }, })
            } 
          },
        ]}
      ></ContentHeader>
      {data && (
        <BoardContainer>
          <BoardTable 
            tableInfo={tableInfo}
            columns={columns}
            boardData={data.content}
          />
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
  justify-content: center;
  margin-top: 50px;
`;

export default NotePage;