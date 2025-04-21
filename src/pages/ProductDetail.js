import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Alert } from 'react-bootstrap';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Star, StarFill, ArrowLeft } from 'react-bootstrap-icons';
import axios from 'axios';
import '../styles/ProductDetail.css';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useProducts();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await axios.get(`http://localhost:5002/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5">
        <LoadingSpinner text="Loading product details..." />
      </Container>
    );
  }
  
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }
    addToCart(product);
    navigate('/cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
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
                  src={product.image}
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
                    <span className="ms-2 text-muted">
                      ({product.rating ? product.rating.toFixed(1) : 'No'} rating)
                    </span>
                  </div>
                </div>
                <Badge bg="success" className="fs-6">
                  {product.price.toFixed(2)} ₸
                </Badge>
              </div>

              <p className="text-muted mb-4">{product.description}</p>

              <div className="mb-4">
                <h5 className="mb-3">Product Details:</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Category: {product.category}
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Brand: {product.brand}
                  </li>
                  {product.isNew && (
                    <li className="mb-2">
                      <span className="text-success me-2">✓</span>
                      New Arrival
                    </li>
                  )}
                  {product.discount && (
                    <li className="mb-2">
                      <span className="text-success me-2">✓</span>
                      {product.discount}% Discount
                    </li>
                  )}
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
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              <div className="border-top pt-4">
                <h5 className="mb-3">Stock Information</h5>
                <p className="mb-2">
                  <strong>Status:</strong>{' '}
                  <Badge bg={product.inStock ? 'success' : 'danger'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;