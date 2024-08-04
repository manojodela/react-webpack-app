
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { useCart } from '../store/index';
import { Link, useLocation } from 'react-router-dom';
import bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import Cart from './Cart';

const NavBar = () => {
  const { cart } = useCart();
  const location = useLocation();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="#" className="nav-link">RINGS</Link>
              <Link to="#" className="nav-link">BRACELETS</Link>
              <Link to="#" className="nav-link">EARRINGS</Link>
              <Link to="#" className="nav-link">NECKLACES</Link>
            </Nav>
            <Link to="/" className='nav-link'>
              <img src={logo} alt='logo' className='img-fluid' />
            </Link>
            <Nav className="ms-auto">
              <Link to="/" className="nav-link">HOME</Link>
              <Link to="/about" className="nav-link">ABOUT</Link>
              <Link to="/contact" className="nav-link">CONTACT</Link>
              <Link to="/" className="nav-link">
                <FaSearch />
              </Link>
              <button
                className="nav-link btn"
                type="button"
                data-bs-toggle={location.pathname !== "/cart" ? "offcanvas" : ""}
                data-bs-target={location.pathname !== "/cart" ? "#offcanvasRight" : ""}
                aria-controls="offcanvasRight"
              >
                <FaShoppingBasket /> <span className="badge bg-dark text-white">{cart.length}</span>
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Shopping Cart</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-2">
          <Cart />
        </div>
      </div>
    </>
  );
}

export default NavBar;
