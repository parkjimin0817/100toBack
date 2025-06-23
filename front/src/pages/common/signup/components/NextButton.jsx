import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NextButton = ({ to, children, onClick }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to && !e?.defaultPrevented) {
      navigate(to);
    }
  };
  return <Button onClick={handleClick}>{children}</Button>;
};

export default NextButton;

const Button = styled.button`
  width: 400px;
  height: 50px;
  display: block;
  margin: 0 auto;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.spacing[12]};

  &:hover {
    background-color: #44c86f;
  }
`;
