import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/img/logo.png';
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

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

const LoginPage = () => {
  const [checked, setChecked] = useState(false);
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async () => {};

  return (
    <CommonFind>
      <SearchIdForm>
        <ContentArea>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title>로그인</Title>

            <Content>
              <InputLine>
                <Input
                  id="memberId"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  {...register('memberId')}
                  $error={errors.memberId}
                />
                {errors.memberId && <ErrorMessage>{errors.memberId.message}</ErrorMessage>}
                <Input
                  id="memberPwd"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  {...register('memberPwd')}
                  $error={errors.memberPwd}
                />
                {errors.memberPwd && <ErrorMessage>{errors.memberPwd.message}</ErrorMessage>}
              </InputLine>
              <CheckboxLine>
                <Lable>
                  <LoginMaintain type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                  로그인 상태유지
                </Lable>
              </CheckboxLine>
              <LoginButtonLine>
                <Button type="submit">로그인하기</Button>
              </LoginButtonLine>
              <EtcLine>
                <Etc onClick={() => navigator('/signup/terms')}>회원가입</Etc>
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
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
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

const Button = styled.button`
  width: 100%;
  height: 44px;
  background-color: #bae8f5;
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
