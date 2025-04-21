import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  if (loading) {
    return (
      <Container className="py-5">
        <LoadingSpinner text="Loading dashboard..." />
      </Container>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl text-secondary font-semibold">{user.name}</h2>
              <p className="text-secondary">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <Link 
              to="/dashboard" 
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                isActive('/dashboard') 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
            >
              Overview
            </Link>
            <Link 
              to="/dashboard/orders" 
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                isActive('/dashboard/orders') 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
            >
              Orders
            </Link>
            <Link 
              to="/dashboard/settings" 
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                isActive('/dashboard/settings') 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
            >
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="p-6">
          {}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;