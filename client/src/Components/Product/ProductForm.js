import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
      await axios.post('http://localhost:5000/products', productData);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <FormContainer>
      <FormBox onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Image URL"
          value={productData.image}
          onChange={(e) => setProductData({ ...productData, image: e.target.value })}
        />

        <FormInput
          type="text"
          placeholder="Title"
          value={productData.title}
          onChange={(e) => setProductData({ ...productData, title: e.target.value })}
        />

        <FormInput
          type="text"
          placeholder="Description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        />

        <FormInput
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
        />

        <SubmitButton type="submit">Add Product</SubmitButton>
      </FormBox>
    </FormContainer>
  );
};

export default ProductForm;

const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#141e30, #243b55);
`;

const FormBox = styled.form`
  width: 40rem;
  padding: 2rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const FormInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;

  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  letter-spacing: 4px;
  display: inline-block;
  background: transparent;
  border: 1px solid #03e9f4;
  color: #03e9f4;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 40px;

  &:hover {
    background: #03e9f4;
    color: #fff;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
  }
`;
