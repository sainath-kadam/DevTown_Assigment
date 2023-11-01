// App.js
import React from 'react';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';

const App = () => {
  return (
    <div>
      <h1>Add Product</h1>
      <ProductForm />
      <h1>Product List</h1>
      <ProductList />
    </div>
  );
};

export default App;
