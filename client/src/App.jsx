import React from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Homepage from './pages/public/Homepage'
import Pricing from './pages/public/Pricing'
import Features from './pages/public/Features'
import SampleReport from './pages/public/SampleReport'
import Privacy from './pages/public/Privacy'
import Terms from './pages/public/Terms'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Dashboard from './pages/hr/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">Talento</Link>
        <nav className="flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-indigo-600">Features</Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-indigo-600">Pricing</Link>
          <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-indigo-600">Signup</Link>
          <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with header */}
        <Route path="/" element={<><Homepage /></>} />
        <Route path="/pricing" element={<><Header /><Pricing /></>} />
        <Route path="/features" element={<><Header /><Features /></>} />
        <Route path="/sample-report" element={<><Header /><SampleReport /></>} />
        <Route path="/privacy" element={<><Header /><Privacy /></>} />
        <Route path="/terms" element={<><Header /><Terms /></>} />

        {/* Auth routes (no header) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute role="superadmin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
