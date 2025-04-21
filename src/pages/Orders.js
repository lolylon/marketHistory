import React from 'react';
import { Link } from 'react-router-dom';
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

const Orders = () => {
  const { orders } = useProducts();
  const { user } = useAuth();

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5">
        <h1 className="h4 fw-bold mb-4">Your Orders</h1>
        
        <Card className="text-center p-5">
          <h5 className="text-muted mb-3">No orders found</h5>
          <p className="text-muted mb-4">
            You haven't placed any orders yet.
          </p>
          <Button
            as={Link}
            to="/products"
            variant="primary"
            size="lg"
            className="px-4 py-2"
          >
            <ArrowLeft className="me-2" /> Start Shopping
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="h4 fw-bold mb-4">
        Your Orders ({orders.length})
      </h1>
      
      <Row className="g-4">
        {orders.map(order => (
          <Col key={order.id} xs={12}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Order #{order.id}</h6>
                  <Badge bg={order.status === 'completed' ? 'success' : 'warning'}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-muted small mb-2">
                  Placed on: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-muted small mb-3">
                  Items: {order.items.length} | Total: ₸{order.total.toFixed(2)}
                </p>
                <Button
                  as={Link}
                  to={`/orders/${order.id}`}
                  variant="outline-primary"
                  size="sm"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Orders;