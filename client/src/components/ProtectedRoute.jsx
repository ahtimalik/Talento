import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ redirectPath = '/login', role }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {}

  if (!token) return <Navigate to={redirectPath} replace />

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
