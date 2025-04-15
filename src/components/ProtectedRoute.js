import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Container, Card } from 'react-bootstrap';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (loading) {
    return (
      <Container className="mt-5">
        <Card 
          className="p-4 text-center shadow-sm" 
          style={{ 
            borderRadius: '0.5rem',
            background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)'
          }}
        >
          <h5 className="text-primary mb-3">Загрузка данных...</h5>
          <div className="d-flex justify-content-center mt-2">
            <Spinner animation="border" variant="primary" />
          </div>
        </Card>
      </Container>
    );
  }

  if (adminOnly) {
    return isAdmin ? children : <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;