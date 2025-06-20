import React from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import SignUpInput from './components/SignUpInput';
import styled from 'styled-components';
import ChildRRNInput from './components/ChildRRNInput';
import ProfileImageUpload from './components/ProfileImageUpload';
import ParentInfoInput from './components/ParentInfoInput';
import CenterSearchInput from './components/CenterSearchInput';
import NextButton from './components/NextButton';
import { useSignUpStore } from '../../../../store/signupStore';

const getStepsByRole = (role) => {
  switch (role) {
    case 'teacher':
      return ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];
    case 'parent':
      return ['약관 동의', '기본 정보 입력', '아동 정보 입력', '가입 완료'];
    case 'manager':
      return ['약관 동의', '기본 정보 입력', '시설 정보 입력', '가입 완료'];
  }
};

const SignUpChildInfo = () => {
  const currentStep = 2;
  const role = useSignUpStore((state) => state.role);
  return (
    <CommonFind>
      <Form>
        <SignUpProgressBar steps={getStepsByRole(role)} currentStep={currentStep} />
        <CenterSearchInput label="아동 시설 검색" />
        <SignUpInput type="text" description="아동명을 정확하게 입력해주세요." label="아동 이름" />
        <ChildRRNInput label="아동 주민등록번호" />
        <ProfileImageUpload label="아동 사진 등록" />
        <ParentInfoInput />
        <NextButton to="/signup/complete">가입완료</NextButton>
      </Form>
    </CommonFind>
  );
};

export default SignUpChildInfo;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
