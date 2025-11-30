import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoute({ redirectPath }) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {}

    // If user is logged in, redirect them away from public auth pages
    if (token) {
        // Redirect superadmin to admin dashboard, regular users to dashboard
        const destination = redirectPath || (user.role === 'superadmin' ? '/admin' : '/dashboard')
        return <Navigate to={destination} replace />
    }

    // If not logged in, allow access to the public route
    return <Outlet />
}
