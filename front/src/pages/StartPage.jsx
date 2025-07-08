import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator('/login');
  });
  return <></>;
};

export default StartPage;
