import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../../components/Common/ContentHeader';
import { useRef, useState } from 'react';

const VacationForm = () => {
  //휴가/워케이션 셀렉트 바
  const [mainType, setMainType] = useState('');
  const [subType, setSubType] = useState('');
  const [customInput, setCustomInput] = useState('');

  const vacationOptions = [
    { value: '연차', label: '연차' },
    { value: '병가', label: '병가' },
    { value: '경조', label: '경조' },
    { value: '반차', label: '반차' },
    { value: '기타', label: '기타 (직접 입력)' },
  ];

  const workcationOptions = [
    { value: '사전답사', label: '사전답사' },
    { value: '세미나 참석', label: '세미나 참석' },
    { value: '기타', label: '기타 (직접 입력)' },
  ];

  const handleMainChange = (e) => {
    setMainType(e.target.value);
    setSubType('');
    setCustomInput('');
  };

  const handleSubChange = (e) => {
    setSubType(e.target.value);
    if (e.target.value !== '기타') {
      setCustomInput('');
    }
  };

  const getSubOptions = () => {
    if (mainType === '휴가') return vacationOptions;
    if (mainType == '워케이션') return workcationOptions;
  };

  //파일 업로드
  const fileInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const names = files.map((file) => file.name);
    setFileNames(names);
  };

  return (
    <Wrapper>
      <ContentHeader Title="휴가 / 워케이션 신청하기" Color="blue" FontSize="lg" />
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputRow>
          <Label>종류 : </Label>
          <Select value={mainType} onChange={handleMainChange}>
            <option value="">선택하세요</option>
            <option value="휴가">휴가</option>
            <option value="워케이션">워케이션</option>
          </Select>
          <Select value={subType} onChange={handleSubChange} disabled={!mainType}>
            <option value="">선택하세요</option>
            {(getSubOptions() || []).map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
          {subType === '기타' && (
            <Input
              type="text"
              placeholder="직접입력"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
          )}
        </InputRow>
        <InputRow>
          <Label>날짜 : </Label>
          <Input type="date" />
          <Text>-</Text>
          <Input type="date" />
        </InputRow>
        <InputRow>
          <Label>사유 : </Label>
          <InputTextArea />
        </InputRow>
        <InputRow>
          <Label>첨부파일 : </Label>
          <HiddenInput type="file" multiple ref={fileInputRef} onChange={handleFileChange} />
          <FileName>{fileNames.join(', ')}</FileName>
          <Button type="button" onClick={handleButtonClick}>
            파일 업로드
          </Button>
        </InputRow>
        <ButtonRow>
          <Button type="submit">신청하기</Button>
        </ButtonRow>
      </Form>
    </Wrapper>
  );
};

export default VacationForm;

const Wrapper = styled.div`
  width: 70%;
  min-width: 500px;
  height: 360px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  width: 100%;
  min-width: 500px;
`;

const InputRow = styled.div`
  display: flex;
  margin: 15px 20px 15px 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Label = styled.label`
  min-width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
const Text = styled.span`
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Select = styled.select`
  outline: none;
  width: 130px;
  height: 30px;
  min-width: 100px;
  padding: 5px;
  border-radius: 8px;
  margin-right: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const Input = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 8px;
  outline: none;
  padding: 5px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const InputTextArea = styled.textarea`
  width: 500px;
  height: 100px;
  border-radius: 8px;
  resize: none;
  outline: none;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 6px 14px;
  width: 100px;
  height: 30px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #2d869e;
  }
`;

const FileName = styled.span`
  width: 300px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  padding: 5px;
  margin: 0 10px 0 0;
  overflow: auto;
  text-overflow: ellipsis;
  color: #666;
`;
