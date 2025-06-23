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
import { useSignUpStore } from '../../../store/signupStore';
import { useCenterList } from '../../../hook/useCenterList';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParentInfoForm } from '../../../hook/signup/useParentInfoForm';
import { memberService } from '../../../api/member';
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

const SignUpChildInfo = () => {
  const currentStep = 2;
  const navigate = useNavigate();
  const type = useSignUpStore((state) => state.type);
  const basicInfo = useSignUpStore((state) => state.basicInfo);

  const { centers, loading } = useCenterList();

  const [enrollChild, setEnrollChild] = useState(true);
  const [phone, setPhone] = useState('');
  const { register, handleSubmit, setValue, errors, control, clearErrors } = useParentInfoForm(enrollChild);

  useEffect(() => {
    if (!enrollChild) {
      setValue('centerNo', null);
      setValue('childName', '');
      setValue('childRRNFront', '');
      setValue('childRRNBack', '');
      setValue('childImg', null);
      setValue('parentInfo.fatherName', '');
      setValue('parentInfo.fatherPhone', '');
      setValue('parentInfo.motherName', '');
      setValue('parentInfo.motherPhone', '');
    }
  }, [enrollChild, setValue]);

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
      //아동정보
      center_no: data.centerNo,
      child_name: data.childName,
      child_RNo: `${data.childRRNFront}-${data.childRRNBack}`,
      child_profile: data.childImg || null,
      //부모정보
      father_name: data.parentInfo.fatherName,
      father_phone: data.parentInfo.fatherPhone,
      mother_name: data.parentInfo.motherName,
      mother_phone: data.parentInfo.motherPhone,
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignUpProgressBar steps={getStepsByType(type)} currentStep={currentStep} />
        <RadioDiv>
          <label>
            <input
              type="radio"
              name="receiveChildInfo"
              value="yes"
              checked={enrollChild}
              onChange={() => setEnrollChild(true)}
            />
            새로운 아동을 등록합니다.
          </label>
          <label>
            <input
              type="radio"
              name="receiveChildInfo"
              value="no"
              checked={enrollChild === false}
              onChange={() => {
                setEnrollChild(false);
                toast.info('연결할 아동의 시설과 주민등록번호를 입력해주세요.');
              }}
            />
            이미 등록된 아동이 있습니다.
          </label>
        </RadioDiv>
        <CenterSearchInput
          label="아동 시설 검색"
          data={centers}
          loading={loading}
          onSelect={(centerNo) => setValue('centerNo', centerNo)}
          error={errors.centerNo?.message}
          {...register('centerNo')}
        />
        <SignUpInput
          type="text"
          description="아동명을 정확하게 입력해주세요."
          label="아동 이름"
          disabled={!enrollChild}
          {...register('childName')}
          error={errors.childName?.message}
        />
        <ChildRRNInput label="아동 주민등록번호" register={register} errors={errors} />
        <ProfileImageUpload
          label="아동 사진 등록"
          disabled={!enrollChild}
          onChange={(file) => {
            setValue('childImg', file); // ✅ 파일 수동 세팅
            clearErrors('childImg'); // 선택: 에러 클리어
          }}
          error={errors.childImg?.message}
        />
        <ParentInfoInput
          value={phone}
          onChange={(val) => {
            setPhone(val);
          }}
          disabled={!enrollChild}
          register={register}
          errors={errors}
          control={control}
        />
        <NextButton type="submit">가입완료</NextButton>
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

const RadioDiv = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
