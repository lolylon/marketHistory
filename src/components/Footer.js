import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{paddingTop:'75px', paddingBottom:'50px'}} className="bg-dark text-light mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p className="">
              Your one-stop shop for all your needs. Quality products, great prices, and excellent customer service.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className=" text-decoration-none">Home</Link></li>
              <li><Link to="/products" className=" text-decoration-none">Products</Link></li>
              <li><Link to="/cart" className=" text-decoration-none">Cart</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: anton.belov@narxoz.kz</li>
              <li>Phone: +8 (747) 760-6691</li>
              <li>Address: 57 Turgut Ozala, Almaty, Kazakhstan</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {currentYear} TechMarket. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 