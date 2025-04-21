import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/theme.css';
import './App.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Overview from './pages/dashboard/Overview';
import Orders from './pages/dashboard/Orders';
import Settings from './pages/dashboard/Settings';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Order from './pages/Order';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = !location.pathname.includes('/products/');

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 mt-5">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Overview />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
                <Route path="/orders/:orderId" element={<Order />} />
              </Routes>
            </Layout>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
