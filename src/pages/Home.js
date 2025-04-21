import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { 
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';
import { 
  StarFill,
  StarHalf,
  Star,
  Truck,
  ShieldCheck,
  ArrowRepeat
} from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { products } = useProducts();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const featuredProducts = products.slice(0, 4);
  
  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '24/7', label: 'Support' },
    { number: '100%', label: 'Satisfaction' }
  ];
  
  const categories = [
    { name: 'Electronics', icon: '💻', count: 120 },
    { name: 'Fashion', icon: '👕', count: 150 },
    { name: 'Home & Living', icon: '🏠', count: 80 },
    { name: 'Sports', icon: '⚽', count: 60 }
  ];
  
  if (loading) {
    return (
      <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <LoadingSpinner text="Loading homepage..." size="lg" />
      </Container>
    );
  }
  
  return (
    <div className="home-page">
      <section style={{paddingTop:'75px'}} className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-75 py-5">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">
                Discover Amazing <span className="text-primary">Products</span>
              </h1>
              <p className="lead mb-4">
                Shop the latest trends and find the perfect items for your lifestyle.
                Quality products at affordable prices.
              </p>
              <div className="d-flex gap-3">
                <Button
                  as={Link}
                  to="/products"
                  variant="primary"
                  size="lg"
                  className="px-4 py-3 rounded-pill shadow-lg"
                >
                  Shop Now
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="px-4 py-3 rounded-pill"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-5 d-flex gap-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold mb-1">10K+</h3>
                  <p className="mb-0">Happy Customers</p>
                </div>
                <div className="text-center">
                  <h3 className="display-6 fw-bold mb-1">500+</h3>
                  <p className="mb-0">Products</p>
                </div>
                <div className="text-center">
                  <h3 className="display-6 fw-bold mb-1">24/7</h3>
                  <p className="mb-0">Support</p>
                </div>
              </div>
            </Col>
            <Col md={6} className="position-relative">
              <div className="hero-image-container">
                <div className="floating-image">
                </div>
                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="categories-section py-5">
        <Container>
          <h2 className="text-center mb-5">Shop by Category</h2>
          <Row className="g-4">
            {categories.map(category => (
              <Col key={category.name} xs={6} md={3}>
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                  <Card.Body className="text-center">
                    <div className="display-4 mb-3">{category.icon}</div>
                    <h3 className="h5 mb-2">{category.name}</h3>
                    <p className="text-muted mb-0">{category.count} products</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      <section className="featured-products py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="mb-0">Featured Products</h2>
            <Button
              as={Link}
              to="/products"
              variant="outline-primary"
            >
              View All
            </Button>
          </div>
          <Row className="g-4">
            {featuredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={3}>
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="ratio ratio-1x1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid object-fit-contain p-3"
                      style={{ backgroundColor: '#f8f9fa' }}
                      onError={(e) => {
                        e.target.src = '/placeholder.png';
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <Card.Body>
                    <h3 className="h6 mb-2">{product.name}</h3>
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-warning me-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating) ? (
                              <StarFill />
                            ) : i === Math.floor(product.rating) && product.rating % 1 !== 0 ? (
                              <StarHalf />
                            ) : (
                              <Star />
                            )}
                          </span>
                        ))}
                      </div>
                      <small className="text-muted">({product.rating})</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h5 mb-0">{product.price.toFixed(2)} ₸</h4>
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        variant="outline-primary"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {}
      <section className="why-choose-us py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose Us</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <Truck size={48} className="text-primary mb-3" />
                  <h3 className="h5 mb-3">Fast Delivery</h3>
                  <p className="text-muted mb-0">
                    Get your products delivered to your doorstep in no time.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <ShieldCheck size={48} className="text-primary mb-3" />
                  <h3 className="h5 mb-3">Secure Payment</h3>
                  <p className="text-muted mb-0">
                    Your payment information is always protected.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <ArrowRepeat size={48} className="text-primary mb-3" />
                  <h3 className="h5 mb-3">Easy Returns</h3>
                  <p className="text-muted mb-0">
                    Not satisfied? Return your purchase within 30 days.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="stats py-5">
        <Container>
          <Row className="g-4">
            {stats.map(stat => (
              <Col key={stat.label} xs={6} md={3}>
                <div className="text-center">
                  <h3 className="display-4 fw-bold mb-2">{stat.number}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      <section className="cta-section py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-3">Ready to Start Shopping?</h2>
              <p className="lead mb-0">
                Join thousands of satisfied customers and discover amazing products.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button
                as={Link}
                to="/products"
                variant="light"
                size="lg"
                className="px-4"
              >
                Shop Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;