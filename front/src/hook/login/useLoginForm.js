import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../store/loginStore';
import { memberService } from '../../api/member';
import { toast } from 'react-toastify';
import { attendanceService } from '../../api/attendance';
import useAttendanceStore from '../../store/attendanceStore';

const loginSchema = yup.object().shape({
  memberId: yup.string().required('아이디를 입력해주세요.'),
  memberPwd: yup.string().required('비밀번호를 입력해주세요.'),
});

export const useLoginForm = () => {
  const [checked, setChecked] = useState(false);
  const navigator = useNavigate();
  const { login } = useLoginStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAttendance } = useAttendanceStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    const { memberId, memberPwd } = formData;

    // //어드민 승인 / 거절 페이지
    // if (memberId === 'admin' && memberPwd === '1234') {
    //   navigator('approvalListAdmin');
    //   return;
    // }

    setIsLoading(true);
    setError('');
    try {
      const memberData = await memberService.login(memberId, memberPwd);

      login(memberData);
      console.log('memberData', memberData);

      if (memberData.memberType === 'MANAGER') {
        toast.success('로그인 성공하였습니다.');
        navigator('/manager/main');
      } else if (memberData.memberType === 'TEACHER' && memberData.memberStatus === 'REJECTED') {
        toast.success('가입하실 근무지를 선택해주세요.');
        navigator('/resignup');
      } else if (memberData.memberType === 'TEACHER') {
        //교사용 오늘 출퇴근 기록
        const attendance = await attendanceService.getTodayAttendance(memberData.memberNo);
        setAttendance(attendance);
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
