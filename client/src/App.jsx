import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">Dashboard (protected)</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-extrabold text-indigo-600">Talento</div>
          <nav className="flex items-center gap-4">
            <Link to="/signup" className="text-sm text-gray-700 hover:text-indigo-600">Signup</Link>
            <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
          </nav>
        </div>
      </header>

      <main className="app-container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<Signup />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
