import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpInput from '../common/signup/components/SignUpInput';
import ChildRRNInput from '../common/signup/components/ChildRRNInput';
import ProfileImageUpload from '../common/signup/components/ProfileImageUpload';
import NextButton from '../common/signup/components/NextButton';

const AddChild = () => {
  const navigate = useNavigate();
  const headerButtons = [{ Title: '뒤로가기', func: () => navigate(-1) }];
  return (
    <>
      <Content>
        <ContentHeader Title={'아동 등록'} Color={'orange'} ButtonProps={headerButtons} />
        <Form>
          <SignUpInput type="text" description="아동명을 정확하게 입력해주세요." label="아동 이름" />
          <ChildRRNInput label="아동 주민등록번호" />
          <ProfileImageUpload label="아동 사진 등록" />
          <NextButton to="/signup/complete">등록하기</NextButton>
        </Form>
      </Content>
    </>
  );
};

export default AddChild;

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;
