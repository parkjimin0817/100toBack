import React from 'react';
import styled from 'styled-components';

import CommonFind from '../../components/Common/CommonFind';
import { SearchIdForm } from '../../styles/Common/Container';
import SearchFormNav from '../../components/Common/SearchFormNav';

const SearchId = () => {
  return (
    <>
      <CommonFind />

      <SearchIdForm>
        <SearchFormNav />
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
