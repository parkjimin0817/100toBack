import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const FILE_SIZE = 200 * 1024; //200kb
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const parentInfoSchema = yup.object().shape({
  centerNo: yup.number().when('$enrollChild', {
    is: true,
    then: (schema) => schema.required('아동의 시설을 선택해주세요.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  childName: yup.string().when('$enrollChild', {
    is: true,
    then: (schema) => schema.required('아동 이름을 입력해주세요.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  childRRNFront: yup.string().when('$enrollChild', {
    is: true,
    then: (schema) =>
      schema
        .required('주민등록번호 앞자리를 입력해주세요.')
        .matches(/^\d{6}$/, '주민등록번호 앞자리는 6자리 숫자여야 합니다.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  childRRNBack: yup.string().when('$enrollChild', {
    is: true,
    then: (schema) =>
      schema
        .required('주민등록번호 뒷자리를 입력해주세요.')
        .matches(/^\d{7}$/, '주민등록번호 뒷자리는 7자리 숫자여야 합니다.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  childImg: yup
    .mixed()
    .nullable()
    .test('fileSize', '200KB 이하 이미지만 업로드 가능합니다.', (file) => {
      if (!file) return true;
      return file.size <= 200 * 1024;
    })
    .test('fileType', 'JPG, JPEG, PNG 형식만 업로드 가능합니다.', (file) => {
      if (!file) return true;
      return ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type);
    }),
  parentInfo: yup.object().shape({
    fatherName: yup.string().when('$enrollChild', {
      is: true,
      then: (schema) => schema.required('부 이름을 입력해주세요.'),
      otherwise: (schema) => schema.notRequired(),
    }),
    fatherPhone: yup.string().when('$enrollChild', {
      is: true,
      then: (schema) =>
        schema
          .required('부 연락처를 입력해주세요.')
          .matches(/^01[016789]-\d{3,4}-\d{4}$/, '유효한 부 전화번호를 입력하세요.'),
      otherwise: (schema) => schema.notRequired(),
    }),
    motherName: yup.string().when('$enrollChild', {
      is: true,
      then: (schema) => schema.required('모 이름을 입력해주세요.'),
      otherwise: (schema) => schema.notRequired(),
    }),
    motherPhone: yup.string().when('$enrollChild', {
      is: true,
      then: (schema) =>
        schema
          .required('모 연락처를 입력해주세요.')
          .matches(/^01[016789]-\d{3,4}-\d{4}$/, '유효한 모 전화번호를 입력하세요.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

export const useParentInfoForm = (enrollChild) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(parentInfoSchema),
    context: { enrollChild },
    mode: 'onBlur',
    defaultValues: {
      centerNo: null,
    },
  });

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    clearErrors,
  };
};
