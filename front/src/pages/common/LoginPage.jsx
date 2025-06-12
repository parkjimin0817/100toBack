import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/img/logo.png';
import CommonFind from '../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [checked, setChecked] = useState(false);
  const navigator = useNavigate();

  return (
    <CommonFind>
      <Wrapper>
        <Title>로그인</Title>
        <form>
          <InputLine>
            <Input type="text" placeholder="아이디를 입력해주세요." />
            <Input type="text" placeholder="비밀번호를 입력해주세요." />
          </InputLine>
          <CheckboxLine>
            <label>
              <LoginMaintain type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
              로그인상태유지
            </label>
          </CheckboxLine>
          <LoginButtonLine>
            <Button>로그인</Button>
          </LoginButtonLine>
          <EtcLine>
            <Etc style={{ marginRight: '140px' }}>회원가입</Etc>
            <Etc>아이디찾기</Etc>
            <Etc onClick={() => navigator('/findpwd')}>비밀번호찾기</Etc>
          </EtcLine>
        </form>
      </Wrapper>
      <Footer>
        <Foot>이용약관</Foot>
        <Foot style={{ width: '140px' }}>개인정보 처리방침</Foot>
        <Foot>고객센터</Foot>
        <Foot>@KB Corp</Foot>
      </Footer>
    </CommonFind>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단 정렬 */
  max-width: 1440px;
  max-height: 1024px;
  width: 100%;
  margin: 0 auto;
  padding-top: 0;
  flex-grow: 0;
`;

const Image = styled.img`
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 575px;
  height: 510px;
  border: 0.8px solid #b4b2b2;
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 24px;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 68px;
`;

const Input = styled.input`
  width: 345px;
  height: 50px;
  padding-left: 10px;
  color: black;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 0.8px solid black;

  &::placeholder {
    color: #b4b2b2; /* placeholder만 회색 */
  }
`;

const CheckboxLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-left: 230px;
  margin-top: 10px;
`;

const LoginMaintain = styled.input`
  margin-left: 15px;
`


const LoginButtonLine = styled.div`
  margin-top: 80px;
`;

const Button = styled.button`
  width: 355px;
  height: 50px;
  background-color: #bae8f5;
  border-radius: 5px;
  border: 0.8px solid black;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const EtcLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const Etc = styled.div`
  font-size: 16px;
  margin-right: 7px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;

const Foot = styled.div`
  width: 94px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
