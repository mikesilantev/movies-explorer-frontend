import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ loggedIn, correctToken }) => {
  return !loggedIn && !localStorage.getItem('JWT_TOKEN') ? <Navigate to="/" /> : <Outlet />
}

export default ProtectedRoute
