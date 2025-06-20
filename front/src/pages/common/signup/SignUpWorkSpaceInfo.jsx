import React, { useState } from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import SignUpInput from './components/SignUpInput';
import CenterSearchInput from './components/CenterSearchInput';
import NextButton from './components/NextButton';
import styled from 'styled-components';
import { useSignUpStore } from '../../../store/signupStore';
import { useCenterList } from '../../../hook/useCenterList';
import { useTeacherInfoForm } from '../../../hook/signup/useTeacherInfoForm';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../../../api/member';
import { toast } from 'react-toastify';

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

const SignUpWorkSpaceInfo = () => {
  const currentStep = 2;
  const navigate = useNavigate();
  const type = useSignUpStore((state) => state.type);
  const { centers, loading } = useCenterList();

  const { handleSubmit, setValue, errors, isSubmitting } = useTeacherInfoForm();

  const onSubmit = async (data) => {
    //store에서 모든 값 가져오기
    const { type, basicInfo } = useSignUpStore.getState();
    const mergedData = {
      member_name: basicInfo.memberName,
      member_id: basicInfo.memberId,
      member_pwd: basicInfo.password,
      member_phone: basicInfo.phone,
      member_profile: basicInfo.profileImg,
      member_birth: basicInfo.birthdate,
      member_type: type.toUpperCase(),
      center_no: data.centerNo,
    };
    console.log('데이터 최종 : ', mergedData);
    try {
      await memberService.signUp(mergedData);
    } catch (err) {
      console.error('회원가입 에러:', err);
      toast.error('회원 가입 중 오류가 발생했습니다.');
    }
    navigate('/signup/complete');
  };

  return (
    <CommonFind>
      <SignUpProgressBar steps={getStepsByType(type)} currentStep={currentStep} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CenterSearchInput
          label="근무 시설명"
          data={centers}
          loading={loading}
          onSelect={(centerNo) => setValue('centerNo', centerNo)}
          error={errors.centerNo?.message}
        />
        <NextButton type="submit">가입하기</NextButton>
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
