import React from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import SignUpInput from './components/SignUpInput';
import { useState } from 'react';
import styled from 'styled-components';
import ProfileImageUpload from './components/ProfileImageUpload';
import PhoneInput from './components/PhoneInput';
import NextButton from './components/NextButton';

const steps = ['약관 동의', '기본 정보 입력', '아동 정보 입력', '가입 완료'];
const SignUpBasicInfo = () => {
  const currentStep = 1;
  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  });
  return (
    <CommonFind>
      <SignUpProgressBar steps={steps} currentStep={currentStep} />
      <SignUpInput type="text" label="아이디" description="영문 소문자, 숫자를 포함해 6~15문자로 입력해주세요." />
      <SignUpInput type="password" label="비밀번호" description="최소 8문자 이상 입력해주세요." />
      <SignUpInput type="password" label="비밀번호 확인" description="비밀번호를 다시 한 번 입력해주세요." />
      <SignUpInput type="text" label="이름" description="이름을 입력해주세요." />
      <BirthWrapper>
        <BirthLabel>생년월일</BirthLabel>
        <SelectWrapper>
          <Select value={birth.year} onChange={(e) => setBirth({ ...birth, year: e.target.value })}>
            <option value="">년</option>
            {Array.from({ length: 51 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </Select>

          <Select value={birth.month} onChange={(e) => setBirth({ ...birth, month: e.target.value })}>
            <option value="">월</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>

          <Select value={birth.day} onChange={(e) => setBirth({ ...birth, day: e.target.value })}>
            <option value="">일</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </SelectWrapper>
      </BirthWrapper>
      <ProfileImageUpload />
      <PhoneInput
        label="전화번호"
        placeholder="'-'제외 11자리를 입력해주세요."
        onClick={() => console.log('인증 요청')}
      />
      <SignUpInput type="text" label="" description="인증번호를 입력해주세요" />
      <NextButton to="/signup/step3">다음 단계</NextButton>
    </CommonFind>
  );
};

export default SignUpBasicInfo;

const BirthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0;
`;

const BirthLabel = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  width: 120px;
  height: 40px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 8px;
  margin-bottom: 8px;
`;
