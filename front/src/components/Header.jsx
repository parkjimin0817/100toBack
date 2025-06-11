import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
`;

export default Header;
