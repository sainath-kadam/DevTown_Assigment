import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); // Change the URL as per your backend endpoint
        setProducts(response.data);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <ProductContainer>
      {currentProducts.map((product, index) => (
        <ProductItem key={index}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </ProductItem>
      ))}
    </ProductContainer>
  );
};

export default ProductList;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 100px; /* Adjust top padding as needed */
`;

const ProductItem = styled.div`
  width: 300px;
  margin: 20px;
  padding: 20px 4rem;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  img {
    width: 100%;
    border-radius: 10px;
  }

  h3, p {
    color: #fff;
  }
  p:last-child {
    font-weight: bold;
    margin-top: 10px;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.8);
  }
`;