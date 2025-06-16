import React from 'react'
import styled from 'styled-components'
import BoardTable from '../../components/Board/BoardTable';
import theme from "../../styles/theme";
import ContentHeader from '../../components/Common/ContentHeader';

const columns = [
  {
    label: '번호',
    key: 'id',
    width: '100px',
    align: 'center'
  },
  {
    label: '반',
    key: 'class',
    width: '100px',
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
  { id : 1, title : "[가정통신문] 6월1주차", writer : "정형일", class: "햇님", file: "", created_Date : "2025-06-03"},
  { id : 2, title : "[가정통신문] 6월2주차", writer : "정형일", class: "햇님", file: "", created_Date : "2025-06-10"},
  { id : 3, title : "[가정통신문] 6월3주차", writer : "정형일", class: "햇님", file: "", created_Date : "2025-06-17"},
  { id : 4, title : "[가정통신문] 6월4주차", writer : "정형일", class: "햇님", file: "", created_Date : "2025-06-24"},
];

const tableInfo = {
  color : theme.colors.white,
  backgroundColor : theme.colors.green,
  thFontSize : theme.fontSizes.lg,
  tbFontSize : theme.fontSizes.base,
}

const FamilyCommunityPage = () => {
  return (
    <PageContainer>
      <ContentHeader
        Title={'가정통신문'}
        Color={'green'}
        // 교사면 버튼 추가, 학부모면 없음.
        ButtonProps={[
          { Title: '작성하기', func: () => alert('작성하기 페이지 이동~') },
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

export default FamilyCommunityPage