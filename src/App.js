import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Bookmark from './pages/Bookmark';
import ProductList from './pages/ProductList';

const App = () => {
  return (
    <Router>
      <Header />
      <Main />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
