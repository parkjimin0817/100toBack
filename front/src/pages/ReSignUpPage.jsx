import CommonFind from '../components/Common/CommonFind';
import styled from 'styled-components';
import NextButton from '../pages/common/signup/components/NextButton';
import CenterSearchInput from '../pages/common/signup/components/CenterSearchInput';
import { useCenterList } from '../hook/useCenterList';
import { approvalListService } from '../api/approvalList';
import useLoginStore from '../store/loginStore';
import { useTeacherInfoForm } from '../hook/signup/useTeacherInfoForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUpWorkSpaceInfo = () => {
  const navigator = useNavigate();
  const { handleSubmit, setValue, errors, isSubmitting } = useTeacherInfoForm();
  const { centers, loading } = useCenterList();
  const { member } = useLoginStore();
  console.log('시설 정보', centers);

  const onSubmit = async (data) => {
    try {
      console.log(member.memberNo);
      console.log(data.centerNo);
      await approvalListService.reSignup(member.memberNo, data.centerNo);
      toast.success('시설 재가입 요청 성공하셨습니다.');
      navigator('/');
    } catch (error) {
      toast.error('시설 재가입 요청 실패하였습니다.');
    }
  };

  return (
    <CommonFind>
      <h2>시설 재가입</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CenterSearchInput
          label="근무 시설명"
          data={centers}
          loading={loading}
          onSelect={(centerNo) => setValue('centerNo', centerNo)}
          error={errors.centerNo?.message}
        />
        <NextButton type="submit">가입하기</NextButton>
      </Form>
    </CommonFind>
  );
};

export default SignUpWorkSpaceInfo;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
