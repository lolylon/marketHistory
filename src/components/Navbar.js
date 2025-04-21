import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';

import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Badge, Button } from 'react-bootstrap';
import { Cart3, Cpu, Sun, Moon } from 'react-bootstrap-icons';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { cart } = useProducts();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="md" fixed="top" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={RouterLink} to="/" className="d-flex align-items-center">
          <Cpu className="me-2" />
          <span className="fw-bold">TechMarket</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle  aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={RouterLink} 
              to="/" 
              active={isActive('/')}
            >
              Home
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link 
                as={RouterLink} 
                to="/dashboard" 
                active={location.pathname.includes('/dashboard')}
              >
                Dashboard
              </Nav.Link>
            )}
            <Nav.Link 
              as={RouterLink} 
              to="/products" 
              active={isActive('/products')}
            >
              Products
            </Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Button
              variant="link"
              className="nav-link p-0 px-2 me-2"
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {isAuthenticated ? (
              <>
                <Nav.Link 
                  as={RouterLink} 
                  to="/cart" 
                  className="position-relative"
                >
                  <Cart3 size={20} />
                  {cartItemCount > 0 && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle rounded-pill"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Nav.Link>
                <NavDropdown title={user?.name || 'User'} id="basic-nav-dropdown">
                  <NavDropdown.Item as={RouterLink} to="/dashboard">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={RouterLink} to="/login">Login</Nav.Link>
                <Nav.Link as={RouterLink} to="/register">Register</Nav.Link>
              </>
            )}
            <Nav.Link as={RouterLink} to="/admin/login" className="ms-2">
              Admin Panel
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;