import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';
import TeacherAttendanceCard from './components/TeacherAttendanceCard';

const TeacherAttendance = () => {
  return (
    <Wrapper>
      <ContentHeader Title={'교사 근태 관리'} Color={'blue'} />
      <Content>
        <Div1></Div1>
        <Div2>
          <TeacherAttendanceCard></TeacherAttendanceCard>
        </Div2>
      </Content>
    </Wrapper>
  );
};

export default TeacherAttendance;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Div1 = styled.div`
  width: 60%;
  min-height: 500px;
  margin: 10;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Div2 = styled.div`
  width: 30%;
  min-height: 500px;
  margin: 10;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
