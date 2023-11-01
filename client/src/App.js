import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductForm from './Components/Product/ProductForm';
import ProductList from './Components/Product/ProductList';
import NavBar from './Components/Navbar/Navbar';
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/all-products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
