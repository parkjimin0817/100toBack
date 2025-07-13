import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../../api/member';
import useSearchStore from '../../store/searchStore';
import { toast } from 'react-toastify';

export const useSearchPwdForm1 = () => {
  const navigator = useNavigate();
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { searchPwd } = useSearchStore();

  const handleChange = (e) => {
    const { value } = e.target;
    setId(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error('아이디를 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const member = await memberService.searchPwd(id);
      if (!member) {
        throw new Error('일치하는 아이디가 없습니다.');
      }

      searchPwd(member);

      toast.success('계정 찾기 성공했습니다.');
      navigator('/authenticationuser');
    } catch (error) {
      setError('해당 계정은 등록되어있지 않습니다.', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigator,
    id,
    error,
    isLoading,
    handleChange,
    onSubmit,
  };
};
