import React, { createContext, useState } from "react";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkItems, setBookmarkItems] = useState([]);

  return (
    <BookmarkContext.Provider value={{ bookmarkItems, setBookmarkItems }}>
      {children}
    </BookmarkContext.Provider>
  );
};
