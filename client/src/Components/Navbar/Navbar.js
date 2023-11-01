import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(#141e30, #243b55);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const NavItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold; /* Added bold font weight */
  padding: 0 20px; /* Spacing for the links */
  transition: color 0.3s;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    transform-origin: right;
    transform: scaleX(0); /* Initial scale set to 0 */
    transition: transform 0.5s;
  }

  &:hover {
    color: #03e9f4;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavItem to="/">Add Product</NavItem>
      <NavItem to="/all-products">All Products</NavItem>
    </NavBarContainer>
  );
};

export default NavBar;
