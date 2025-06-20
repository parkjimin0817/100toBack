import React from 'react';
import CommonFind from '../../../components/Common/CommonFind';
import SignUpProgressBar from './components/SignUpProgressBar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSignUpStore } from '../../../store/signupStore';

const getStepsByType = (type) => {
  switch (type) {
    case 'teacher':
      return ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];
    case 'parent':
      return ['약관 동의', '기본 정보 입력', '아동 정보 입력', '가입 완료'];
    case 'manager':
      return ['약관 동의', '기본 정보 입력', '시설 정보 입력', '가입 완료'];
  }
};

const SignUpComplete = () => {
  const navigate = useNavigate();
  const currentStep = 3;
  const type = useSignUpStore((state) => state.type);
  return (
    <CommonFind>
      <SignUpProgressBar steps={getStepsByType(type)} currentStep={currentStep} />
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
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[8]}`};
  text-align: center;
`;

const Icon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Button = styled.button`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[5]}`};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  border: none;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;

  &:hover {
    background-color: #44c86f;
  }
`;
