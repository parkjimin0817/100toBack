import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { classService } from '../../../api/class';
import { toast } from 'react-toastify';
import { memberService } from '../../../api/member';
import theme from '../../../styles/theme';
import { getPresignedUrl, uploadFileToS3 } from '../../../api/fileApi';
import classdefaultimg from '../../../assets/classdefault.png';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const UpdateClassModal = ({ onClose, centerNo, classRoom, onSuccess, onDeleteSuccess, selectClassRoom }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (!centerNo) return;

    memberService
      .teacherlist(centerNo)
      .then((data) => {
        const exists = data.some((t) => t.member_no === classRoom.member_no);
        if (!exists && classRoom.member_no) {
          data.push({
            member_no: classRoom.member_no,
            member_name: classRoom.member_name,
          });
        }
        setTeachers(data);
      })
      .catch((err) => toast.error('교사 목록 불러오기 실패 : ', err));
  }, [centerNo]);

  const [classImage, setClassImage] = useState(classRoom.class_image); //반 이미지
  const [previewUrl, setPreviewUrl] = useState(
    classRoom.class_image ? `${CLOUDFRONT_URL}/${classRoom.class_image}` : classdefaultimg
  );
  const [className, setClassName] = useState(classRoom.class_name); //반 이름
  const [capacity, setCapacity] = useState(classRoom.capacity); //반 정원
  const [teacherNo, setTeacherNo] = useState(classRoom.member_no ?? ''); //선택된 멤버 no
  const [classColor, setClassColor] = useState(classRoom.color); //반 색상

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setClassImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDelete = async () => {
    try {
      const isConfirmed = window.confirm('확인 버튼을 누르면 반이 삭제됩니다. 삭제하시겠습니까?');
      if (!isConfirmed) return;

      await classService.deleteClass(classRoom.class_no);
      toast.info('반 삭제 성공');

      onDeleteSuccess(classRoom);
      onClose();
    } catch (error) {
      toast.error('반 삭제 실패: ', error);
    }
  };

  const handleSubmit = async () => {
    if (!className || !capacity) {
      toast.info('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      let uploadedImageUrl = null;

      // 반 이미지가 있으면 S3에 업로드
      if (classImage instanceof File) {
        const presignedData = await getPresignedUrl(classImage.name, classImage.type, 'profile/class/');
        await uploadFileToS3(presignedData.presigned_url, classImage);
        uploadedImageUrl = presignedData.change_name; // S3 경로 문자열
      }

      const payload = {
        class_no: classRoom.class_no,
        class_name: className,
        capacity: capacity,
        member_no: teacherNo || null,
        color: classColor,
        class_image: uploadedImageUrl ? uploadedImageUrl : classRoom.class_image,
      };

      await classService.updateClass(classRoom.class_no, payload);

      if (onSuccess) {
        onSuccess();
      }

      onClose();

      toast.info(`${className}반 수정이 완료되었습니다.`);
    } catch (error) {
      console.error('반 수정 실패', error);
      toast.error('반 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }

    selectClassRoom();
  };

  return (
    <Overlay>
      <ModalCard>
        <TitleDiv>
          <Title>반 수정 하기</Title>
          <CloseButton type="close" onClick={onClose}>
            닫기
          </CloseButton>
        </TitleDiv>
        <Content>
          <InputRow>
            <Label>반 이름 :</Label>
            <InputWrapper>
              <Input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
              <Unit>반</Unit>
            </InputWrapper>
          </InputRow>
          <InputRow>
            <Label>정원 :</Label>
            <InputWrapper>
              <Input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
              <Unit>명</Unit>
            </InputWrapper>
          </InputRow>
          <InputRow>
            <Label>담당 교사 : </Label>
            <Select value={teacherNo} onChange={(e) => setTeacherNo(e.target.value)}>
              <option value="">미지정</option>
              {teachers.map((teacher) => (
                <option key={teacher.member_no} value={teacher.member_no}>
                  {teacher.member_name}
                </option>
              ))}
            </Select>
          </InputRow>
          <InputRow>
            <Label>반 이미지 :</Label>
            <FileDiv>
              <PreviewImage src={previewUrl} alt="미리보기" />
              <FileInput type="file" accept="image/*" onChange={handleImageChange} />
            </FileDiv>
          </InputRow>
          <InputRow>
            <Label>반 색상 :</Label>
            {/*<Input type="color" value={classColor} onChange={(e) => setClassColor(e.target.value)} />*/}
            <ColorRow>
              <Color
                $color={theme.colors.yellow}
                onClick={() => setClassColor(theme.colors.yellow)}
                $selected={classColor === theme.colors.yellow}
              ></Color>
              <Color
                $color={theme.colors.orange}
                onClick={() => setClassColor(theme.colors.orange)}
                $selected={classColor === theme.colors.orange}
              ></Color>
              <Color
                $color={theme.colors.green}
                onClick={() => setClassColor(theme.colors.green)}
                $selected={classColor === theme.colors.green}
              ></Color>
              <Color
                $color={theme.colors.blue}
                onClick={() => setClassColor(theme.colors.blue)}
                $selected={classColor === theme.colors.blue}
              ></Color>
              <Color
                $color={theme.colors.purple}
                onClick={() => setClassColor(theme.colors.purple)}
                $selected={classColor === theme.colors.purple}
              ></Color>
              <Color
                $color={theme.colors.gray[500]}
                onClick={() => setClassColor(theme.colors.gray[500])}
                $selected={classColor === theme.colors.gray[500]}
              ></Color>
            </ColorRow>
          </InputRow>
        </Content>
        <ButtonGroup>
          <DeleteButton type="button" onClick={handleDelete}>
            삭제
          </DeleteButton>
          <Button type="submit" onClick={handleSubmit}>
            완료
          </Button>
        </ButtonGroup>
      </ModalCard>
    </Overlay>
  );
};

export default UpdateClassModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const Content = styled.div`
  width: 90%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
`;

const InputRow = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const Input = styled.input`
  width: 200px;
  padding-right: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  padding: 5px 10px;
`;

const FileDiv = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileInput = styled.input`
  font-size: 0;
  border: none;
  background: none;
  padding: 0;
  width: 90px;

  &::file-selector-button {
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.colors.gray[300]};
    border: 1px solid ${({ theme }) => theme.colors.gray[400]};
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }
`;

const Unit = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[600]};
  pointer-events: none;
`;

const Select = styled.select`
  width: 200px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  padding: 5px;
  outline: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${({ theme }) => theme.spacing[5]};
`;

const Button = styled.button`
  width: 30%;
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.white};
`;

const CloseButton = styled.button`
  width: 15%;
  height: 20px;
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const DeleteButton = styled.button`
  width: 30%;
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
`;

const PreviewImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  margin-right: 10px;
`;

const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  width: 200px;
`;
const Color = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: ${({ $selected, theme }) =>
    $selected ? `3px solid ${theme.colors.black}` : `2px solid ${theme.colors.gray[300]}`};
  cursor: pointer;
  transition: 0.2s;
`;
