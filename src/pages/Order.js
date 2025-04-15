import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { 
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge
} from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const Order = () => {
  const { orderId } = useParams();
  const { getOrder } = useProducts();
  const { user } = useAuth();
  
  const order = getOrder(parseInt(orderId));
  
  if (!order) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5">
          <h1 className="h4 mb-4">Order Not Found</h1>
          <p className="text-muted mb-4">
            The order you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button
            as={Link}
            to="/orders"
            variant="primary"
            className="px-4 py-2"
          >
            <ArrowLeft className="me-2" /> Back to Orders
          </Button>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold mb-0">
          Order #{order.id}
        </h1>
        <Badge bg={order.status === 'pending' ? 'warning' : 'success'}>
          {order.status}
        </Badge>
      </div>
      
      <Row className="g-4">
        <Col xs={12} md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h6 className="pb-2 border-bottom mb-3">
                Order Items
              </h6>
              {order.items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="d-flex align-items-center p-3">
                    <div className="position-relative" style={{ width: '80px', height: '80px' }}>
                      <img
                        src={item.images?.main}
                        alt={item.name}
                        className="rounded"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#f8f9fa',
                          padding: '0.5rem'
                        }}
                      />
                    </div>
                    
                    <div className="flex-grow-1 ms-3">
                      <h3 className="h6 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-muted small mb-0">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    
                    <h6 className="fw-bold ms-2 mb-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h6>
                  </div>
                  {index < order.items.length - 1 && <hr className="my-0" />}
                </React.Fragment>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <h6 className="pb-2 border-bottom mb-3">
                Order Summary
              </h6>
              
              <div className="mb-3">
                <p className="small text-muted mb-1">Order Date</p>
                <p className="mb-0">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              
              <div className="mb-3">
                <p className="small text-muted mb-1">Shipping Address</p>
                <p className="mb-0">{order.shippingAddress}</p>
              </div>
              
              <div className="py-2">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="d-flex justify-content-between pt-2 border-top mt-2">
                  <span className="h6">Total</span>
                  <span className="h6 fw-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                as={Link}
                to="/"
                variant="outline-primary"
                className="w-100"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Order; 