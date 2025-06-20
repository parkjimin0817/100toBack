import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const teacherInfoSchema = yup.object({
  centerNo: yup.number().required('근무 시설을 선택해주세요.'),
});

export const useTeacherInfoForm = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(teacherInfoSchema),
    mode: 'onChange',
    defaultValues: {
      centerNo: null,
    },
  });

  return {
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
  };
};
