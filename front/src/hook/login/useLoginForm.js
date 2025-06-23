import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../store/loginStore';
import { memberService } from '../../api/member';

const loginSchema = yup.object().shape({
  memberId: yup
    .string()
    .min(6, '6자 이상 입력해주세요.')
    .matches(/^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/, '특수문자와 숫자가 없어야합니다.')
    .required('아이디를 입력해주세요.'),
  memberPwd: yup
    .string()
    .min(8, '8자 이상 입력해주세요.')
    .matches(/^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/, '특수문자와 숫자가 없어야합니다.')
    .required('비밀번호를 입력해주세요.'),
});

export const useLoginForm = () => {
  const [checked, setChecked] = useState(false);
  const navigator = useNavigate();
  const { login } = useLoginStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const { memberId, memberPwd } = formData;

      const memberData = await memberService.login(memberId, memberPwd);
      login(memberData);

      if (memberData.memberType === 'MANAGER') {
        navigator('/manager/mypage');
      } else if (memberData.memberType === 'TEACHER') {
        navigator('/teacher/main');
      } else if (memberData.memberType === 'PARENT') {
        navigator('/parent/main');
      }
    } catch (err) {
      console.error('로그인 에러:', err.message);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    checked,
    setChecked,
  };
};
