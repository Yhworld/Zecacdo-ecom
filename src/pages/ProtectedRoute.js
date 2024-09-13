import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, condition, redirectTo, ...rest }) {
  return (
    <Route
      {...rest}
      element={condition ? element : <Navigate to={redirectTo} />}
    />
  );
}

export default ProtectedRoute;
