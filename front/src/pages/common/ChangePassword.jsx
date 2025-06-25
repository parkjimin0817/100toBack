import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import CommonFind from '../../components/Common/CommonFind';
import SearchFormNav from '../../components/Common/SearchFormNav';
import { Button } from '../../styles/Common/Button';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
import { useSearchPwdForm3 } from '../../hook/searchForm/useSearchPwdForm3';

const ChangePassword = () => {
  const { navigator, password, passwordCheck, error, isLoading, handleChange, onSubmit } = useSearchPwdForm3();

  return (
    <>
      <CommonFind />

      <SearchIdForm>
        <SearchFormNav />
        <ContentArea>
          <h2>비밀번호 재설정</h2>
          <Content>
            {error ? <SmalltextError>{error}</SmalltextError> : <Smalltext>새로운 비밀번호를 입력해주세요.</Smalltext>}
            <form onSubmit={onSubmit}>
              <ContentInner>
                <h3>새 비밀번호</h3>
                <Input
                  type="password"
                  name="password"
                  placeholder="새 비밀번호를 입력해주세요."
                  value={password}
                  onChange={handleChange}
                />
              </ContentInner>
              <ContentInner>
                <h3>새 비밀번호 확인</h3>
                <Input
                  type="password"
                  name="passwordCheck"
                  placeholder="새 비밀번호를 다시 입력해주세요."
                  value={passwordCheck}
                  onChange={handleChange}
                />
              </ContentInner>

              <ButtonArea>
                <Button1 type="submit">{isLoading ? '변경 중...' : '완료'}</Button1>
                <Button1 type="button" onClick={() => navigator('/authenticationuser')}>
                  돌아가기
                </Button1>
              </ButtonArea>
            </form>
            <ContentFooter>
              <div>고객센터</div>
              <div>1 : 1 문의하기</div>
            </ContentFooter>
          </Content>
        </ContentArea>
      </SearchIdForm>
      <div>
        <span>@KB Corp</span>
      </div>
    </>
  );
};

export default ChangePassword;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing[8]} 0;
  padding-bottom: 0;
`;

const Smalltext = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const SmalltextError = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.orange};
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: ${({ theme }) => theme.spacing[3]} 0;
`;

const Button1 = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightblue};
`;

const ContentFooter = styled.div`
  padding-top: ${({ theme }) => theme.spacing[16]};
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 15px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ContentInner = styled.div`
  padding: ${({ theme }) => theme.spacing[2]} 0;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;
