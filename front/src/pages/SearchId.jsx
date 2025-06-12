import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/img/로고.png';

const SearchId = () => {
  return (
    <>
      <Logoarea>
        <LogoImg src={Logo} alt="없음" />
      </Logoarea>

      <FormArea>
        <FormNav>
          <Nav1>아이디 찾기</Nav1>
          <Nav1>비밀번호 찾기</Nav1>
          <Nav1>회원가입</Nav1>
        </FormNav>
        <ContentArea>
          <h2>아이디 찾기</h2>
          <Content>
            <Smalltext>이름과 생년월일을 입력해주세요.</Smalltext>
            <ContentForm>
              <table>
                <tbody>
                  <tr>
                    <Tabletd>
                      <InputTitle>이름</InputTitle>
                    </Tabletd>
                    <Tabletd>
                      <InputName type="text" placeholder="이름을 입력해주세요." />
                    </Tabletd>
                  </tr>
                  <tr>
                    <Tabletd>
                      <InputTitle>생년월일</InputTitle>
                    </Tabletd>
                    <Tabletd>
                      <InputName type="date" />
                    </Tabletd>
                  </tr>
                </tbody>
              </table>
              <Button>확인</Button>
            </ContentForm>
            <ContentFooter>
              <div>고객센터</div>
              <div>1 : 1 문의하기</div>
            </ContentFooter>
          </Content>
        </ContentArea>
      </FormArea>
      <div>
        <span>@KB Corp</span>
      </div>
    </>
  );
};

const Logoarea = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const LogoImg = styled.img`
  margin-top: 60px;
  margin-bottom: 60px;
`;

const FormArea = styled.div`
  margin: 0 auto;
  width: 574px;
  height: 533px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const FormNav = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
  width: 100%;
  height: 83px;
`;

const Nav1 = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;

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
  background: ${({ theme }) => theme.colors.lightyellow};
  height: 180px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Tabletd = styled.td`
  padding: 10px 20px;
`;

const InputTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const InputName = styled.input`
  box-shadow: ${({ theme }) => theme.shadows.md};
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[2]};
  width: 160px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100px;
  height: 30px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 15px;

  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export default SearchId;
