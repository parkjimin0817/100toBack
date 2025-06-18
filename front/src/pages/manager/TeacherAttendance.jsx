import React from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';

const TeacherAttendance = () => {
  return (
    <Content>
      <ContentHeader Title={'교사 근태 관리'} />
    </Content>
  );
};

export default TeacherAttendance;

const Content = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
