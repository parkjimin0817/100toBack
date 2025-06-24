import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const managerInfoSchema = yup.object().shape({
  centerName: yup.string().required('시설명을 입력해주세요.'),
  fullAddress: yup.string().required('주소를 입력해주세요.'),
  centerType: yup.string().required('시설 유형을 선택해주세요'),
  centerTel: yup
    .string()
    .matches(/^(01[016789]|0\d{1,2})-\d{3,4}-\d{4}$/, '유효한 전화번호 형식을 입력하세요.')
    .required('시설 전화번호를 입력해주세요'),
});

export const useManagerInfoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(managerInfoSchema),
    mode: 'onBlur',
  });
  return {
    register,
    handleSubmit,
    setValue,
    errors,
  };
};
