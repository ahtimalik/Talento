import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/api'
import FormInput from '../../components/FormInput'
import PrimaryButton from '../../components/PrimaryButton'
import AuthCard from '../../components/AuthCard'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    setLoading(true)
    try {
      const res = await login({ email, password })

      // Save token and user data
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      setMessage('Login successful! Redirecting...')

      if (res.data.user.role === 'superadmin') {
        setTimeout(() => navigate('/admin'), 800)
      } else {
        setTimeout(() => navigate('/dashboard'), 800)
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className="text-center h-24 sm:h-28 md:h-32 lg:h-20 flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue to your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        {message && <div className="text-sm text-green-600 bg-green-50 p-3 rounded">{message}</div>}

        <PrimaryButton loading={loading} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')} className="text-indigo-600 font-medium hover:underline">
          Sign up
        </button>
      </div>
    </AuthCard>
  )
}
