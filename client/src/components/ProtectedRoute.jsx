// src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import  AuthContext from '../context/AuthContext'; // Check this import statement

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const isAuthenticated = authState.token !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
