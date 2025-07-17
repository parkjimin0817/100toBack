import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useLoginStore from '../../../store/loginStore';
import { toast } from 'react-toastify';
import ProfileImageUpload from '../../common/signup/components/ProfileImageUpload';
import { childService } from '../../../api/child';

const ChildBringModal = ({ isOpen, onClose }) => {
  const [childName, setChildName] = useState('');
  const [childResidentFrontNo, setChildResidentFrontNo] = useState('');
  const [childResidentBackNo, setChildResidentBackNo] = useState('');

  const { member } = useLoginStore();

  const resetForm = () => {
    setChildName('');
    setChildResidentFrontNo('');
    setChildResidentBackNo('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleBringSubmit = async () => {
    if (!childName) {
      toast.error('이름을 입력해주세요.');
      return;
    } else if (!childResidentFrontNo || !childResidentBackNo) {
      toast.error('주민번호를 입력해주세요.');
      return;
    }

    const mergedData = {
      memberNo: member.memberNo,
      childName,
      childResidentNo: `${childResidentFrontNo}-${childResidentBackNo}`,
    };

    try {
      await childService.linkChild(mergedData);
      toast.success('자녀가 연결되었습니다.');
      resetForm();
      onClose();
      if (window.refreshChildList) {
        window.refreshChildList();
      }
    } catch (error) {
      console.error(error);
      toast.error('등록 실패: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <Backdrop onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Span>아동 연결</Span>
        </ModalHeader>
        <ModalContent>
          <ModalTitle>
            <Span>아동 정보 기입</Span>
          </ModalTitle>
          <ModalMain>
            <ModalTextContainer>
              <Area>
                <SpanArea>
                  <Span>이름</Span>
                  <Span>:</Span>
                </SpanArea>
                <InputArea>
                  <TextInput
                    type="text"
                    placeholder="이름 입력"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                  />
                </InputArea>
              </Area>
              <Area>
                <SpanArea>
                  <Span>주민번호</Span>
                  <Span>:</Span>
                </SpanArea>
                <InputArea>
                  <ResidentNoFrontInput
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="200101"
                    value={childResidentFrontNo}
                    onChange={(e) => setChildResidentFrontNo(e.target.value)}
                  />
                  <P>-</P>
                  <ResidentNoBackInput
                    type="password"
                    inputMode="numeric"
                    maxLength={7}
                    placeholder="•••••••"
                    value={childResidentBackNo}
                    onChange={(e) => setChildResidentBackNo(e.target.value)}
                  />
                </InputArea>
              </Area>
            </ModalTextContainer>
          </ModalMain>
        </ModalContent>
        <ModalFooter>
          <Button className="bring" onClick={handleBringSubmit}>
            등록
          </Button>
          <Button onClick={handleClose}>닫기</Button>
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
  height: 30%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightblue};
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
  height: 60%;
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

const ModalTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  top: 0;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  width: 100%;
  height: 20%;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
`;

const ModalTextContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Area = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: start;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const SpanArea = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputArea = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ResidentNoFrontInput = styled.input.attrs({ type: 'text' })`
  width: 45%;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  padding: ${({ theme }) => theme.spacing[1]};
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ResidentNoBackInput = styled.input.attrs({ type: 'password' })`
  width: 45%;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  padding: ${({ theme }) => theme.spacing[1]};
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 20%;
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
  &.bring {
    background: ${({ theme }) => theme.colors.green};
  }
`;

export default ChildBringModal;
