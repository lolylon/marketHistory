import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ text = 'Loading...', size = 'md' }) => {
  const spinnerSize = size === 'sm' ? { width: '1.5rem', height: '1.5rem' } : 
                     size === 'lg' ? { width: '3rem', height: '3rem' } :
                     { width: '2rem', height: '2rem' };
  
  return (
    <div className="text-center my-4 loading-container">
      <Spinner 
        animation="border" 
        role="status" 
        variant="primary"
        style={spinnerSize}
      >
        <span className="visually-hidden">{text}</span>
      </Spinner>
      {text && <p className="mt-2 text-muted">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;