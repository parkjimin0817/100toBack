import { toast } from 'react-toastify';
import { memberService } from '../../api/member';
import useSearchStore from '../../store/searchStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useSearchPwdForm3 = () => {
  const navigator = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { member, pwdSelectReaction, reaction, reset } = useSearchStore();

  useEffect(() => {
    if (member.member_id === '') {
      alert('잘못된 접근입니다.');
      navigator('/findpwd');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        setPassword(value);
        break;
      case 'passwordCheck':
        setPasswordCheck(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === '' || passwordCheck === '') {
      setError('비밀번호를 입력해주세요.');
      toast.warning('비밀번호를 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      setError('비밀번호를 다시 확인해주세요.');
      toast.warning('비밀번호를 다시 확인해주세요.');
      return;
    }

    if (password.length < 8 || passwordCheck.length < 8) {
      setError('비밀번호 8자리 이상으로 입력해주세요.');
      toast.warning('비밀번호 8자리 이상으로 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const reactions = await memberService.pwdUpdate(member.member_id, password);

      pwdSelectReaction(reactions);

      toast.success('비밀번호 변경 완료');
      navigator('/');
      reset('member');
    } catch (error) {
      toast.error(reaction.reaction);
      setError(reaction.reaction);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigator,
    password,
    passwordCheck,
    error,
    isLoading,
    handleChange,
    onSubmit,
  };
};
