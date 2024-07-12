import React from 'react';
import { Navigate } from 'react-router-dom';

const getToken = () => localStorage.getItem('token');

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return getToken() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
