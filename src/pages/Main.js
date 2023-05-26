import React from 'react';
import MainList from '../components/MainList';
import styled from 'styled-components';
import BookList from '../components/BookList';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: row;
  padding: 50px 190px;
`;

const Title = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-bottom: 16px;
`;

const Main = () => {
  return (
    <MainContainer>
      <Title>상품 리스트</Title>
      <MainList />
      <br/>
      <Title>북마크 리스트</Title>
      <BookList />
    </MainContainer>
  );
};


export default Main;
