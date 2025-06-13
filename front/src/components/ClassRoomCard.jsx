import React from 'react';
import sun from '../assets/img/sun.png';
import ClassList from './ClassList';
import styled from 'styled-components';

/**
 * 반별 카드 컴포넌트 입니다.
 *
 * ex.유치원 반 목록, 일과표, 반 생성 페이지 부분에서 사용됩니다.
 *
 *
 * classes는 모든 반들을 가르킵니다.
 *
 * address 부분은 페이지마다 다르게 들어가야합니다.
 */

const ClassRoomCard = ({ classes }) => {
  return (
    <>
      <FlexContainer>
        {/* {classes.map((room) => (
          <ClassList
            img={room.class_image}
            className={room.class_name}
            mateCount={room.mate_count}
            pullCount={room.capacity}
            teacher={room.teacher}
            classColor={room.color}
            address={'/classDetail'}
          />
        ))} */}

        <ClassList
          img={null}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'orange'}
          address={'/classDetail'}
        />

        <ClassList
          img={sun}
          className={'해바라기'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'blue'}
        />

        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'yellow'}
          address={'/classDetail'}
        />

        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'purple'}
          address={'/classDetail'}
        />

        <ClassList
          img={sun}
          className={'햇님'}
          mateCount={10}
          pullCount={12}
          teacher={'정의철'}
          classColor={'lightblue'}
          address={'/classDetail'}
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

export default ClassRoomCard;
