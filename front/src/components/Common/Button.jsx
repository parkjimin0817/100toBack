import React from 'react';
import styled from 'styled-components';

const Button = ({ width, color, hovercolor, children, onClick }) => {
  return (
    <CommonButton $width={width} $color={color} $hovercolor={hovercolor} onClick={onClick}>
      {children}
    </CommonButton>
  );
};

export default Button;

const CommonButton = styled.button`
  padding: 5px;
  width: ${({ $width }) => $width};
  height: 30px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme, $color }) => theme.colors[$color]};
  color: white;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $hovercolor }) => theme.colors[$hovercolor]};
  }
`;
