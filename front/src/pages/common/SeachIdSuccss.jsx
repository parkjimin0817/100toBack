import React from 'react';
import CommonFind from '../../components/Common/CommonFind';
import { SearchIdForm } from '../../styles/Common/Container';
import SearchFormNav from '../../components/Common/SearchFormNav';
import styled from 'styled-components';
import { Button } from '../../styles/Common/Button';
import { useNavigate } from 'react-router-dom';

const SeachIdSuccss = () => {
  const navigator = useNavigate();
  return (
    <>
      <CommonFind />
      <SearchIdForm>
        <SearchFormNav />

        <ContentArea>
          <h2>아이디 찾기</h2>
          <Content>
            <Smalltext>고객님의 정보와 일치하는 아이디입니다.</Smalltext>

            <ContentForm>
              <Info>
                고객님의 아이디는 <UserID>user01</UserID>입니다.
              </Info>
            </ContentForm>

            <ButtonArea>
              <Button1 onClick={() => navigator('/login')}>로그인하기</Button1>
              <Button1 onClick={() => navigator('/')}>비밀번호 찾기</Button1>
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

const ContentArea = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: left;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing[8]} 0;
`;

const Smalltext = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ContentForm = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  height: 180px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: ${({ theme }) => theme.spacing[3]} 0;
`;

const Button1 = styled(Button)`
  background-color: ${({ theme }) => theme.colors.lightblue};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
  }
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 15px;

  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Info = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const UserID = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

export default SeachIdSuccss;
