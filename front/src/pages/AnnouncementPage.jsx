import React from 'react'
import styled from 'styled-components'
import BoardTable from '../components/Board/BoardTable';
import theme from "../styles/theme";
import ContentHeader from '../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';

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

const AnnouncementPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentHeader
        Title={'공지사항'}
        Color={'green'}
        // 학부모는 못봄, 교사는 작성하기 못함, 시설장만 가능
        ButtonProps={[
          { Title: '작성하기', 
            func: () => {
              navigate("/announcement/write", { state: { category: "announcement" }, })
            } 
          },
        ]}
      ></ContentHeader>
      <BoardContainer>
        <BoardTable 
          tableInfo={tableInfo}
          columns={columns}
          boardData={BoardData}
        />
      </BoardContainer>
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

export default AnnouncementPage