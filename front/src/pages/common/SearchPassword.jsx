import React, { useState } from 'react';
import Form from '../../components/Common/SearchFormNav';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
import styled from 'styled-components';
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../styles/Common/Button';
import SearchFormNav from '../../components/Common/SearchFormNav';
import { memberService } from '../../api/member';
import useSearchIdStore from '../../store/searchStore';
import { toast } from 'react-toastify';
import { useSearchPwdForm1 } from '../../hook/searchForm/useSearchPwdForm1';

const SearchPassword = () => {
  const { navigator, id, error, isLoading, handleChange, onSubmit } = useSearchPwdForm1();

  return (
    <>
      <CommonFind />

      <SearchIdForm>
        <SearchFormNav />
        <ContentArea>
          <h2>비밀번호 찾기</h2>
          <Content>
            {error ? (
              <SmalltextError>{error}</SmalltextError>
            ) : (
              <Smalltext>비밀번호 재설정을 위해 사용자 확인을 진행합니다.</Smalltext>
            )}

            <form onSubmit={onSubmit}>
              <ContentInner>
                <h3>아이디</h3>
                <Input type="text" name="id" placeholder="아이디를 입력해주세요." value={id} onChange={handleChange} />
              </ContentInner>
              <ButtonArea>
                <Button1 type="submit">{isLoading ? '아이디 찾는중 ...' : '완료'}</Button1>
                <Button1 type="button" onClick={() => navigator('/')}>
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

export default SearchPassword;

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
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectBar = styled.select`
  width: 30%;
  height: 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  outline: none;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  margin: 0 auto;
  width: 574px;
  height: 533px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 55px;
  margin-top: 55px;
  font-size: 24px;
  font-weight: bold;
  height: 65px;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #b5b5b5;
  height: 30px;
`;
