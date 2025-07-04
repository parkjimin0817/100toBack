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

//반이 없을 때 나오는 컨테이너
export const ErrorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 580px;
  padding: ${({ theme }) => theme.spacing[10]};
  gap: ${({ theme }) => theme.spacing[6]};
`;

//각 페이지의 힌트 구역
export const Hint = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-align: left;
  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[8]};
`;

//반 목록이 없으면 뜨는 컨테이너
export const NoneDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;
