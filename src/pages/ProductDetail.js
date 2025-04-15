import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Alert } from 'react-bootstrap';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Star, StarFill, ArrowLeft } from 'react-bootstrap-icons';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useProducts();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Product not found</Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }
    addToCart(product, quantity);
    navigate('/cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarFill key={i} className="text-warning" />
        ) : (
          <Star key={i} className="text-warning" />
        )
      );
    }
    return stars;
  };

  return (
    <Container className="py-5">
      <Button 
        variant="outline-secondary" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="me-2" />
        Back to Products
      </Button>

      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          Please login to add items to your cart
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="ratio ratio-1x1">
                <img
                  src={product.images?.main}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="h3 mb-2">{product.name}</h1>
                  <div className="d-flex align-items-center mb-2">
                    {renderStars(product.rating)}
                    <span className="ms-2 text-muted">({product.reviews} reviews)</span>
                  </div>
                </div>
                <Badge bg="success" className="fs-6">
                  ${product.price}
                </Badge>
              </div>

              <p className="text-muted mb-4">{product.description}</p>

              <div className="mb-4">
                <h5 className="mb-3">Features:</h5>
                <ul className="list-unstyled">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <span className="text-success me-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="me-3">
                  <label htmlFor="quantity" className="form-label">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '80px' }}
                  />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-grow-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>

              <div className="border-top pt-4">
                <h5 className="mb-3">Additional Information</h5>
                <Row>
                  <Col sm={6}>
                    <p className="mb-2">
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p className="mb-2">
                      <strong>Brand:</strong> {product.brand}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p className="mb-2">
                      <strong>Stock:</strong> {product.stock} units
                    </p>
                    <p className="mb-2">
                      <strong>SKU:</strong> {product.sku}
                    </p>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;