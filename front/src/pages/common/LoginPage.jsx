import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/img/logo.png';
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { memberService } from '../../api/member';
// import { useLoginStore } from '../../store/loginStore';
// import { toast } from 'react-toastify';
import { useLoginForm } from '../../hook/login/useLoginForm';

const LoginPage = () => {
  const navigator = useNavigate();
  const { register, handleSubmit, onSubmit, errors, checked, setChecked, error, isLoading } = useLoginForm();

  return (
    <CommonFind>
      <SearchIdForm>
        <ContentArea>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title>로그인</Title>

            <Content>
              {error ? (
                <SmalltextError>{error}</SmalltextError>
              ) : (
                <Smalltext>아이디와 비밀번호를 입력해주세요.</Smalltext>
              )}
              <InputLine>
                <Input
                  id="memberId"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  {...register('memberId')}
                  $error={errors.memberId}
                />
                <Input
                  id="memberPwd"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  {...register('memberPwd')}
                  $error={errors.memberPwd}
                />
              </InputLine>
              {/* <CheckboxLine>
                <Lable>
                  <LoginMaintain type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                  로그인 상태유지
                </Lable>
              </CheckboxLine> */}

              {errors.memberId &&
              errors.memberId.type === 'required' &&
              errors.memberPwd &&
              errors.memberPwd.type === 'required' ? (
                <ErrorMessage>아이디와 비밀번호를 모두 입력해주세요.</ErrorMessage>
              ) : (
                <>
                  {errors.memberId && <ErrorMessage>{errors.memberId.message}</ErrorMessage>}
                  {errors.memberPwd && <ErrorMessage>{errors.memberPwd.message}</ErrorMessage>}
                </>
              )}
              <LoginButtonLine>
                {!(errors.memberId && errors.memberPwd) ? (
                  <Button1 type="submit">{isLoading ? '로그인 중...' : '로그인'}</Button1>
                ) : (
                  <Button2 type="submit">{isLoading ? '로그인 중...' : '로그인'}</Button2>
                )}
              </LoginButtonLine>
              <EtcLine>
                <Etc onClick={() => navigator('/signup/userselect')}>회원가입</Etc>
                <SearchArea>
                  <Etc onClick={() => navigator('/findid')}>아이디찾기</Etc>
                  <Etc onClick={() => navigator('/findpwd')}>비밀번호찾기</Etc>
                </SearchArea>
              </EtcLine>
            </Content>
          </form>
        </ContentArea>
      </SearchIdForm>
      <Footer>
        <Foot>이용약관</Foot>
        <Foot style={{ width: '140px' }}>개인정보 처리방침</Foot>
        <Foot>고객센터</Foot>
        <Foot>@KB Corp</Foot>
      </Footer>
    </CommonFind>
  );
};

export default LoginPage;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing[16]};
`;

const Title = styled.h2`
  text-align: center;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing[3]};
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: ${({ theme }) => theme.spacing[3]};
  color: black;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};

  &::placeholder {
    color: #b4b2b2; /* placeholder만 회색 */
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.green};
  }
`;

const CheckboxLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing[2]};
`;

const Lable = styled.label`
  &:hover {
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const LoginMaintain = styled.input`
  margin-right: ${({ theme }) => theme.spacing[2]};
`;

const LoginButtonLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing[8]};
`;

const Button1 = styled.button`
  width: 100%;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  font-size: 18px;
  font-weight: bold;

  &:hover {
    scale: 0.98;
  }
`;

const Button2 = styled.button`
  width: 100%;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  font-size: 18px;
  font-weight: bold;

  &:hover {
    scale: 0.98;
  }
`;

const EtcLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Etc = styled.div`
  font-size: 16px;
  margin-right: 7px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;

const Foot = styled.div`
  width: 94px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const SmalltextError = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.orange};
  padding: ${({ theme }) => theme.spacing[2]};
`;

const Smalltext = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
  padding: ${({ theme }) => theme.spacing[2]};
`;
