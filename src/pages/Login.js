import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container className="py-5">
        <LoadingSpinner text="Loading login form..." />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h1 className="h3 mb-3 fw-bold">Welcome Back</h1>
                <p className="text-muted">Sign in to your account to continue</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Envelope />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Lock />
                    </span>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </div>
                </Form.Group>
                
                {/* Кнопка входа с индикатором загрузки */}
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mt-3" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account? <Link to="/register" className="text-decoration-none">Sign up</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;