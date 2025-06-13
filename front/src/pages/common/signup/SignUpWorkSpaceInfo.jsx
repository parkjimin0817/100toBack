import React from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import SignUpInput from './components/SignUpInput';
import CenterSearchInput from './components/CenterSearchInput';
import NextButton from './components/NextButton';
import styled from 'styled-components';

const steps = ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];
const SignUpWorkSpaceInfo = () => {
  const currentStep = 2;
  return (
    <CommonFind>
      <SignUpProgressBar steps={steps} currentStep={currentStep} />
      <Form>
        <CenterSearchInput label="근무 시설명" />
        <NextButton to="/signup/complete">가입하기</NextButton>
      </Form>
    </CommonFind>
  );
};

export default SignUpWorkSpaceInfo;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
