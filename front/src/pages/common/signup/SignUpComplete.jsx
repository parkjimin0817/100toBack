import React from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const steps = ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];

const SignUpComplete = () => {
  const navigate = useNavigate();
  const currentStep = 3;
  return (
    <CommonFind>
      <SignUpProgressBar steps={steps} currentStep={currentStep} />
      <Wrapper>
        <Card>
          <Icon>✔</Icon>
          <Title>회원가입이 완료되었습니다.</Title>
          <Message>이제 로그인하여 다양한 서비스를 이용해보세요.</Message>
          <Button onClick={() => navigate('/login')}>로그인하러 가기</Button>
        </Card>
      </Wrapper>
    </CommonFind>
  );
};

export default SignUpComplete;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  padding: 40px 30px;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  border: none;
  outline: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #44c86f;
  }
`;
