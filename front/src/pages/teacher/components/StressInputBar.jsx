import React from 'react';
import styled from 'styled-components';

const StressInputBar = ({ value, onChange, disabled = false }) => {
  const max = 10;
  const dotSizes = [10, 11, 12, 13, 14, 16, 18, 20, 23, 26];

  return (
    <Wrapper>
      {Array.from({ length: max }).map((_, i) => (
        <Dot
          key={i}
          $filled={i < value}
          $size={dotSizes[i]}
          $disabled={disabled}
          onClick={() => {
            if (!disabled && onChange) onChange(i + 1);
          }}
        />
      ))}
    </Wrapper>
  );
};

export default StressInputBar;

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin-top: 6px;
`;

const Dot = styled.div`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  background-color: ${({ $filled, theme }) => ($filled ? theme.colors.yellow : theme.colors.white)};
  border: 2px solid ${({ theme }) => theme.colors.gray[400]};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: all 0.2s ease;
`;
