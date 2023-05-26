import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import starOffImg from "../img/star-off.png";
import starOnImg from "../img/star-on.png";
import { BookmarkContext } from "../context/BookmarkContext";

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StarIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const AlertContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 70px;
`;

const AlertBox = styled.div`
  width: fit-content;
  height: 52px;
  padding: 6px 12px;
  margin-bottom: 10px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const AlertMessage = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
`;

const AlertIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const Star = ({ productId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAlerts, setShowAlerts] = useState([]);
  const { bookmarkItems, setBookmarkItems } = useContext(BookmarkContext);

  const handleBookmark = useCallback(() => {
    const starOnMessage = (
      <>
        <AlertIcon src={starOnImg} alt="Star On" />
        상품이 북마크에 추가되었습니다.
      </>
    );

    const starOffMessage = (
      <>
        <AlertIcon src={starOffImg} alt="Star Off" />
        상품이 북마크에서 제거되었습니다.
      </>
    );

    setShowAlerts((prevAlerts) => {
      const newBookmarkItem = {
        id: Date.now(),
        message: isBookmarked ? starOffMessage : starOnMessage,
      };

      if (prevAlerts.length >= 2) {
        return [newBookmarkItem, ...prevAlerts.slice(0, 1)];
      }
      return [newBookmarkItem, ...prevAlerts];
    });

    setBookmarkItems((prevItems) => {
      const bookmarkItemIndex = prevItems.findIndex(
        (item) => item.id === productId
      );

      if (bookmarkItemIndex !== -1) {
        // 이미 북마크된 상태인 경우 제거
        return prevItems.filter((item) => item.id !== productId);
      } else {
        // 북마크되지 않은 상태인 경우 추가
        return [...prevItems, { id: productId }];
      }
    });
  }, [isBookmarked, productId, setBookmarkItems]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlerts((prevAlerts) => prevAlerts.slice(1));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showAlerts]);

  useEffect(() => {
    if (showAlerts.length > 2) {
      setShowAlerts((prevAlerts) => prevAlerts.slice(1));
    }
  }, [showAlerts]);

  useEffect(() => {
    // 북마크 상태 변경 시 이미지 업데이트
    setShowAlerts([]);

    // 북마크 상태 변경 후 이미지 업데이트
    setShowAlerts((prevAlerts) => {
      const starOnMessage = (
        <>
          <AlertIcon src={starOnImg} alt="Star On" />
          상품이 북마크에 추가되었습니다.
        </>
      );

      const starOffMessage = (
        <>
          <AlertIcon src={starOffImg} alt="Star Off" />
          상품이 북마크에서 제거되었습니다.
        </>
      );

      const newBookmarkItem = {
        id: Date.now(),
        message: isBookmarked ? starOffMessage : starOnMessage,
      };

      if (prevAlerts.length >= 2) {
        return [newBookmarkItem, ...prevAlerts.slice(0, 1)];
      }
      return [newBookmarkItem, ...prevAlerts];
    });
  }, [isBookmarked]);

  return (
    <BookmarkContext.Provider value={{ bookmarkItems, setBookmarkItems }}>
      <StarButton onClick={handleBookmark}>
        <StarIcon src={isBookmarked ? starOnImg : starOffImg} alt="Star" />
      </StarButton>
      <Footer>
        <AlertContainer>
          {showAlerts.map((alert) => (
            <AlertBox key={alert.id}>
              <AlertMessage>{alert.message}</AlertMessage>
            </AlertBox>
          ))}
        </AlertContainer>
      </Footer>
    </BookmarkContext.Provider>
  );
};

export default Star;
