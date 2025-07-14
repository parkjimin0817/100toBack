import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '../../store/searchStore';
import { toast } from 'react-toastify';
import { memberService } from '../../api/member';
import { smsService } from '../../api/sms';
import { useTimer } from '../../components/useTimer';

export const useSearchPwdForm2 = () => {
  const navigator = useNavigate();
  const { member } = useSearchStore();
  //이름
  const [writeName, setWriteName] = useState('');
  //전화번호
  const [writePhone, setWritePhone] = useState('');
  //인증번호
  const [writeNumber, setWriteNumber] = useState('');
  //인증 성공/실패 여부
  const [access, setAccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState('');

  //백엔드에 보낼 데이터
  const [formdata, setFormdata] = useState({
    member_id: member.member_id,
    member_name: '',
    member_phone: '',
  });

  //인증 번호 id, number
  const [auth, setAuth] = useState({
    auth_no: 0,
    auth_number: '',
  });

  //전화번호 숫자 입력 시 '-' 추가
  const formatPhoneNumber = (phone) => {
    const onlyNums = phone.replace(/\D/g, ''); // 숫자만 남기기

    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  };

  useEffect(() => {
    if (member.member_id === '') {
      alert('잘못된 접근입니다.');
      navigator('/findpwd');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setFormdata({
          ...formdata,
          member_name: value,
        });
        setWriteName(value);
        break;
      case 'phone':
        const formattedPhone = formatPhoneNumber(value);
        setFormdata({
          ...formdata,
          member_phone: formattedPhone,
        });
        setWritePhone(formattedPhone);
        break;
      case 'number':
        setAuth({
          ...auth,
          auth_number: value,
        });
        setWriteNumber(value);
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    if (writeName === '' || writePhone === '') {
      setError('이름과 전화번호는 필수 입력입니다.');
      toast.warning('이름과 전화번호는 필수 입력입니다.');
      return;
    }

    if (member.member_name !== writeName || member.member_phone !== writePhone) {
      setError('이름 혹은 전화번호가 틀립니다.');
      toast.error('이름 혹은 전화번호가 틀립니다.');
      return;
    }

    if (!access) {
      toast.warning('인증을 하셔야합니다.');
      return;
    }

    toast.success('인증되었습니다.');
    navigator('/changepwd');
  };

  //타이머
  const onTimeout = () => {
    setAuth({
      ...auth,
      auth_no: 0,
    });
    toast.error('인증 시간이 만료되었습니다.');
  };

  const { formatTime, isRunning, start } = useTimer(180, onTimeout);

  const handleSendAuthNumber = () => {
    // 인증번호 전송 API 호출 로직 추가
    console.log('인증번호 전송됨');
    start(); // 타이머 시작
  };
  //

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!writePhone || writePhone.length !== 13) {
      setError('전화번호를 입력하지 않았거나 11자리가 아닙니다.');
      toast.warning('전화번호를 입력하지 않았거나 11자리가 아닙니다.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const phoneAccess = await smsService.authCall(formdata);

      if (!phoneAccess) {
        throw new Error('인증번호를 전송에 실패하였습니다.');
      }

      setAuth(phoneAccess);

      toast.success('인증번호를 전송하였습니다.');
    } catch (error) {
      setError('인증번호를 전송에 실패하였습니다.');
      toast.error('인증번호를 전송에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitAuth = async (e) => {
    e.preventDefault();
    try {
      setIsLoading2(true);
      const promiss = await smsService.phoneAccess(auth);
      if (!promiss) {
        throw new Error('인증 실패하였습니다.');
      }

      setAccess(promiss);
      toast.success('인증 성공하였습니다.');
    } catch (error) {
      toast.error('인증 실패하였습니다.');
    } finally {
      setIsLoading2(false);
    }
  };

  return {
    writeName,
    writePhone,
    writeNumber,
    access,
    isLoading,
    isLoading2,
    error,
    auth,
    handleChange,
    handleNext,
    onSubmit,
    submitAuth,
    handleSendAuthNumber,
    formatTime,
    isRunning,
  };
};
