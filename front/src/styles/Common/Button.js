import styled from 'styled-components';

export const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 130px;
  height: 35px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  outline: none;
`;
