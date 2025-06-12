import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NextButton = ({ to, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) navigate(to);
  };
  return <Button onClick={handleClick}>{children}</Button>;
};

export default NextButton;

const Button = styled.button`
  width: 400px;
  height: 50px;
  margin: 0 auto;
  outline: none;
  border-radius: 10px;
  background-color: #55df7e;
  color: white;
`;
