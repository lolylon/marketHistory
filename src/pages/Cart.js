import React, { useState, useEffect } from 'react';
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
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, createOrder } = useProducts();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  if (loading) {
    return (
      <Container className="py-5">
        <LoadingSpinner text="Loading cart..." />
      </Container>
    );
  }
  
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
                    <div className="cart-item-image me-3" style={{ width: '80px', height: '80px' }}>
                      <img 
                        src={item.image || (item.images && item.images.main)} 
                        alt={item.name}
                        className="img-fluid"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain',
                          backgroundColor: '#f8f9fa'
                        }}
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0">
                        {item.price.toFixed(2)} ₸ x {item.quantity} = {(item.price * item.quantity).toFixed(2)} ₸
                      </p>
                    </div>
                    
                    <div className="d-flex align-items-center">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        className="p-1"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Dash />
                      </Button>
                      
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        className="p-1 me-3"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus />
                      </Button>
                      
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        className="p-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  
                  {index < cart.length - 1 && <hr className="my-2" />}
                </React.Fragment>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{totalPrice.toFixed(2)} ₸</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Total:</span>
                <span>{totalPrice.toFixed(2)} ₸</span>
              </div>
              
              <Button 
                variant="primary" 
                className="w-100 py-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  <ArrowLeft className="me-1" /> Continue Shopping
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;