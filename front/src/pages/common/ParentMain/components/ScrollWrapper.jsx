import React, { useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDropright } from 'react-icons/io';

const ScrollWrapper = ({ children }) => {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -250 : 250;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };
  return (
    <Wrapper>
      <Arrow onClick={() => scroll('left')}>
        <IoIosArrowDropleft size={25} />
      </Arrow>
      <ScrollArea ref={scrollRef}>{children}</ScrollArea>
      <Arrow onClick={() => scroll('right')}>
        <IoIosArrowDropright size={25} />
      </Arrow>
    </Wrapper>
  );
};

export default ScrollWrapper;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 8px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Arrow = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[500]};
  cursor: pointer;
`;
