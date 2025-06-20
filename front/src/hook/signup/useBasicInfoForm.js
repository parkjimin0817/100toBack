import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const FILE_SIZE = 200 * 1024; //200kb
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const basicInfoSchema = yup.object().shape({
  memberId: yup
    .string()
    .min(6, '아이디는 6자 이상으로 입력해주세요.')
    .max(15, '아이디는 15자 이하로 입력해주세요.')
    .required('아이디를 입력해주세요'),
  password: yup.string().min(8, '비밀번호는 8문자 이상으로 입력해주세요.').required('비밀번호를 입력해주세요.'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  memberName: yup.string().required('이름을 입력해주세요.'),
  birthdate: yup.string().required('생년월일을 입력해주세요.'),
  profileImg: yup
    .mixed()
    .nullable()
    .test('fileSize', '200KB 이하 이미지만 업로드 가능합니다.', (fileList) => {
      if (!fileList || fileList.length === 0) return true;
      return fileList[0].size <= FILE_SIZE;
    })
    .test('file-type', 'JPG, JPEG, PNG 형식만 업로드 가능합니다.', (fileList) => {
      if (!fileList || fileList.length === 0) return true;
      return SUPPORTED_FORMATS.includes(fileList[0].type);
    }),
  phone: yup
    .string()
    .matches(/^01[016789]-\d{3,4}-\d{4}$/, '유효한 전화번호를 입력하세요.')
    .required('전화번호를 정확히 입력해주세요.'),
});

export const useBasicInfoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(basicInfoSchema),
    mode: 'onBlur',
  });
  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    errors,
    clearErrors,
    isSubmitting,
  };
};
