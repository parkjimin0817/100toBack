import React, { useRef } from 'react';
import styled from 'styled-components';

const ScrollWrapper = ({ children }) => {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -250 : 250;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };
  return (
    <Wrapper>
      <Arrow onClick={() => scroll('left')}>◀</Arrow>
      <ScrollArea ref={scrollRef}>{children}</ScrollArea>
      <Arrow onClick={() => scroll('right')}>▶</Arrow>
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
  width: 25px;
  height: 25px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
  cursor: pointer;
`;
