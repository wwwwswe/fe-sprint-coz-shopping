import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Star from '../components/Star';
import { BookmarkContext } from '../context/BookmarkContext';
import { BsFillBookmarkStarFill } from 'react-icons/bs';

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductCard = styled.div`
  position: relative;
  width: 344px;
  height: 360px;
  overflow: hidden;
  border-radius: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 290px;
  object-fit: cover;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  padding: 10px;
  color: #000;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const SubTitle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const BrandName = styled.p`
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const DiscountPercentage = styled.p`
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  color: #452cdd;
`;

const Follower = styled.p`
  color: #000000;
`;

const FollowerLabel = styled.p`
  margin: 0;
  font-weight: 800;
`;

const BookmarkButton = styled.div`
  position: absolute;
  bottom: 80px;
  right: 15px;
`;

const EmptyBookmarkText = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #452cdd;
  text-align: center;
  margin: 60px auto 0;
  padding: 10px;
  display: inline-block;
  width: 300px;
  height: 100px;
`;

const BookList = () => {
  const [products, setProducts] = useState([]);
  const { bookmarkItems, setBookmarkItems } = useContext(BookmarkContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://cozshopping.codestates-seb.link/api/v1/products?count=4');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getRandomProductImage = (product) => {
    if (product.image_url) {
      return product.image_url;
    } else if (product.brand_image_url) {
      return product.brand_image_url;
    }
    return '';
  };

  const renderProductInfo = (product) => {
    if (product.type === 'Product') {
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>{product.title}</Title>
            {product.discountPercentage && <DiscountPercentage>{product.discountPercentage}%</DiscountPercentage>}
          </div>
          {product.price && <p style={{ textAlign: 'right' }}>{product.price}원</p>}
        </div>
      );
    } else if (product.type === 'Category') {
      return (
        <div>
          <Title>#{product.title}</Title>
        </div>
      );
    } else if (product.type === 'Exhibition') {
      return (
        <div>
          <Title>{product.title}</Title>
          {product.sub_title && <SubTitle>{product.sub_title}</SubTitle>}
        </div>
      );
    } else if (product.type === 'Brand') {
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BrandName>{product.brand_name}</BrandName>
            {product.follower && (
              <div>
                <FollowerLabel>관심고객수</FollowerLabel>
                <Follower>{product.follower}</Follower>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const isBookmarked = (productId) => {
    return bookmarkItems && bookmarkItems.some((item) => item.id === productId);
  };

  const handleBookmark = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      return;
    }

    if (isBookmarked(productId)) {
      setBookmarkItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    } else {
      setBookmarkItems((prevItems) => [...prevItems, product]);
    }
  };

  const renderEmptyBookmarkText = () => {
    if (!bookmarkItems || bookmarkItems.length === 0) {
      return (
        <EmptyBookmarkText>
          <BsFillBookmarkStarFill />
          북마크가 비어있습니다.
        </EmptyBookmarkText>
      );
    }
    return null;
  };

  const filteredProducts = bookmarkItems
    ? products.filter((product) => bookmarkItems.some((item) => item.id === product.id))
    : [];

  return (
    <ProductContainer>
      {renderEmptyBookmarkText()}
      {filteredProducts.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={getRandomProductImage(product)} alt={product.title} />
          <ProductInfo>
            {renderProductInfo(product)}
            <BookmarkButton>
              <Star
                productId={product.id}
                isBookmarked={isBookmarked(product.id)}
                onBookmark={() => handleBookmark(product.id)}
              />
            </BookmarkButton>
          </ProductInfo>
        </ProductCard>
      ))}
    </ProductContainer>
  );
};

export default BookList;
