import React from 'react';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';

const DailyScheduleDetail = () => {
  return (
    <Content>
      <ContentHeader Title={'일과표'} Color={'purple'} />
      <div></div>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default DailyScheduleDetail;
