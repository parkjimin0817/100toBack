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
import { useNavigate } from 'react-router-dom';
import { useManagerInfoForm } from '../../../hook/signup/useManagerInfoForm';
import { useState } from 'react';
import { memberService } from '../../../api/member';
import { toast } from 'react-toastify';
import CenterPhoneInput from './components/CenterPhoneInput';

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
  const navigate = useNavigate();
  const type = useSignUpStore((state) => state.type);
  const basicInfo = useSignUpStore((state) => state.basicInfo);
  const [fullAddress, setFullAddress] = useState('');
  const [centerTel, setCenterTel] = useState('');

  const { register, handleSubmit, errors, setValue } = useManagerInfoForm();

  const onSubmit = async (data) => {
    const mergedData = {
      //멤버정보
      member_name: basicInfo.memberName,
      member_id: basicInfo.memberId,
      member_pwd: basicInfo.password,
      member_phone: basicInfo.phone,
      member_profile: basicInfo.profileImg || null,
      member_birth: basicInfo.birthdate,
      member_type: type.toUpperCase(),
      address: basicInfo.fullAddress,
      //시설정보
      center_name: data.centerName,
      center_address: data.fullAddress,
      center_type: data.centerType,
      center_tel: data.centerTel,
    };

    console.log(mergedData);

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
        <SignUpInput
          type="text"
          label="시설명"
          description="시설명을 정확하게 입력해주세요"
          {...register('centerName')}
          error={errors.centerName?.message}
        />
        <AddressInput
          onAddressChange={(val) => {
            setFullAddress(val); // 로컬 상태
            setValue('fullAddress', val); // ✅ 폼에도 주입
          }}
          error={errors.fullAddress?.message}
        />
        <CenterTypeSelect {...register('centerType')} error={errors.centerType?.message} />
        <CenterPhoneInput
          label="시설 연락처"
          value={centerTel}
          onChange={(val) => {
            setCenterTel(val);
            setValue('centerTel', val);
          }}
          error={errors.centerTel?.message}
        />
        <NextButton type="submit">가입하기</NextButton>
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
