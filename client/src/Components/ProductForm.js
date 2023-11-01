// ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/products', productData); // Assuming the backend endpoint for adding products is /products
      // Optionally: Show a success message or handle further actions after adding the product
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image URL"
        value={productData.image}
        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
      />
      <input
        type="text"
        placeholder="Title"
        value={productData.title}
        onChange={(e) => setProductData({ ...productData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={productData.description}
        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
