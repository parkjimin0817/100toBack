import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/Common/ContentHeader';
import BoardTable from '../components/Board/BoardTable';
import theme from "../styles/theme";

const columns = [
  {
    label: '번호',
    key: 'id',
    width: '100px',
    align: 'center'
  },
  {
    label: '제목',
    key: 'title',
    // width: '60px',
    align: 'left',
  },
  {
    label: '작성자',
    key: 'writer',
    width: '100px',
  },
];

const BoardData = [
  { id : 1, title : "test1", writer : "정형일"},
  { id : 2, writer : "정형일", title : "test2"},
  { id : 3, title : "test3", writer : "정형일"},
];

const tableInfo = {
  color : theme.colors.white,
  backgroundColor : theme.colors.green,
  thFontSize : theme.fontSizes.lg,
  tbFontSize : theme.fontSizes.base,
}

const Home = () => {
  return (
    <Content>
      <ContentHeader
        Title={'HOME'}
        Color={'lightblue'}
        ButtonProps={[
          { Title: '뒤로가기', func: () => alert('뒤로가기~') },
          { Title: '앞으로가기', func: () => alert('앞으로가기~') },
        ]}
      ></ContentHeader>
      
      <BoardContainer>
        <BoardTable 
          tableInfo={tableInfo}
          columns={columns}
          boardData={BoardData}
        />
      </BoardContainer>
    </Content>
  );
};

const Content = styled.div`
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

export default Home;
