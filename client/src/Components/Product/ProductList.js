import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterPrice, filterTitle]);

  const filterProducts = () => {
    let filtered = products;

    if (filterPrice !== '') {
      filtered = filtered.filter(product => product.price <= filterPrice);
    }

    if (filterTitle !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(filterTitle.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterPriceChange = e => {
    setFilterPrice(e.target.value);
  };

  const handleFilterTitleChange = e => {
    setFilterTitle(e.target.value);
  };

  const handleSortByPrice = () => {
    const sortedByPrice = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedByPrice);
  };

  const handleSortByTitle = () => {
    const sortedByTitle = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setFilteredProducts(sortedByTitle);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <ProductListContainer>
      <FilterContainer>
      <FilterInput
          type="text"
          placeholder="Filter by Title"
          value={filterTitle}
          onChange={handleFilterTitleChange}
        />
        <FilterInput
          type="number"
          placeholder="Filter by Price"
          value={filterPrice}
          onChange={handleFilterPriceChange}
        />
        <SortButton onClick={handleSortByPrice}>Sort by Price</SortButton>
        <SortButton onClick={handleSortByTitle}>Sort by Title</SortButton>
      </FilterContainer>
      <ProductContainer>
        {currentProducts.map((product, index) => (
          <ProductItem key={index}>
            <img src={product.image} alt={product.title} />
            <h3>Title:{product.title}</h3>
            <p>Price:{product.price}</p>
            <p>{product.description}</p>
            
          </ProductItem>
        ))}
      </ProductContainer>
      <Pagination>
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink onClick={() => paginate(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </ProductListContainer>
  );
};

export default ProductList;

const ProductListContainer = styled.div`
  background: linear-gradient(#141e30, #243b55);
  min-height: 100vh;
  padding: 1rem 5%;
`;

const FilterContainer = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;

const FilterInput = styled.input`
  margin: 1rem;
  padding: 1rem;
  width: 30%;
  max-width: 15rem;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProductItem = styled.div`
  width: 20rem; 
  height: 25rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0.9375rem 1.5625rem rgba(0, 0, 0, 0.6);
  border-radius: 0.625rem;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 50%; /* Adjusted image height */
    border-radius: 0.625rem;
  }

  h3,
  p {
    color: #fff;
  }

  p:last-child {
    margin-top: 0.625rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0.9375rem 1.5625rem rgba(0, 0, 0, 0.8);
  }
`;
const Pagination = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationItem = styled.li`
  margin: 0 5px;
`;

const PaginationLink = styled.button`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;

  &:hover {
    background-color: #e0e0e0;
  }
`;


const SortButton = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #34495e;
  color: #fff;
  cursor: pointer;
`;
