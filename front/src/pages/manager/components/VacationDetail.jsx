import React from 'react';
import styled from 'styled-components';

const VacationDetail = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Span>휴가 상세 정보</Span>
        </ModalHeader>
        <ModalContent>
          <ModalDate>
            <Span>작성일 :</Span>
            <P>{data.create_date}</P>
          </ModalDate>
          <ModalMain>
            <ModalInfo>
              <ModalInfoType>
                <ModalInfoTypeLeft>
                  <Span>휴가 종류 :</Span>
                  <P>
                    {data.type} - {data.type_detail}
                  </P>
                </ModalInfoTypeLeft>
                <ModalInfoTypeRight>
                  <Span>신청자 :</Span>
                  <p>{data.name}</p>
                </ModalInfoTypeRight>
              </ModalInfoType>
              <ModalInfoDate>
                <Span>기간 :</Span>
                <P>
                  {data.start_date} ~ {data.end_date}
                </P>
              </ModalInfoDate>
            </ModalInfo>
            <ModalContentMain>
              <ModalContentReason>
                <ModalContentReasonLeft>사유 :</ModalContentReasonLeft>
                <ModalContentReasonRight>{data.reason}</ModalContentReasonRight>
              </ModalContentReason>
              <ModalContentAttachment>
                <Span>첨부파일 :</Span>
                <P>{data.file === 'O' ? '있음' : '없음'}</P>
              </ModalContentAttachment>
            </ModalContentMain>
            <ModalStatus>
              <Span>상태 :</Span>
              <P>{data.status}</P>
            </ModalStatus>
          </ModalMain>
        </ModalContent>
        <ModalFooter>
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
  background-color: ${({ theme }) => theme.colors.blue};
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
  gap: ${({ theme }) => theme.spacing[1]};
  span {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.base};
    strong {
      font-weight: 600;
    }
  }
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
  height: 30%;
`;

const ModalInfoType = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalInfoTypeLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ModalInfoTypeRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ModalInfoDate = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ModalContentMain = styled.div`
  width: 100%;
  height: 60%;
`;

const ModalContentReason = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  margin: ${({ theme }) => theme.spacing[2]} 0;
`;

const ModalContentReasonLeft = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ModalContentReasonRight = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: ${({ theme }) => theme.spacing[2]};
`;

const ModalContentAttachment = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ModalStatus = styled.div`
  width: 100%;
  height: 105;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 10%;
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const Button = styled.button`
  border: none;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.gray[400]};
`;

export default VacationDetail;
