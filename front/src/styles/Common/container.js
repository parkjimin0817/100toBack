import styled from 'styled-components';

// 아이디 찾기, 비밀번호 찾기 페이지에서
export const SearchIdForm = styled.div`
  margin: 0 auto;
  width: 574px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;
