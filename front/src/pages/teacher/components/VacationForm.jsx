import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../../components/Common/ContentHeader';
import { useRef, useState } from 'react';
import { useVacationForm } from '../../../hook/vacation/useVacationForm';

const VacationForm = () => {
  const {
    type,
    typeDetail,
    customDetail,
    fileNames,
    fileInputRef,
    startDate,
    endDate,
    reason,
    getDetailOptions,
    handleTypeChange,
    handleDetailChange,
    handleFileChange,
    handleButtonClick,
    handleSubmit,
    setCustomDetail,
    setStartDate,
    setEndDate,
    setReason,
  } = useVacationForm();

  return (
    <Wrapper>
      <ContentHeader Title="휴가 / 워케이션 신청하기" Color="blue" FontSize="lg" />
      <Form onSubmit={handleSubmit}>
        <InputRow>
          <Label>종류 : </Label>
          <Select value={type} onChange={handleTypeChange}>
            <option value="">선택하세요</option>
            <option value="휴가">휴가</option>
            <option value="워케이션">워케이션</option>
          </Select>
          <Select value={typeDetail} onChange={handleDetailChange} disabled={!type}>
            <option value="">선택하세요</option>
            {(getDetailOptions() || []).map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
          {typeDetail === '기타' && (
            <Input
              type="text"
              placeholder="직접입력"
              value={customDetail}
              onChange={(e) => setCustomDetail(e.target.value)}
            />
          )}
        </InputRow>
        <InputRow>
          <Label>날짜 : </Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Text>-</Text>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </InputRow>
        <InputRow>
          <Label>사유 : </Label>
          <InputTextArea value={reason} onChange={(e) => setReason(e.target.value)} />
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
