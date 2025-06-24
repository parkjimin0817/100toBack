import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../store/loginStore';
import { memberService } from '../../api/member';
import { toast } from 'react-toastify';

const loginSchema = yup.object().shape({
  memberId: yup.string().required('아이디를 입력해주세요.').min(6, '아이디는 최소 6자 이상이어야 합니다.'),
  memberPwd: yup.string().required('비밀번호를 입력해주세요.').min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export const useLoginForm = () => {
  const [checked, setChecked] = useState(false);
  const navigator = useNavigate();
  const { login } = useLoginStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      const { memberId, memberPwd } = formData;

      const memberData = await memberService.login(memberId, memberPwd);
      login(memberData);

      toast.success('로그인 성공하였습니다.');

      if (memberData.memberType === 'MANAGER') {
        navigator('/manager/mypage');
      } else if (memberData.memberType === 'TEACHER') {
        navigator('/teacher/main');
      } else if (memberData.memberType === 'PARENT') {
        navigator('/parent/main');
      } else if (memberData.memberType === 'ADMIN') {
        navigator('/approvalListAdmin');
      }
    } catch (err) {
      toast.error('로그인 실패하였습니다.');
      setError('로그인 실패하였습니다.');
      console.error('로그인 에러:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    checked,
    setChecked,
    error,
    isLoading,
  };
};
