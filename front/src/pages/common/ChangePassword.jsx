import React from 'react'
import Form from '../../components/Common/SearchFormNav'
import { SearchIdForm } from '../../styles/Common/Container';
import styled from 'styled-components'
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {
  const navigator = useNavigate();

  return (
  <Container>
    <CommonFind></CommonFind>
    <Contents>
      <Form></Form>
      <Title>비밀번호 재설정</Title>
      <Info>비밀번호 재설정을 위해 사용자 확인을 진행합니다.</Info>
      <PasswordLine>
        <Column>비밀번호</Column>
        <Input placeholder='비밀번호(8~32자)를 입력해주세요.' />
        <Column>비밀번호 확인</Column>
        <Input placeholder='비밀번호 재입력' />
      </PasswordLine>
      <Button onClick={() => navigator('/login')}>완료</Button>
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

export default ChangePassword

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Contents = styled.div`
  margin: 0 auto;
  width: 574px;
  height: 650px;
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
const PasswordLine = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 55px;
  
`
const Column = styled.div`
  margin-top: 20px;
`

const Input = styled.input`
  width: 450px;
  padding-right: 100px;
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
  margin-top: 70px;
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
  margin-top: 80px;
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