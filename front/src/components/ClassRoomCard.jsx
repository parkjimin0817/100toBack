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
 * rooms 모든 반들을 가르킵니다.
 *
 * address 부분은 페이지마다 다르게 들어가야합니다.
 */

const ClassRoomCard = ({ rooms, address }) => {
  return (
    <>
      <FlexContainer>
        {rooms.map((room) => (
          <ClassList
            key={room.id}
            img={room.class_image}
            className={room.class_name}
            mateCount={room.mate_count}
            capacity={room.capacity}
            teacher={room.teacher}
            classColor={room.class_color}
            address={address + `/${room.id}`}
          />
        ))}
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
