import React from 'react';
import styled from 'styled-components';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import CenterSearchInput from './components/CenterSearchInput';
import NextButton from './components/NextButton';
import SignUpInput from './components/SignUpInput';
import AddressInput from './components/AddressInput';
import CenterTypeSelect from './components/CenterTypeSelect';
import { useSignUpStore } from '../../../store/signupStore';

const getStepsByType = (type) => {
  switch (type) {
    case 'teacher':
      return ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];
    case 'parent':
      return ['약관 동의', '기본 정보 입력', '아동 정보 입력', '가입 완료'];
    case 'manager':
      return ['약관 동의', '기본 정보 입력', '시설 정보 입력', '가입 완료'];
  }
};

const SignUpCenterInfo = () => {
  const currentStep = 2;
  const type = useSignUpStore((state) => state.type);
  return (
    <CommonFind>
      <SignUpProgressBar steps={getStepsByType(type)} currentStep={currentStep} />
      <Form>
        <SignUpInput type="text" label="시설명" description="시설명을 정확하게 입력해주세요" />
        <AddressInput />
        <CenterTypeSelect />
        <SignUpInput type="text" label="시설 연락처" description="'-'를 제외하고 연락처를 입력해주세요." />
        <NextButton to="/signup/complete">가입하기</NextButton>
      </Form>
    </CommonFind>
  );
};

export default SignUpCenterInfo;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
