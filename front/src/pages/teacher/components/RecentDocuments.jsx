import styled from 'styled-components';
import fileimg from '../../../assets/img/fileimg.png';
import filehover from '../../../assets/img/filehover.png';
import { boardService } from '../../../api/boards';
import { getBoardDownloadUrl } from '../../../api/fileApi';
import { toast } from 'react-toastify';

const RecentDocuments = ({ recentDocs, onViewed }) => {
  const handleDownload = async (d) => {
    if (!d.fileUrl || !d.boardNo) return;

    try {
      //다운로드 URL
      const { presignedUrl } = await getBoardDownloadUrl(d.boardNo);

      // 파일 다운로드
      const response = await fetch(presignedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = d.originName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // 열람 날짜 업데이트
      await boardService.updateViewedDate(d.boardNo);
      onViewed?.();
    } catch (error) {
      console.error('다운로드 또는 열람 업데이트 실패:', error);
      toast.error('파일 다운로드에 실패했습니다.');
    }
  };

  return (
    <>
      <Documents>
        {recentDocs.map((d, index) => (
          <Card key={index} onClick={() => handleDownload(d)}>
            <FileName>{d.title}</FileName>
            <FileInfo>{d.originName}</FileInfo>
          </Card>
        ))}
      </Documents>
    </>
  );
};

export default RecentDocuments;

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
