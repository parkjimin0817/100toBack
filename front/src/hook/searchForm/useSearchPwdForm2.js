import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '../../store/searchStore';
import { toast } from 'react-toastify';
import { memberService } from '../../api/member';

export const useSearchPwdForm2 = () => {
  const navigator = useNavigate();
  const { member, reset, phoneAccess, savePhoneAccess } = useSearchStore();
  const [writeName, setWriteName] = useState('');
  const [writePhone, setWritePhone] = useState('');
  const [writeNumber, setWriteNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [access, setAccess] = useState(false);

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
        setWriteName(value);
        break;
      case 'phone':
        const formattedPhone = formatPhoneNumber(value);
        setWritePhone(formattedPhone);
        break;
      case 'number':
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

    if (writeNumber !== phoneAccess.number) {
      setError('인증번호를 다시 입력해주세요.');
      toast.error('인증번호를 다시 입력해주세요.');
      return;
    }

    toast.success('인증되었습니다.');
    navigator('/changepwd');
    reset('access');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!writePhone || writePhone.length !== 13) {
      setError('전화번호를 입력하지 않았거나 13자리가 아닙니다.');
      toast.warning('전화번호를 입력하지 않았거나 13자리가 아닙니다.');
      return;
    } else {
      setAccess(true);
    }

    try {
      setIsLoading(true);
      setError('');
      const phoneAccess = await memberService.phoneAccess(writePhone);

      if (phoneAccess.number === '') {
        throw new Error('인증번호를 전송에 실패하였습니다.');
      }

      savePhoneAccess(phoneAccess);

      toast.success('인증번호를 전송하였습니다.');
    } catch (error) {
      setError('인증번호를 전송에 실패하였습니다.');
      toast.error('인증번호를 전송에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    writeName,
    writePhone,
    writeNumber,
    isLoading,
    error,
    access,
    handleChange,
    handleNext,
    onSubmit,
  };
};
