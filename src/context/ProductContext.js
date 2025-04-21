import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5002/api';
const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    const storedCart = localStorage.getItem('cart');
    const storedOrders = localStorage.getItem('orders');
    
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      ...orderData,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    setOrders([...orders, newOrder]);
    setCart([]);
    return newOrder;
  };

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status } 
        : order
    ));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, ...updatedData } 
        : product
    ));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      cart, 
      orders,
      loading, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      createOrder,
      getOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};