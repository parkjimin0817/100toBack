import React, { useEffect, useState } from 'react';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
import styled from 'styled-components';
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';
import SearchFormNav from '../../components/Common/SearchFormNav';
import { Button } from '../../styles/Common/Button';
import { useSearchPwdForm2 } from '../../hook/searchForm/useSearchPwdForm2';

const AuthenticationUser = () => {
  const navigator = useNavigate();
  const {
    writeName,
    writePhone,
    writeNumber,
    isLoading,
    isLoading2,
    error,
    auth,
    handleChange,
    handleNext,
    onSubmit,
    submitAuth,
    handleSendAuthNumber,
    formatTime,
    isRunning,
  } = useSearchPwdForm2();

  return (
    <>
      <CommonFind />

      <SearchIdForm>
        <SearchFormNav />
        <ContentArea>
          <h2>사용자 인증</h2>
          <Content>
            {error ? (
              <SmalltextError>{error}</SmalltextError>
            ) : (
              <Smalltext>비밀번호 재설정을 위해 사용자 확인을 진행합니다.</Smalltext>
            )}
            <form onSubmit={onSubmit}>
              <ContentInner>
                <h3>이름</h3>
                <Input
                  type="text"
                  name="name"
                  placeholder="이름을 입력해주세요."
                  value={writeName}
                  onChange={handleChange}
                />
              </ContentInner>
              <ContentInner>
                <h3>전화 번호</h3>
                <Input
                  type="text"
                  name="phone"
                  placeholder="전화번호를 입력해주세요."
                  value={writePhone}
                  onChange={handleChange}
                />
                <VerifyButton type="submit" onClick={handleSendAuthNumber}>
                  {isLoading ? '인증번호요청 중..' : '인증번호요청'}
                </VerifyButton>
              </ContentInner>
            </form>

            {auth.auth_no > 0 ? (
              <form onSubmit={submitAuth}>
                <ContentInner>
                  <Input
                    type="text"
                    name="number"
                    placeholder="인증 번호를 입력해주세요."
                    value={writeNumber}
                    onChange={handleChange}
                  />
                  <VerifyButton2 type="submit">{isLoading2 ? '인증요청 중..' : '인증완료'}</VerifyButton2>
                </ContentInner>
                {isRunning && (
                  <div style={{ marginTop: '10px', fontSize: '18px', color: '#F36B4D' }}>남은 시간: {formatTime()}</div>
                )}
              </form>
            ) : (
              ''
            )}

            <ButtonArea>
              <Button1 type="button" onClick={handleNext}>
                다음
              </Button1>
              <Button1 type="button" onClick={() => navigator('/findpwd')}>
                돌아가기
              </Button1>
            </ButtonArea>
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

export default AuthenticationUser;

const VerifyButton2 = styled.button`
  position: absolute;
  right: 10px;
  top: 17px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #bdbcbc;
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  height: 30px;
  font-size: ${({ theme }) => theme.spacing[3]};
  font-weight: normal;
`;

const VerifyButton = styled.button`
  position: absolute;
  right: 10px;
  top: 45px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #bdbcbc;
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  height: 30px;
  font-size: ${({ theme }) => theme.spacing[3]};
  font-weight: normal;
`;

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
