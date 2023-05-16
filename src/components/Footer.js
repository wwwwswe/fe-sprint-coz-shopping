// Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 58px;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-align: center;

  & + & {
    margin-left: 16px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>개인정보 처리방침 | 이용 약관
        <br />
        All rights reserved @ Codestates</FooterText>
    </FooterContainer>
  );
}

export default Footer;
