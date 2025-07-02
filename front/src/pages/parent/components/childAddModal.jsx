import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useLoginStore from '../../../store/loginStore';
import { toast } from 'react-toastify';
import ProfileImageUpload from '../../common/signup/components/ProfileImageUpload';
import { childService } from '../../../api/child';

const formatPhoneNumber = (value = '') => {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length > 11) return value.slice(0, -1);
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7) return onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  return onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
};

const ChildAddModal = ({ isOpen, onClose }) => {
  const [childName, setChildName] = useState('');
  const [childResidentFrontNo, setChildResidentFrontNo] = useState('');
  const [childResidentBackNo, setChildResidentBackNo] = useState('');
  const [fParentName, setFParentName] = useState('');
  const [fParentPhone, setFParentPhone] = useState('');
  const [mParentName, setMParentName] = useState('');
  const [mParentPhone, setMParentPhone] = useState('');
  const [childProfile, setChildProfile] = useState('');
  const [previewUrl, setPreviewUrl] = useState('/src/assets/defaultimg.png');

  const { member } = useLoginStore();

  const resetForm = () => {
    setChildName('');
    setChildResidentFrontNo('');
    setChildResidentBackNo('');
    setFParentName('');
    setFParentPhone('');
    setMParentName('');
    setMParentPhone('');
    setChildProfile('');
    setPreviewUrl('/src/assets/defaultimg.png');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    const isValidSize = file.size <= 200 * 1024;

    if (!isValidType) {
      toast.error('JPG, JPEG, PNG 파일만 가능합니다.');
      return;
    }

    if (!isValidSize) {
      toast.error('파일 크기는 200KB 이하로 제한됩니다.');
      return;
    }

    setChildProfile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAddSubmit = async () => {
    if (!childName) {
      toast.error('이름을 입력해주세요.');
      return;
    } else if (!childResidentFrontNo || !childResidentBackNo) {
      toast.error('주민번호를 입력해주세요.');
      return;
    }
    if (!(fParentName && fParentPhone) && !(mParentName && mParentPhone)) {
      toast.error('부모 중 한명은 입력해주세요');
    }

    const mergedData = {
      centerNo: member.centerNo,
      memberNo: member.memberNo,
      childName,
      childResidentNo: `${childResidentFrontNo}-${childResidentBackNo}`,
      fParentName,
      fParentPhone,
      mParentName,
      mParentPhone,
      childProfile,
    };

    try {
      await childService.createChild(mergedData);
      toast.success('자녀가 등록되었습니다.');
      toast.success('승인을 받아야 합니다.');
      resetForm();
      onClose();
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
          <Span>아동 추가</Span>
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
              <Area>
                <SpanArea>
                  <Span>부 정보</Span>
                  <Span>:</Span>
                </SpanArea>
                <InputArea>
                  <ParentNameInput
                    type="text"
                    placeholder="부 이름"
                    value={fParentName}
                    onChange={(e) => setFParentName(e.target.value)}
                  />
                  <ParentPhoneInput
                    type="text"
                    placeholder="부 전화번호"
                    maxLength={13}
                    value={fParentPhone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      setFParentPhone(formatted);
                    }}
                  />
                </InputArea>
              </Area>
              <Area>
                <SpanArea>
                  <Span>모 정보</Span>
                  <Span>:</Span>
                </SpanArea>
                <InputArea>
                  <ParentNameInput
                    type="text"
                    placeholder="모 이름"
                    value={mParentName}
                    onChange={(e) => setMParentName(e.target.value)}
                  />
                  <ParentPhoneInput
                    type="text"
                    placeholder="모 전화번호"
                    maxLength={13}
                    value={mParentPhone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      setMParentPhone(formatted);
                    }}
                  />
                </InputArea>
              </Area>
            </ModalTextContainer>
            <ModalFileContainer>
              <Label>아동 프로필 이미지 등록</Label>
              <PreviewRow>
                <PreviewImage src={previewUrl} alt="프로필 미리보기" />
                <UploadButton type="button" onClick={() => document.getElementById('profile-upload').click()}>
                  파일 선택
                </UploadButton>
                <HiddenInput
                  id="profile-upload"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleImageChange}
                />
              </PreviewRow>
              <FileInfo>
                <InfoText>사이즈: 150 x 150 픽셀, 파일 형식: JPG, JPEG, PNG, 용량: 200KB 이하</InfoText>
              </FileInfo>
            </ModalFileContainer>
          </ModalMain>
        </ModalContent>
        <ModalFooter>
          <Button className="add" onClick={handleAddSubmit}>
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
  height: 70%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.orange};
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

const ModalTitle = styled.div`
  display: flex;
  justify-content: start;
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
  height: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
`;

const ModalTextContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const Area = styled.div`
  width: 100%;
  height: 20%;
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

const ParentNameInput = styled.input.attrs({ type: 'text' })`
  width: 25%;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  padding: ${({ theme }) => theme.spacing[1]};
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ParentPhoneInput = styled.input.attrs({ type: 'text' })`
  width: 70%;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  padding: ${({ theme }) => theme.spacing[1]};
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ModalFileContainer = styled.div`
  width: 100%;
  height: 40%;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const PreviewRow = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const UploadButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  height: 40px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[800]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  width: 100%;
  height: 20%;
`;

const InfoText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  line-height: 1.4;
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

export default ChildAddModal;
