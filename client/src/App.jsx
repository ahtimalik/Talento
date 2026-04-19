import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/public/Homepage';
import Pricing from './pages/public/Pricing';
import Features from './pages/public/Features';
import SampleReport from './pages/public/SampleReport';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Dashboard from './pages/hr/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Interview from './pages/candidate/Interview';
import InterviewReport from './pages/hr/InterviewReport';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/sample-report" element={<SampleReport />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/interview/:link" element={<Interview />} />

          {/* Auth routes - wrapped in PublicRoute to redirect if already logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report/:id" element={<InterviewReport />} />
          </Route>

        </Route>

        {/* Admin routes - NO LAYOUT WRAPPER */}
        <Route element={<ProtectedRoute role="superadmin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
