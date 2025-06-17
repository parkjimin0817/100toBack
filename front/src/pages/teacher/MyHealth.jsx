import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyHealthList from './components/MyHealthList';
import { useNavigate } from 'react-router-dom';

const MyHealth = () => {
  const navigate = useNavigate();
  return (
    <>
      <ContentHeader
        Title="나의 건강 데이터"
        Color="yellow"
        ButtonProps={[{ Title: '작성하기', func: () => navigate('/myhealth/form') }]}
      />
      <Wrapper>
        <MyHealthList />
      </Wrapper>
    </>
  );
};

export default MyHealth;

const Wrapper = styled.div`
  width: 100%;
`;
