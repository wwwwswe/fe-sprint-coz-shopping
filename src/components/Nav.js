import React, { useState } from "react";
import styled from "styled-components";
import totalImg from "../img/total.png";
import productImg from "../img/product.png";
import categoryImg from "../img/category.png";
import exhibitionImg from "../img/exhibition.png";
import brandImg from "../img/brand.png";

const NavContainer = styled.div`
  position: fixed;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  padding: 0px;
  position: fixed;
  width: 50%;
  gap: 36px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  /* &:hover {
    color: blue;
    text-decoration: underline;
  } */
`;

const NavImage = styled.img`
  width: 82px;
  height: 82px;
`;

const NavText = styled.p`
  margin: 0;
  color: ${(props) => (props.isActive ? "blue" : "black")};
  text-decoration: ${(props) => (props.isActive ? "underline" : "none")};
`;

const Nav = ({ activeNav, onNavClick }) => {
  return (
    <NavContainer>
      <NavItem onClick={() => onNavClick("전체")}>
        <NavImage src={totalImg} alt="전체" />
        <NavText isActive={activeNav === "전체"}>전체</NavText>
      </NavItem>
      <NavItem onClick={() => onNavClick("상품")}>
        <NavImage src={productImg} alt="상품" />
        <NavText isActive={activeNav === "상품"}>상품</NavText>
      </NavItem>
      <NavItem onClick={() => onNavClick("카테고리")}>
        <NavImage src={categoryImg} alt="카테고리" />
        <NavText isActive={activeNav === "카테고리"}>카테고리</NavText>
      </NavItem>
      <NavItem onClick={() => onNavClick("기획전")}>
        <NavImage src={exhibitionImg} alt="기획전" />
        <NavText isActive={activeNav === "기획전"}>기획전</NavText>
      </NavItem>
      <NavItem onClick={() => onNavClick("브랜드")}>
        <NavImage src={brandImg} alt="브랜드" />
        <NavText isActive={activeNav === "브랜드"}>브랜드</NavText>
      </NavItem>
    </NavContainer>
  );
};

export default Nav;
