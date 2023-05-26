import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Star from './Star';
import { BookmarkContext } from '../context/BookmarkContext';

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
  color: #452CDD;
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

const MainList = () => {
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
            {product.discount_percentage && <DiscountPercentage>{product.discount_percentage}%</DiscountPercentage>}
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

  const handleBookmark = (productId, isBookmarked) => {
    if (isBookmarked) {
      // 북마크가 이미 되어 있는 경우 제거
      setBookmarkItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    } else {
      // 북마크가 되어 있지 않은 경우 추가
      const newBookmarkItem = {
        id: productId,
        productId: productId,
        message: '상품이 북마크에 추가되었습니다.',
      };
      setBookmarkItems((prevItems) => [...prevItems, newBookmarkItem]);
    }
  };

  return (
    <ProductContainer>
      {products.map((product) => (
        <ProductCard key={`${product.id}-${product.name}`}>
          <ProductImage src={getRandomProductImage(product)} alt={product.title} />
          <ProductInfo>
            {renderProductInfo(product)}
            <BookmarkButton>
              <Star
                productId={product.id}
                isBookmarked={bookmarkItems.some((item) => item.id === product.id)}
                onBookmark={handleBookmark}
              />
            </BookmarkButton>
          </ProductInfo>
        </ProductCard>
      ))}
    </ProductContainer>
  );
};

export default MainList;
