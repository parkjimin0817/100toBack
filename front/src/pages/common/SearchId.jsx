import React from 'react';
import styled from 'styled-components';

import CommonFind from '../../components/Common/CommonFind';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
import SearchFormNav from '../../components/Common/SearchFormNav';
import { Button } from '../../styles/Common/Button';
import { useNavigate } from 'react-router-dom';

const SearchId = () => {
  const navigator = useNavigate();

  const BIRTHDAY_YEAR_LIST = Array.from({ length: 36 }, (_, i) => `${i + 1990}년`);
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
  return (
    <>
      <CommonFind />

      <SearchIdForm>
        <SearchFormNav />
        <ContentArea>
          <h2>아이디 찾기</h2>
          <Content>
            <Smalltext>이름과 생년월일을 입력해주세요.</Smalltext>
            <form>
              <ContentInner>
                <h3>이름</h3>
                <Input type="text" placeholder="이름을 입력해주세요." />
              </ContentInner>
              <ContentInner>
                <h3>생년월일</h3>
                <ContentDiv>
                  <SelectBar>
                    {BIRTHDAY_YEAR_LIST.map((year, index) => (
                      <option key={index}>{year}</option>
                    ))}
                  </SelectBar>
                  <SelectBar>
                    {BIRTHDAY_MONTH_LIST.map((month, index) => (
                      <option key={index}>{month}</option>
                    ))}
                  </SelectBar>
                  <SelectBar>
                    {BIRTHDAY_DAY_LIST.map((day, index) => (
                      <option key={index}>{day}</option>
                    ))}
                  </SelectBar>
                </ContentDiv>
              </ContentInner>

              <ButtonArea>
                <Button1 type="submit" onClick={() => navigator('/findidsuccess')}>
                  완료
                </Button1>
                <Button1 type="button" onClick={() => navigator('/login')}>
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

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing[8]} 0;
  padding-bottom: 0;
`;

const Smalltext = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
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
`;

export default SearchId;
