import { FiUpload } from 'react-icons/fi';
import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { boardService } from '../../../api/boards';
import { PulseLoader } from 'react-spinners';

const FileUploadModal = ({ onClose, memberNo }) => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  //파일 선택
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  //파일 업로드
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning('파일을 선택해주세요.');
      return;
    }
    if (!title.trim()) {
      toast.warning('제목을 입력해주세요.');
      return;
    }

    const request = {
      memberNo,
      title,
    };

    try {
      setLoading(true);
      await boardService.uploadDoc(request, selectedFile);
      toast.success('파일 업로드 완료');
      onClose();
    } catch (error) {
      toast.error('파일 업로드를 다시 시도해주세요.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Title>파일 업로드</Title>
        <FileTitle>
          제목 : <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FileTitle>

        <UploadArea>
          <StyledLabel htmlFor="file">
            <FiUpload size={16} />
            <span>파일 선택</span>
          </StyledLabel>
          <InfoText>※ 하나의 파일만 업로드할 수 있습니다.</InfoText>
          <input id="file" type="file" onChange={handleFileChange} />

          <FileList>{selectedFile && <FileItem>{selectedFile.name}</FileItem>}</FileList>
        </UploadArea>

        <ButtonRow>
          <ActionButton onClick={onClose}>닫기</ActionButton>
          <ActionButton $primary onClick={handleUpload} disabled={loading}>
            업로드
          </ActionButton>
        </ButtonRow>

        {loading && (
          <SpinnerOverlay>
            <PulseLoader color="#8FD7EB" loading={loading} size={15} />
          </SpinnerOverlay>
        )}
      </Content>
    </Overlay>
  );
};

export default FileUploadModal;

const Overlay = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 모달과 동일한 레벨로 설정 */
  backdrop-filter: blur(5px); /* 모달 배경 흐리게 처리 */
  border-radius: 12px; /* 모달의 둥근 테두리와 일치시킴 */
`;

const Content = styled.div`
  width: 400px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative; /* SpinnerOverlay가 이 Content의 크기에 맞게 배치되도록 */
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  label {
    font-size: ${({ theme }) => theme.fontSizes.base};
    cursor: pointer;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.gray200};
    border-radius: 8px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray300};
    }
  }

  input {
    display: none;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const FileItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

const ActionButton = styled.button`
  width: 80px;
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${({ $primary, theme }) => ($primary ? theme.colors.blue : theme.colors.gray[200])};
  color: ${({ $primary }) => ($primary ? 'white' : 'black')};

  &:hover {
    background-color: ${({ $primary, theme }) => ($primary ? theme.colors.blue : theme.colors.gray[300])};
  }
`;

const FileTitle = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 5px;
  width: 250px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray500};
  margin: 0;
`;
