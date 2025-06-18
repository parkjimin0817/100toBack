import React from 'react';
import styled from 'styled-components';

const data = [{ name: '지민' }, { name: '동민' }, { name: '의철' }, { name: '승기' }];

const ChildCard = () => {
  return (
    <>
      {data.map((item, index) => (
        <Card key={index}>{item.name}</Card>
      ))}
    </>
  );
};
export default ChildCard;

const Card = styled.div`
  width: 240px;
  height: 360px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;
`;
