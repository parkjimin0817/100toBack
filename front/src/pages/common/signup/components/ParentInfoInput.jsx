import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

const formatPhoneNumber = (value = '') => {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7) return onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  return onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
};

const ParentInfoInput = ({ disabled, register, errors, control }) => {
  return (
    <InputWrapper>
      <Label>부모 정보</Label>
      <InputRow>
        <Text>부 이름 : </Text>
        <InputName type="text" placeholder="이름" disabled={disabled} {...register('parentInfo.fatherName')} />
        <Text>부 연락처 : </Text>
        <Controller
          name="parentInfo.fatherPhone"
          control={control}
          render={({ field }) => (
            <InputPhone
              {...field}
              type="text"
              placeholder="'-' 제외 11자리 연락처"
              value={field.value || ''} // ✅ 그대로 보여주고
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                field.onChange(formatted); // ✅ 여기서만 포맷
              }}
              disabled={disabled}
              maxLength={13}
            />
          )}
        />
      </InputRow>
      <InputRow>
        <Text>모 이름 : </Text>
        <InputName type="text" placeholder="이름" disabled={disabled} {...register('parentInfo.motherName')} />
        <Text>모 연락처 : </Text>
        <Controller
          name="parentInfo.motherPhone"
          control={control}
          render={({ field }) => (
            <InputPhone
              {...field}
              type="text"
              placeholder="'-' 제외 11자리 연락처"
              value={field.value || ''} // ✅ 그대로 보여주고
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                field.onChange(formatted); // ✅ 여기서만 포맷
              }}
              disabled={disabled}
              maxLength={13}
            />
          )}
        />
      </InputRow>
      {(errors.parentInfo?.fatherName ||
        errors.parentInfo?.fatherPhone ||
        errors.parentInfo?.motherName ||
        errors.parentInfo?.motherPhone) && (
        <ErrorMessage>
          {errors.parentInfo.fatherName?.message} <br /> {errors.parentInfo.fatherPhone?.message} <br />
          {errors.parentInfo.motherName?.message} <br /> {errors.parentInfo.motherPhone?.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default ParentInfoInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0 10px 0;
`;

const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputRow = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputName = styled.input`
  width: 100px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[3]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const InputPhone = styled.input`
  width: 180px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[3]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
  text-align: left;
`;
