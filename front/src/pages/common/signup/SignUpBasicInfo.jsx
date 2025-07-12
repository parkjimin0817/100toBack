import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import SignUpInput from './components/SignUpInput';
import { useState } from 'react';
import styled from 'styled-components';
import ProfileImageUpload from './components/ProfileImageUpload';
import PhoneInput from './components/PhoneInput';
import NextButton from './components/NextButton';
import { useBasicInfoForm } from '../../../hook/signup/useBasicInfoForm';
import { useSignUpStore } from '../../../store/signupStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { memberService } from '../../../api/member';
import AddressInput from './components/AddressInput';
import { smsService } from '../../../api/sms';
import { useTimer } from '../../../components/useTimer';

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
const SignUpBasicInfo = () => {
  const currentStep = 1;
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, setError, clearErrors, errors, isSubmitting } =
    useBasicInfoForm();
  const type = useSignUpStore((state) => state.type);
  const setBasicInfo = useSignUpStore((state) => state.setBasicInfo);

  const [fullAddress, setFullAddress] = useState('');
  const [birthdate, setBirthdate] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [phone, setPhone] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const [auth, setAuth] = useState({
    auth_number: '',
  });

  const [authAccess, setAuchAccess] = useState(false);
  const [access, setAccess] = useState(false);

  //타이머
  const onTimeout = () => {
    toast.error('인증 시간이 만료되었습니다.');
  };

  const { formatTime, isRunning, start } = useTimer(180, onTimeout);

  const handleSendAuthNumber = () => {
    // 인증번호 전송 API 호출 로직 추가
    console.log('인증번호 전송됨');
    start(); // 타이머 시작
  };
  //

  const checkId = async () => {
    const id = getValues('memberId');
    if (!id) {
      setError('memberId', {
        type: 'manual',
        message: '아이디를 먼저 입력해주세요.',
      });
      return;
    }

    try {
      const isDuplicate = await memberService.checkId(id);
      if (isDuplicate) {
        //true이미 사용중인 아이디
        setError('memberId', {
          type: 'manual',
          message: '이미 사용 중인 아이디입니다.',
        });
        setIsChecked(false);
      } else {
        clearErrors('memberId');
        setIsChecked(true);
        setError('memberId', {
          type: 'manual',
          message: '사용 가능한 아이디입니다.',
        });
      }
    } catch (err) {
      toast.error('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleBirthChange = (key, value) => {
    const updated = { ...birthdate, [key]: value };
    setBirthdate(updated);

    const { year, month, day } = updated;
    if (year && month && day) {
      const formatted = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setValue('birthdate', formatted);
    }
  };

  const onSubmit = (data) => {
    if (!access) {
      toast.warning('인증을 하셔야합니다.');
      return;
    }

    if (!isChecked) {
      setError('memberId', {
        type: 'manual',
        message: '아이디 중복 확인을 해주세요.',
      });
      return;
    }
    const { confirmPassword, ...rest } = data;
    setBasicInfo(rest);
    console.log(data);
    navigate(`/signup/${type}`);
  };

  //본인 인증 용 인증번호
  const onSubmitAuthNum = async () => {
    if (!phone || phone.length !== 13) {
      setError('전화번호를 입력하지 않았거나 11자리가 아닙니다.');
      toast.warning('전화번호를 입력하지 않았거나 11자리가 아닙니다.');
      return;
    }

    try {
      setError('');
      const phoneAccess = await smsService.signUpAuth(phone);

      if (!phoneAccess) {
        throw new Error('인증번호를 전송에 실패하였습니다.');
      }

      handleSendAuthNumber();
      setAuchAccess(true);
      setAuth(phoneAccess);

      toast.success('인증번호를 전송하였습니다.');
    } catch (error) {
      setError('인증번호를 전송에 실패하였습니다.');
      toast.error('인증번호를 전송에 실패하였습니다.');
    }
  };

  //인증확인
  const submitAuth = async () => {
    try {
      const promiss = await smsService.phoneAccess(auth);
      if (!promiss) {
        throw new Error('인증 실패하였습니다.');
      }

      setAccess(promiss);
      toast.success('인증 성공하였습니다.');
    } catch (error) {
      toast.error('인증 실패하였습니다.');
    }
  };

  return (
    <CommonFind>
      <SignUpProgressBar steps={getStepsByType(type)} currentStep={currentStep} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          type="text"
          label="아이디"
          description="영문 소문자, 숫자를 포함해 6~15문자로 입력해주세요."
          showCheckButton
          onClickCheck={checkId}
          {...register('memberId', {
            onChange: () => {
              setIsChecked(false);
              clearErrors('memberId');
            },
          })}
          error={errors.memberId?.message}
        />
        <SignUpInput
          type="password"
          label="비밀번호"
          description="최소 8문자 이상 입력해주세요."
          {...register('password')}
          error={errors.password?.message}
        />
        <SignUpInput
          type="password"
          label="비밀번호 확인"
          description="비밀번호를 다시 한 번 입력해주세요."
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <SignUpInput
          type="text"
          label="이름"
          description="이름을 입력해주세요."
          {...register('memberName')}
          error={errors.memberName?.message}
        />
        <BirthWrapper>
          <BirthLabel>생년월일</BirthLabel>
          <SelectWrapper>
            <Select value={birthdate.year} onChange={(e) => handleBirthChange('year', e.target.value)}>
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

            <Select value={birthdate.month} onChange={(e) => handleBirthChange('month', e.target.value)}>
              <option value="">월</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>

            <Select value={birthdate.day} onChange={(e) => handleBirthChange('day', e.target.value)}>
              <option value="">일</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </SelectWrapper>
          {errors.birthdate && <ErrorMessage>{errors.birthdate.message}</ErrorMessage>}
        </BirthWrapper>
        <AddressInput
          onAddressChange={(val) => {
            setFullAddress(val); // 로컬 상태
            setValue('fullAddress', val); // ✅ 폼에도 주입
          }}
          error={errors.fullAddress?.message}
        />
        <ProfileImageUpload
          label="본인 사진 등록"
          onChange={(file) => {
            setValue('profileImg', file); // ✅ 파일 수동 세팅
            clearErrors('profileImg'); // 선택: 에러 클리어
          }}
          error={errors.profileImg?.message}
        />
        <PhoneInput
          label="전화번호"
          value={phone}
          onSubmitAuthNum={onSubmitAuthNum}
          onChange={(val) => {
            setPhone(val);
            setValue('phone', val);
          }}
          onClick={() => console.log('인증 요청')}
          error={errors.phone?.message}
        />

        {authAccess && (
          <SignUpInput
            type="text"
            value={auth.auth_number || ''} // undefined 방지
            onChange={(e) => {
              // e가 이벤트인지, 문자열인지 구분
              const value = e?.target ? e.target.value : e;
              setAuth((prev) => ({
                ...prev,
                auth_number: value,
              }));
            }}
            description="인증번호를 입력해주세요"
            showAuthCheckButton
            submitAuth={submitAuth}
            error={errors.authNumber?.message}
          />
        )}

        {isRunning && (
          <div style={{ marginTop: '10px', fontSize: '18px', color: '#F36B4D' }}>남은 시간: {formatTime()}</div>
        )}
        <NextButton type="submit">다음 단계</NextButton>
      </Form>
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

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BirthLabel = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
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
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
  text-align: left;
`;
