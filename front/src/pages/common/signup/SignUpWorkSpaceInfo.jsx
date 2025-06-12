import React from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import SignUpInput from './components/SignUpInput';
import CenterSearchInput from './components/CenterSearchInput';
import NextButton from './components/NextButton';

const steps = ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];
const SignUpWorkSpaceInfo = () => {
  const currentStep = 2;
  return (
    <CommonFind>
      <SignUpProgressBar steps={steps} currentStep={currentStep} />
      <CenterSearchInput />
      <NextButton to="/signup/complete">가입하기</NextButton>
    </CommonFind>
  );
};

export default SignUpWorkSpaceInfo;
