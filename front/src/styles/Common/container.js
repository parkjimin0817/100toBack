import styled from 'styled-components';

// 아이디 찾기, 비밀번호 찾기 폼 외각 컨테이너
export const SearchIdForm = styled.div`
  margin: 0 auto;
  width: 574px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

// 아이디 입력, 아이디 찾기, 비밀번호 찾기 폼 안쪽 컨테이너
export const ContentArea = styled.div`
  padding: ${({ theme }) => theme.spacing[12]};

  text-align: left;
`;
