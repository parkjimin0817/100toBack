import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import defaultimg from '../../assets/defaultimg.png';
import { toast } from 'react-toastify';
import { getPresignedUrl, uploadFileToS3 } from '../../api/fileApi';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const infodata = {
  imageUrl: defaultimg,
};

const MemberBasicInfo = ({ editableInfo, isEditing, onProfileUpdate, onChange }) => {
  // 프로필 사진 관련 상태
  const [data, setData] = useState(infodata);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // 기본 정보 관련 상태
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  // 프로필 사진 클릭 이벤트
  const handleImgClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 프로필 사진 변경 이벤트
  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsUploading(true);

    try {
      // 미리보기 표시
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);

      // S3 업로드 - memberType에 따른 경로 설정
      let presignedUrl, changeName;
      if (editableInfo.memberType === 'MANAGER') {
        const result = await getPresignedUrl(file.name, file.type, 'profile/manager/');
        presignedUrl = result.presigned_url;
        changeName = result.change_name;
      } else if (editableInfo.memberType === 'TEACHER') {
        const result = await getPresignedUrl(file.name, file.type, 'profile/teacher/');
        presignedUrl = result.presigned_url;
        changeName = result.change_name;
      } else if (editableInfo.memberType === 'PARENT') {
        const result = await getPresignedUrl(file.name, file.type, 'profile/parent/');
        presignedUrl = result.presigned_url;
        changeName = result.change_name;
      }

      await uploadFileToS3(presignedUrl, file);

      // 부모 컴포넌트에 업데이트된 파일명 전달
      if (onProfileUpdate) {
        onProfileUpdate(changeName);
      }

      toast.success('프로필 이미지가 업로드되었습니다.');
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);

      // 에러 타입에 따른 구체적인 메시지
      if (error.message.includes('S3 업로드 실패')) {
        toast.error('파일 업로드에 실패했습니다. 네트워크 연결을 확인해주세요.');
      } else if (error.response?.status === 404) {
        toast.error('업로드 서비스를 찾을 수 없습니다. 관리자에게 문의해주세요.');
      } else if (error.response?.status === 401) {
        toast.error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        toast.error('프로필 이미지 업로드에 실패했습니다.');
      }

      // 업로드 실패 시 원래 이미지로 복원
      setData({ ...data, imageUrl: editableInfo.memberProfile ? `${CLOUDFRONT_URL}/${editableInfo.memberProfile}` : defaultImg });
    } finally {
      setIsUploading(false);
    }
  };

  // 기존 주소 데이터가 있으면 분리해서 설정
  useEffect(() => {
    if (editableInfo?.address) {
      const addressParts = editableInfo.address.split(', ');
      if (addressParts.length >= 2) {
        setAddress(addressParts[0]);
        setDetail(addressParts[1]);
      } else {
        setAddress(editableInfo.address);
        setDetail('');
      }
    }
    if (editableInfo?.zonecode) {
      setZonecode(info.zonecode);
    }
  }, [editableInfo]);

  const handleChange = (field, value) => {
    if (!isEditing) return;
    onChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 주소 변경 시 전체 주소 업데이트
  useEffect(() => {
    if (isEditing) {
      const fullAddress = detail ? `${address}, ${detail}`.trim() : address;
      handleChange('address', fullAddress);
      if (zonecode) {
        handleChange('zonecode', zonecode);
      }
    }
  }, [address, detail, zonecode, isEditing]);

  if (!editableInfo) return null;

  const openAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 기능이 로딩되지 않았어요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        setZonecode(data.zonecode);
        setAddress(data.address);
        setDetail('');
      },
    }).open();
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  return (
    <MemberBasicInfoContainer>
      <Wrapper>
        <ImageWrapper onClick={handleImgClick}>
          <MemberProfileImg 
            src={editableInfo.memberProfile ? 
              `${CLOUDFRONT_URL}/${editableInfo.memberProfile}` : 
              defaultimg}
            alt="아동 프로필"
          />
          {isEditing && !isUploading && <Overlay>+</Overlay>}
          {isUploading && <UploadingOverlay>업로드 중...</UploadingOverlay>}
        </ImageWrapper>
        {isEditing && <HiddenInput type="file" accept="image/*" ref={fileInputRef} onChange={handleImgChange} />}
      </Wrapper>

      <MemberInfoContainer>
          {isEditing ? (
            <EditBox>
              <EditLabel>이름</EditLabel>
              <EditInput 
                type="text" 
                placeholder='이름을 입력해주세요.' 
                value={editableInfo.memberName} 
                onChange={(e) => handleChange('memberName', e.target.value)}
              />
            </EditBox>
          ) : (
            <MemberNameAndClass>
              {editableInfo.memberName}
            </MemberNameAndClass>
          )}
        <MemberInfoBox>
          {isEditing ? (
            <EditBox>
              <EditLabel>생년월일</EditLabel>
              <EditInput 
                type="date" 
                value={editableInfo.memberBirth} 
                onChange={(e) => handleChange('memberBirth', e.target.value)}
              />
            </EditBox>
          ) : (
            <>
              <MemberInfoLabel>생년월일</MemberInfoLabel>
              <MemberInfoSpan>{editableInfo.memberBirth}</MemberInfoSpan>
            </>
          )}
        </MemberInfoBox>
        <MemberInfoBox>
          {isEditing ? (
            <AddressContainer>
              <AddressRow>
                <ShortInput type="text" placeholder="우편번호" value={zonecode} readOnly />
                <SearchButton type="button" onClick={openAddressSearch}>
                  주소 검색
                </SearchButton>
              </AddressRow>
              <LongInput type="text" placeholder="기본주소" value={address} readOnly />
              <LongInput type="text" placeholder="상세주소" value={detail} onChange={handleDetailChange} />
            </AddressContainer>
          ) : (
            <>
              <MemberInfoLabel>주소</MemberInfoLabel>
              <MemberInfoSpan>{editableInfo.address}</MemberInfoSpan>
            </>
          )}
        </MemberInfoBox>
      </MemberInfoContainer>
      <MemberInfoContainer>
        <MemberNameAndClass>{editableInfo.memberType === 'TEACHER' ? '교사' : editableInfo.memberType === 'MANAGER' ? '시설장' : editableInfo.memberType === "PARENT" ? '학부모' : "불명"}</MemberNameAndClass>
        <MemberInfoBox>
          {isEditing ? (
            <EditBox>
              <EditLabel>연락처</EditLabel>
              <EditInput 
                value={editableInfo.memberPhone} 
                onChange={(e) => handleChange('memberPhone', e.target.value)}
              />
            </EditBox>
          ) : (
            <>
              <MemberInfoLabel>연락처</MemberInfoLabel>
              <MemberInfoSpan>{editableInfo.memberPhone}</MemberInfoSpan>
            </>
          )}
        </MemberInfoBox>
      </MemberInfoContainer>
    </MemberBasicInfoContainer>
  )
}

export default MemberBasicInfo;

const Wrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(68, 68, 68, 0.2);
  color: white;
  font-size: 48px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(68, 68, 68, 0.7);
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const MemberBasicInfoContainer = styled.div`
  display: flex;
  padding : 30px;
`;

const MemberProfileImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 40px;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 10px;
`;

const MemberNameAndClass = styled.h2``;

const MemberInfoBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const MemberInfoLabel = styled.label`
  text-align: left;
  min-width : 80px;
  font-weight: bold;
`;

const MemberInfoSpan = styled.span``;

const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 30px;
`;

const EditLabel = styled.label`
  text-align: start;
  font-weight: bold;
`;

const EditInput = styled.input`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
`;

// 주소 선택 UI
const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
  padding-right: 30px;
`;

const AddressRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ShortInput = styled.input`
  flex: 1;
  height: 40px;
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const LongInput = styled.input`
  width: 100%;
  height: 40px;
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing[0]} ${({ theme }) => theme.spacing[2]};
  height: 40px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;