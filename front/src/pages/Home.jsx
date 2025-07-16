import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/Common/ContentHeader';
import BoardTable from '../components/Board/BoardTable';
import theme from "../styles/theme";
// import TipTapEditor from '../components/Board/TextEditor';
import PostEditor from '../components/Board/BoardEditor';
// import SimpleEditor from "../components/Board/EditorComponent/tiptap-templates/InputEditor";
import SimpleEditor from '../components/Board/TextInputBlock copy';
import ImageInputBlock from '../components/Board/ImageInputBlock';
import ChatButton from '../components/Chat/ChatButton';

const columns = [
  {
    label: '번호',
    key: 'id',
    width: '100px',
    align: 'center',
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
  { id: 1, title: 'test1', writer: '정형일' },
  { id: 2, writer: '정형일', title: 'test2' },
  { id: 3, title: 'test3', writer: '정형일' },
];

const tableInfo = {
  color: theme.colors.white,
  backgroundColor: theme.colors.green,
  thFontSize: theme.fontSizes.lg,
  tbFontSize: theme.fontSizes.base,
};

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

      {/* <BoardContainer>
        <BoardTable tableInfo={tableInfo} columns={columns} boardData={BoardData} />
      </BoardContainer> */}
      {/* <div style={{ padding: '2rem' }}>
        <h2>📝 게시글 작성</h2>
        <TipTapEditor />
      </div> */}

      {/* <PostEditor></PostEditor> */}
      <SimpleEditor></SimpleEditor>
      <ImageInputBlock></ImageInputBlock>
      <div>
        <FolderCard selected={true} title="내 문서" date="2025.07.08" />
        <FolderCard selected={false} title="내 문서" date="2025.07.08" />
      </div>
      <ChatButton />
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

const FolderWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 120px;
  background-color: ${({ selected }) => (selected ? '#03a9f4' : '#e0e0e0')};
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  color: ${({ selected }) => (selected ? '#ffffff' : '#1c1c1c')};
  font-family: 'Pretendard', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: ${({ selected }) => (selected ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};
`;

const FolderTab = styled.div`
  content: '';
  position: absolute;
  top: -12px;
  left: 0;
  width: 40px;
  height: 20px;
  background-color: ${({ selected }) => (selected ? '#03a9f4' : '#e0e0e0')};
  border-top-left-radius: 12px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 10px;
  z-index: 2;
`;

const FolderRightTab = styled.div`
  position: absolute;
  top: -12px;
  left: 15px;
  width: 44px;
  height: 24px;
  background-color: ${({ selected }) => (selected ? '#03a9f4' : '#e0e0e0')};
  /* clip-path: polygon(0 0, 50% 0, 0 100%, 0 0); */
  clip-path: polygon(0 0, 60% 0, 100% 100%, 0 100%);
  border-top-right-radius: 10px;
  z-index: 2;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 12px;
`;

const Subtitle = styled.div`
  font-size: 12px;
  margin-top: 12px;
  opacity: 0.8;
`;

const DateText = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const FolderCard = ({ selected = false, title = '문서 제목', date = '2025.03.01' }) => {
  return (
    <FolderWrapper selected={selected}>
      <FolderTab selected={selected} />
      <FolderRightTab selected={selected} />
      <Title>{title}</Title>
      <Subtitle>마지막 수정일</Subtitle>
      <DateText>{date}</DateText>
    </FolderWrapper>
  );
};


