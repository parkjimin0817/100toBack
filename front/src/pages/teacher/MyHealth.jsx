import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyHealthList from './components/MyHealthList';
import { useNavigate } from 'react-router-dom';

const MyHealth = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <ContentHeader
        Title="나의 건강 데이터"
        Color="yellow"
        ButtonProps={[{ Title: '작성하기', func: () => navigate('/myhealth/form') }]}
      />
      <MyHealthList />
    </Wrapper>
  );
};

export default MyHealth;

const Wrapper = styled.div`
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
