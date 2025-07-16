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
import RecentDocuments from './components/RecentDocuments';
import { toast } from 'react-toastify';

const TeacherDocument = () => {
  const { member } = useLoginStore();
  const memberNo = member?.memberNo;

  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  //서류 목록
  const fetchDocuments = async () => {
    try {
      const data = await boardService.getDocumentList();
      setDocuments(data);
    } catch (err) {
      console.error('서류 목록 조회 실패 : ', err);
    }
  };

  //최근 열람한 목록
  const [recentDocs, setRecentDocs] = useState([]);

  const fetchRecentDocuments = async () => {
    try {
      const data = await boardService.getRecentViewdDocs();
      setRecentDocs(data);
    } catch (error) {
      console.error('최근 열람한 파일 목록 불러오기 실패 : ', error);
    }
  };

  useEffect(() => {
    if (!memberNo) return;

    fetchDocuments();
    fetchRecentDocuments();
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
        <RecentDocuments recentDocs={recentDocs} />
      </TopContent>
      <BottomContent>
        <TeacherDocumentList documents={documents} onDelete={fetchDocuments} onViewed={fetchRecentDocuments} />
      </BottomContent>
      {openModal && (
        <FileUploadModal
          onClose={() => setOpenModal(false)}
          memberNo={memberNo}
          onSuccess={() => {
            fetchDocuments();
            fetchRecentDocuments();
          }}
        />
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
