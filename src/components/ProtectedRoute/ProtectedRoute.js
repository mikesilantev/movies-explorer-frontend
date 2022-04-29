import React from 'react'
import { Route, Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({loggedIn}) => {
  return loggedIn ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute