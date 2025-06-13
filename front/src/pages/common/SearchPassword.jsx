import React from 'react'
import Form from '../../components/Common/SearchFormNav'
import { SearchIdForm } from '../../styles/Common/Container';
import styled from 'styled-components'
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';

const SearchPassword = () => {
  const navigator = useNavigate();
  return (
  <Container>
    <CommonFind></CommonFind>
    <Contents>
      <Form></Form>
      <Title>비밀번호 찾기</Title>
      <Info>비밀번호 재설정을 위해 사용자 확인을 진행합니다.</Info>
      <Input placeholder='아이디를 입력해주세요.' />
      <Button onClick={() => navigator('/authenticationuser')}>다음</Button>
      <FooterLine>
        <Foot style={{ marginLeft: '410px' }}>고객센터</Foot>
        <Foot>1:1문의</Foot>
      </FooterLine>
    </Contents>
    <div style={{ marginTop: '10px' }}>
      <span>@KB Corp</span>
    </div>
  </Container>
    
  )
}

export default SearchPassword

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Contents = styled.div`
  margin: 0 auto;
  width: 574px;
  height: 533px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 55px;
  margin-top: 55px;
  font-size: 24px;
  font-weight: bold;
  height: 65px;
`

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 55px;
  font-size: 14px;
  color: #B5B5B5;
  height: 30px;
`

const Input = styled.input`
  display: flex;
  align-items: flex-start;
  margin-left: 55px;
  margin-top: 15px;
  width: 450px;
  height: 50px;
  border: 0.8px solid #BDBCBC;
  border-radius: 5px;
  padding-left: 10px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 55px;
  margin-top: 15px;
  width: 450px;
  height: 50px;
  background-color: #BAE8F5;
  border-radius: 8px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const FooterLine = styled.div`
  margin-top: 130px;
  display: flex;
  flex-direction: row;
`

const Foot = styled.div`
  font-size: 12px;
  margin-right: 15px;
  &:hover{
    cursor: pointer;
  }
`