import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { classService } from '../../../api/class';
import { toast } from 'react-toastify';
import { memberService } from '../../../api/member';

const CreateClassModal = ({ onClose, centerNo }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (!centerNo) return;

    memberService
      .teacherlist(centerNo)
      .then((data) => setTeachers(data))
      .catch((err) => console.error('교사 목록 불러오기 실패 : ', err));
  }, [centerNo]);

  console.log(teachers);

  const [classImage, setClassImage] = useState(null); //반 이미지
  const [previewUrl, setPreviewUrl] = useState(null);

  const [className, setClassName] = useState(''); //반 이름
  const [capacity, setCapacity] = useState(''); //반 정원
  const [teacherNo, setTeacherNo] = useState(''); //선택된 멤버 no
  const [classColor, setClassColor] = useState('#FFD700'); //반 색상

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

  const handleSubmit = async () => {
    if (!className || !capacity || !teacherNo) {
      toast.info('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      await classService.createClass({
        className,
        capacity,
        teacherNo,
        classColor,
        centerNo,
        classImage,
      });
      toast.info(`${className}반 생성이 완료되었습니다.`);
      onClose();
    } catch (error) {
      console.error('반 생성 실패 : ', error);
      toast.error('반 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Overlay>
      <ModalCard>
        <TitleDiv>
          <Title>반 생성 하기</Title>
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
              <option value="선택">선택</option>
              {teachers.map((teacher) => (
                <option key={teacher.member_no} value={teacher.member_no}>
                  {teacher.name}
                </option>
              ))}
            </Select>
          </InputRow>
          <InputRow>
            <Label>반 이미지 :</Label>
            <FileDiv>
              {previewUrl && <PreviewImage src={previewUrl} alt="미리보기" />}
              <FileInput type="file" accept="image/*" onChange={handleImageChange} />
            </FileDiv>
          </InputRow>
          <InputRow>
            <Label>반 색상 :</Label>
            <Input type="color" value={classColor} onChange={(e) => setClassColor(e.target.value)} />
          </InputRow>
        </Content>
        <ButtonGroup>
          <Button type="close" onClick={onClose}>
            닫기
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            완료
          </Button>
        </ButtonGroup>
      </ModalCard>
    </Overlay>
  );
};

export default CreateClassModal;

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
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: flex-start;
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
  width: 40%;
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.blue};
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
