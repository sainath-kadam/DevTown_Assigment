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

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      try {
        await axios.post('http://localhost:5000/products', productData);
        setProductData({
          image: '',
          title: '',
          description: '',
          price: '',
        });
        setSubmitted(true);
        setError(false);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      setError(true);
    }
  };

  const handleInputChange = (e, key) => {
    setProductData({ ...productData, [key]: e.target.value });
    setSubmitted(false);
  };

  return (
    <FormContainer>
      <FormBox onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Image URL"
          value={productData.image}
          onChange={(e) => handleInputChange(e, 'image')}
          required
        />

        <FormInput
          type="text"
          placeholder="Title"
          value={productData.title}
          onChange={(e) => handleInputChange(e, 'title')}
          required
        />

        <FormInput
          type="text"
          placeholder="Description"
          value={productData.description}
          onChange={(e) => handleInputChange(e, 'description')}
          required
        />

        <FormInput
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => handleInputChange(e, 'price')}
          required
        />
        <SubmitButton type="submit">Add Product</SubmitButton>
        {error && <ErrorMessage>Please fill in all details.</ErrorMessage>}
      </FormBox>
    </FormContainer>
  );
};

export default ProductForm;

const FormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#141e30, #243b55);
  padding: 3rem 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

const FormBox = styled.form`
  width: 90%;
  max-width: 40rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0.9375rem 1.5625rem rgba(0, 0, 0, 0.6);
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem 0;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 2rem;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;

  &:focus ~ label,
  &:valid ~ label {
    top: -1.25rem;
    left: 0;
    color: #03e9f4;
    font-size: 0.75rem;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem 0;
  font-size: 1rem;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  color: #03e9f4;
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 0.25rem;
  display: inline-block;
  background: transparent;
  border: 1px solid #03e9f4;
  color: #03e9f4;
  text-align: center;
  cursor: pointer;
  border-radius: 0.3125rem;
  margin-top: 2.5rem;

  &:hover {
    background: #03e9f4;
    color: #fff;
    box-shadow: 0 0 0.3125rem #03e9f4, 0 0 1.25rem #03e9f4, 0 0 2.5rem #03e9f4, 0 0 5rem #03e9f4;
  }
`;
