import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import Bookmark from './pages/Bookmark';
import ProductList from './pages/ProductList';
import { BookmarkProvider } from './context/BookmarkContext';

const App = () => {
  return (
    <Router>
      <BookmarkProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
        <Footer />
      </BookmarkProvider>
    </Router>
  );
};

export default App;
