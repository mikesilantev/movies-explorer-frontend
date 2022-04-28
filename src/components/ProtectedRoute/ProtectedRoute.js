import React from 'react'
import { Route, Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({loggedIn}) => {
  console.log('ProtectedRoute: ' + loggedIn)
  return loggedIn ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute