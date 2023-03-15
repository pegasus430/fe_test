import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const data = useSelector(state => state.films.value);

    if (!Object.keys(data).length) {
      return <Navigate to={{ pathname: '/' }} replace />;
    }
    return children;

};
