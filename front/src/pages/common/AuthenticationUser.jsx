import React from 'react';
import Form from '../../components/Common/SearchFormNav';
import { SearchIdForm } from '../../styles/Common/Container';
import styled from 'styled-components';
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';

const AuthenticationUser = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <CommonFind></CommonFind>
      <Contents>
        <Form></Form>
        <Title>사용자 인증</Title>
        <Info>비밀번호 재설정을 위해 사용자 확인을 진행합니다.</Info>
        <NameLine>
          <Column>이름</Column>
          <Input placeholder="이름을 입력해주세요." />
        </NameLine>
        <PhoneLine>
          <Column>전화번호</Column>
          <PhoneRow>
            <Input placeholder="전화번호를 입력해주세요." />
            <VerifyButton>인증요청</VerifyButton>
          </PhoneRow>
          <Input style={{ marginTop: '10px' }} placeholder="인증번호를 입력해주세요." />
        </PhoneLine>
        <Button onClick={() => navigator('/changepwd')}>다음</Button>
        <FooterLine>
          <Foot style={{ marginLeft: '410px' }}>고객센터</Foot>
          <Foot>1:1문의</Foot>
        </FooterLine>
      </Contents>
      <div style={{ marginTop: '10px' }}>
        <span>@KB Corp</span>
      </div>
    </Container>
  );
};

export default AuthenticationUser;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  margin: 0 auto;
  width: 574px;
  height: 650px;
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
  font-size: 14px;
  color: #b5b5b5;
  height: 30px;
`;
const NameLine = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 55px;
  height: 100px;
`;
const Column = styled.div``;

const Input = styled.input`
  width: 450px;
  padding-right: 100px;
  height: 50px;
  border: 0.8px solid #bdbcbc;
  border-radius: 5px;
  padding-left: 10px;
`;
const PhoneRow = styled.div`
  position: relative;
  width: 450px; /* Input과 동일한 너비 */
`;

 const VerifyButton = styled.button`
   position: absolute;
   top: 50%;
   right: 10px;
   transform: translateY(-50%);
   background-color: white;
   border: #BDBCBC solid 1px;
   border-radius: 20px;
   padding: 0 12px;
   height: 30px;
   font-size: 12px;
   font-weight: normal;
   cursor: pointer;
 `;


const PhoneLine = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 55px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 55px;
  margin-top: 25px;
  width: 450px;
  height: 50px;
  background-color: #bae8f5;
  border-radius: 8px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const FooterLine = styled.div`
  margin-top: 75px;
  display: flex;
  flex-direction: row;
`;

const Foot = styled.div`
  font-size: 12px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;
