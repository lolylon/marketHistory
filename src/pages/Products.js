import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { 
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Star, StarFill } from 'react-bootstrap-icons';

const Products = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
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

  const truncateDescription = (text, productId) => {
    if (!text) return '';
    const MAX_LENGTH = 100;
    if (text.length <= MAX_LENGTH) return text;
    
    if (expandedDescriptions[productId]) {
      return (
        <>
          {text}
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 ms-1"
            onClick={(e) => {
              e.preventDefault();
              toggleDescription(productId);
            }}
          >
            Show Less
          </Button>
        </>
      );
    }
    
    return (
      <>
        {text.substring(0, MAX_LENGTH)}...
        <Button 
          variant="link" 
          size="sm" 
          className="p-0 ms-1"
          onClick={(e) => {
            e.preventDefault();
            toggleDescription(productId);
          }}
        >
          Read More
        </Button>
      </>
    );
  };

  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === 'price') {
          return sortOrder === 'asc' 
            ? a.price - b.price
            : b.price - a.price;
        }
        return 0;
      });
  }, [products, searchTerm, sortBy, sortOrder]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="h4 fw-bold mb-4">All Products</h1>
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <InputGroup className="mb-3 mb-md-0" style={{ maxWidth: '300px' }}>
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <div className="d-flex gap-2">
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="name">Sort by name</option>
            <option value="price">Sort by price</option>
          </Form.Select>
          
          <Button
            variant="outline-secondary"
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>
      
      <Row className="g-4">
        {filteredProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <div className="ratio ratio-1x1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid object-fit-contain p-3"
                  style={{ backgroundColor: '#f8f9fa' }}
                  onError={(e) => {
                    e.target.src = '/placeholder.png'; // Fallback image
                    e.target.onerror = null;
                  }}
                />
              </div>
              
              <Card.Body className="d-flex flex-column">
                <h3 className="h6 mb-2">
                  {product.name}
                </h3>
                <div className="d-flex align-items-center mb-2">
                  {renderStars(product.rating)}
                  <span className="ms-2 text-muted small">
                    ({product.rating ? product.rating.toFixed(1) : 'No'} rating)
                  </span>
                </div>
                <p className="text-muted small mb-3 flex-grow-1">
                  {truncateDescription(product.description, product.id)}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="h5 mb-0">
                    {product.price.toFixed(2)} ₸
                  </h4>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    variant="primary"
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
  );
};

export default Products; 