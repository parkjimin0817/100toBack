import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import VacationForm from './components/VacationForm';
import VacationDateInfoBox from './components/VacationDateInfoBox';
import MyVacationList from './components/MyVacationList';

const MyVacation = () => {
  return (
    <Wrapper>
      <ContentHeader
        Title={'휴가 관리'}
        Color={'blue'}
        ButtonProps={[
          { Title: '뒤로가기', func: () => alert('뒤로가기~') },
          { Title: '앞으로가기', func: () => alert('앞으로가기~') },
        ]}
      />
      <Content>
        <VacationForm />
        <VacationDateInfoBox />
      </Content>
      <Content>
        <MyVacationList />
      </Content>
    </Wrapper>
  );
};

export default MyVacation;

const Wrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
const Content = styled.div`
  width: 100%;
  display: flex;
`;
