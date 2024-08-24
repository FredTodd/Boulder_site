import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Component {...rest} /> // Ensure this passes down all props correctly
  ) : (
    <Navigate to="/login" state={{ message: 'You must log in first' }} />
  );
};

export default ProtectedRoute;
