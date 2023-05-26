import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../img/logo.png';
import hamburgerImage from '../img/hamburger.png';
import { SlPresent } from "react-icons/sl";
import { HiOutlineStar } from "react-icons/hi";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0; // 헤더 위치 고정
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const LogoLink = styled(Link)`
  position: absolute;
  left: 5.94%;
  right: 89.77%;
  top: 31.25%;
  bottom: 31.25%;
`;

const LogoImage = styled.img`
  left: 5.94%;
  right: 89.77%;
  top: 31.25%;
  bottom: 31.25%;
`;

const HamburgerContainer = styled.div`
  position: absolute;
  right: 5.88%;
  top: 50%;
  transform: translateY(-50%);
`;

const HamburgerImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: fit-content; /* 가로 크기를 텍스트 길이에 맞게 설정 */
  left: -100px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 설정 */
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  a {
    display: inline-block;
    text-decoration: none;
    color: black;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
`;


const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleHamburgerClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <HeaderContainer>
      <LogoLink to="/">
        <LogoImage src={logoImage} alt="Logo" />
      </LogoLink>
      <HamburgerContainer>
        <HamburgerImage
          src={hamburgerImage}
          alt="Hamburger"
          onClick={handleHamburgerClick}
        />
        <DropdownContainer isOpen={isDropdownOpen}>
          <DropdownItem>
            김유진님, 안녕하세요!</DropdownItem>
          <DropdownItem>
            <Link to="/product-list">
              <SlPresent/> {' '}
                <span style={{ textDecoration: 'none', color: 'black' }}>상품리스트</span>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/bookmark">
                <HiOutlineStar/>{' '}
                <span style={{ textDecoration: 'none', color: 'black' }}>북마크</span>
              </Link>
          </DropdownItem>
        </DropdownContainer>
      </HamburgerContainer>
    </HeaderContainer>
  );
};

export default Header;
