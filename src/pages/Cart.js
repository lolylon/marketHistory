import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { 
  Plus,
  Dash,
  Trash,
  Cart as CartIcon,
  ArrowLeft
} from 'react-bootstrap-icons';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, createOrder } = useProducts();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      const order = createOrder({
        userId: user.id,
        items: cart,
        total: totalPrice,
        shippingAddress: user.address || 'Not specified',
        status: 'pending'
      });
      
      navigate(`/orders/${order.id}`);
    } else {
      navigate('/login', { state: { from: '/cart' } });
    }
  };
  
  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <h1 className="h4 fw-bold mb-4">
          Your Cart
        </h1>
        
        <Card className="text-center p-5">
          <div className="mb-4">
            <CartIcon size={80} className="text-muted opacity-70" />
          </div>
          <h5 className="text-muted mb-3">
            Your cart is empty
          </h5>
          <p className="text-muted mb-4">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button
            as={Link}
            to="/"
            variant="primary"
            size="lg"
            className="px-4 py-2"
          >
            <ArrowLeft className="me-2" /> Continue Shopping
          </Button>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <h1 className="h4 fw-bold mb-4">
        Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
      </h1>
      
      <Row className="g-4">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              {cart.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="d-flex align-items-center p-3">
                    <div className="position-relative" style={{ width: '100px', height: '100px' }}>
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
                      <h3 className="h6 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted small mb-2">
                        ${item.price.toFixed(2)} per unit
                      </p>
                      
                      <div className="d-flex align-items-center mt-2">
                        <div className="d-flex align-items-center border rounded me-2">
                          <Button 
                            variant="link" 
                            className="p-1"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Dash />
                          </Button>
                          <span className="px-2">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="link" 
                            className="p-1"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="link" 
                          className="text-danger p-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </div>
                    
                    <h6 className="fw-bold ms-2 mb-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h6>
                  </div>
                  {index < cart.length - 1 && <hr className="my-0" />}
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
              
              <div className="py-2">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="d-flex justify-content-between pt-2 border-top mt-2">
                  <span className="h6">Total</span>
                  <span className="h6 fw-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                className="w-100 py-2 mt-3"
                onClick={handleCheckout}
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
              </Button>
              
              <Button
                as={Link}
                to="/"
                variant="outline-primary"
                className="w-100 mt-2"
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

export default Cart;