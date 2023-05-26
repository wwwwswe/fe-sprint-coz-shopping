import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Nav from "../components/Nav";

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 150px;
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
  font-family: "Inter";
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
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const DiscountPercentage = styled.p`
  margin: 0;
  font-family: "Inter";
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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("전체");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://cozshopping.codestates-seb.link/api/v1/products"
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    // 필터링 또는 다른 작업 수행
  };

  return (
    <>
      <Nav activeNav={activeNav} onNavClick={handleNavClick} />
      <ProductContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* 필터링된 요소를 렌더링하는 부분 */}
            {products.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image_url} alt={product.title} />
                <ProductInfo>
                  {/* 상품 정보 렌더링 */}
                  <Title>{product.title}</Title>
                  {product.discount_percentage && (
                    <DiscountPercentage>
                      {product.discount_percentage}%
                    </DiscountPercentage>
                  )}
                  {/* ... */}
                </ProductInfo>
              </ProductCard>
            ))}
          </>
        )}
      </ProductContainer>
    </>
  );
};

export default ProductList;
