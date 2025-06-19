import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScheduleModal = ({ isOpen, onClose, selectedDate, initialData }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setStartTime(initialData.start_time || '');
      setEndTime(initialData.end_time || '');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Span>{initialData ? '일정 수정' : '일정 추가'}</Span>
        </ModalHeader>
        <ModalContent>
          <ModalDate>
            <Span>날짜 :</Span>
            <P>{selectedDate}</P>
          </ModalDate>
          <ModalMain>
            <ModalInfo>
              <ModalTitle>
                <TitleLeft>
                  <Span>제목 :</Span>
                </TitleLeft>
                <TitleRight>
                  <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
                </TitleRight>
              </ModalTitle>
              <ModalInfoTime>
                <InfoTimeLeft>
                  <Span>시간 :</Span>
                </InfoTimeLeft>
                <InfoTimeRight>
                  <TimeInput value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  <Span>-</Span>
                  <TimeInput value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </InfoTimeRight>
              </ModalInfoTime>
            </ModalInfo>
            <ModalContentMain>
              <ModalContentDESCRIPTION>
                <ModalContentDESCRIPTIONLeft>내용 :</ModalContentDESCRIPTIONLeft>
                <ModalContentDESCRIPTIONRight
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="내용을 입력해주세요."
                />
              </ModalContentDESCRIPTION>
            </ModalContentMain>
          </ModalMain>
        </ModalContent>
        <ModalFooter>
          {initialData ? (
            <Button className="edit" onClick={handleSubmit}>
              수정
            </Button>
          ) : (
            <Button className="add" onClick={handleSubmit}>
              등록
            </Button>
          )}
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const P = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 40%;
  height: 60%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  span {
    margin: ${({ theme }) => theme.spacing[4]} 0;
    padding: 0 ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  span {
    margin: ${({ theme }) => theme.spacing[2]} 0;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const ModalDate = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  top: 0;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  width: 100%;
  height: 10%;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  padding: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
`;

const ModalInfo = styled.div`
  width: 100%;
  height: 20%;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: start;
  align-items: center;

  padding-bottom: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const TitleLeft = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const TitleRight = styled.div`
  width: 90%;
  height: 100%;
`;

const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  padding: ${({ theme }) => theme.spacing[1]};
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ModalInfoTime = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const InfoTimeLeft = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const InfoTimeRight = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TimeInput = styled.input.attrs({ type: 'time' })`
  width: 30%;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  padding: ${({ theme }) => theme.spacing[1]};
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ModalContentMain = styled.div`
  width: 100%;
  height: 80%;
`;

const ModalContentDESCRIPTION = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  margin: ${({ theme }) => theme.spacing[2]} 0;
`;

const ModalContentDESCRIPTIONLeft = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ModalContentDESCRIPTIONRight = styled.textarea`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: ${({ theme }) => theme.spacing[2]};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 10%;
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Button = styled.button`
  border: none;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.gray[400]};
  &.add {
    background: ${({ theme }) => theme.colors.green};
  }

  &.edit {
    background: ${({ theme }) => theme.colors.orange};
  }
`;

export default ScheduleModal;
