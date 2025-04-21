import React from 'react';
import { useProducts } from '../../context/ProductContext';

const Overview = () => {
  const { cart } = useProducts();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center">
            <div>
              <h3 className="text-sm font-medium text-blue-800 uppercase tracking-wider">Items in Cart</h3>
              <p className="text-3xl font-bold text-blue-900">{totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-800 uppercase tracking-wider">Cart Value</h3>
              <p className="text-3xl font-bold text-green-900">${totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No recent activity to display. Your activity will appear here as you use the application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;