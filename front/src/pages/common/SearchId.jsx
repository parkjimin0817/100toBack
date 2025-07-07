import React, { useState } from 'react';
import styled from 'styled-components';
import CommonFind from '../../components/Common/CommonFind';
import { ContentArea, SearchIdForm } from '../../styles/Common/Container';
import SearchFormNav from '../../components/Common/SearchFormNav';
import { Button } from '../../styles/Common/Button';
import { useSearchIdForm } from '../../hook/searchForm/useSearchIdForm';

const SearchId = () => {
  const {
    navigator,
    BIRTHDAY_YEAR_LIST,
    BIRTHDAY_MONTH_LIST,
    BIRTHDAY_DAY_LIST,
    name,
    choiceYear,
    choiceMonth,
    choiceDay,
    handleChange,
    handleSubmit,
    error,
    isLoading,
  } = useSearchIdForm();

  return (
    <>
      <CommonFind />

      <SearchIdForm>
        <SearchFormNav />
        <ContentArea>
          <h2>아이디 찾기</h2>
          <Content>
            {error ? <SmalltextError>{error}</SmalltextError> : <Smalltext>이름과 생년월일을 입력해주세요.</Smalltext>}

            <form onSubmit={handleSubmit}>
              <ContentInner>
                <h3>이름</h3>
                <Input
                  type="text"
                  name="name"
                  placeholder="이름을 입력해주세요."
                  value={name}
                  onChange={handleChange}
                />
              </ContentInner>
              <ContentInner>
                <h3>생년월일</h3>
                <ContentDiv>
                  <SelectBar name="year" value={choiceYear} onChange={handleChange}>
                    <option value="" disabled>
                      년
                    </option>
                    {BIRTHDAY_YEAR_LIST.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </SelectBar>
                  <SelectBar name="month" value={choiceMonth} onChange={handleChange}>
                    <option value="" disabled>
                      월
                    </option>
                    {BIRTHDAY_MONTH_LIST.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </SelectBar>
                  <SelectBar name="day" value={choiceDay} onChange={handleChange}>
                    <option value="" disabled>
                      일
                    </option>
                    {BIRTHDAY_DAY_LIST.map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                  </SelectBar>
                </ContentDiv>
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
  margin-top: ${({ theme }) => theme.spacing[1]};
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

export default SearchId;
