import styled from 'styled-components';
import fileimg from '../../../assets/img/fileimg.png';
import filehover from '../../../assets/img/filehover.png';

const RecentDocuments = ({ recentDocs }) => {
  return (
    <>
      <Documents>
        {recentDocs.map((f, index) => (
          <Card key={index}>
            <FileName>{f.title}</FileName>
            <FileInfo>{f.file}</FileInfo>
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
