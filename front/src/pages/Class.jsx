import React from 'react';
import sun from '../assets/img/sun.png';
import ClassList from '../components/ClassList';
import styled from 'styled-components';
import ContentHeader from '../components/Common/ContentHeader';

const Class = () => {
  return (
    <>
      <ContentHeader Title={'유치원 출결 반 선택'} Color={'orange'} />
      <FlexContainer>
        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'orange'}
        />

        <ClassList img={sun} className={'폭우'} mateCount={10} pullCount={12} teacher={'정의철'} classColor={'blue'} />

        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'yellow'}
        />

        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'purple'}
        />

        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'lightblue'}
        />

        <ClassList img={sun} className={'햇님'} mateCount={10} pullCount={12} teacher={'정의철'} classColor={'green'} />
      </FlexContainer>
    </>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing[10]};
  gap: 60px;
`;

export default Class;
