import React from 'react';
import logo from '../../assets/img/KinderBridge.png';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo src={logo} alt="KinderBridge" />
      <LinearBar></LinearBar>
      <CopyrightText>Non Copyrighted © 2025 </CopyrightText>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const FooterLogo = styled.img`
  width: 150px;
  height: 90px;
`;

const LinearBar = styled.div`
  height: 1px;
  border: solid 1px #dfdfdf;
  margin: 40px 0 20px;
`;

const CopyrightText = styled.p`
  text-align: right;
`;

export default Footer;
