import React, { useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import { useState } from 'react';
import FileUploadModal from './components/FileUploadModal';
import fileimg from '../../assets/img/fileimg.png';
import filehover from '../../assets/img/filehover.png';

import useLoginStore from '../../store/loginStore';
import { boardService } from '../../api/boards';
import TeacherDocumentList from './components/TeacherDocumentList';

const file = [
  { title: '길dfdfdfdfdfdfdfdf면', modifyDate: '2025-03-01', file: 'xxx.png' },
  { title: '문서 2dfdfdfd', modifyDate: '2025-03-01', file: 'xxx.png' },
  { title: '문서 3', modifyDate: '2025-03-01', file: 'xxx.png' },
];

const TeacherDocument = () => {
  const { member } = useLoginStore();
  const memberNo = member?.memberNo;
  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchDocuments = async () => {
    if (!memberNo) return;

    try {
      const data = await boardService.getDocumentList(memberNo);
      setDocuments(data);
    } catch (err) {
      console.error('서류 목록 조회 실패 : ', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [memberNo]);

  return (
    <Wrapper>
      <ContentHeader
        Title={'서류 관리'}
        Color={'blue'}
        FontSize="xl"
        ButtonProps={[
          {
            Title: '업로드',
            func: () => setOpenModal(true),
          },
        ]}
      />
      <TopContent>
        <Title>최근 열람한 문서</Title>
        <Documents>
          {file.map((f, index) => (
            <Card key={index}>
              <FileName>{f.title}</FileName>
              <FileInfo>{f.file}</FileInfo>
            </Card>
          ))}
        </Documents>
      </TopContent>
      <BottomContent>
        <TeacherDocumentList documents={documents} />
      </BottomContent>
      {openModal && (
        <FileUploadModal onClose={() => setOpenModal(false)} memberNo={memberNo} onSuccess={fetchDocuments} />
      )}
    </Wrapper>
  );
};

export default TeacherDocument;

const Wrapper = styled.div`
  width: 100%;
  min-height: 625px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const TopContent = styled.div`
  width: 90%;
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 10px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BottomContent = styled.div`
  width: 90%;
  margin: 10px auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  display: flex;
  padding: 0 30px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Documents = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 30px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 150px;
  height: 100px;
  background-image: url(${fileimg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &:hover {
    background-image: url(${filehover});
    cursor: pointer;
  }
`;

const FileName = styled.div`
  display: block;
  align-items: center;
  padding: 15px 20px 0 20px;
  width: 100%;
  max-width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.white};
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileInfo = styled.div`
  display: flex;
  padding: 0 0 0 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding: 10px;

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    word-wrap: break-word;
  }

  tbody tr {
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.gray[300]};
    }
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 10%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 20%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 30%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 8%;
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 8%;
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 8%;
  }
`;

const Thead = styled.thead`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : '')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  & th:first-child {
    border-top-left-radius: 10px;
  }

  & th:last-child {
    border-top-right-radius: 10px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.blue : theme.colors.white)};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
