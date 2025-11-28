import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/api'
import FormInput from '../../components/FormInput'
import PrimaryButton from '../../components/PrimaryButton'
import AuthCard from '../../components/AuthCard'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!name || !email || !password) {
      setError('Please complete all required fields')
      return
    }

    setLoading(true)
    try {
      const res = await signup({ name, email, password, companyName })

      // Save token and user data
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      setMessage('Account created successfully! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1200)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className="text-center h-24 sm:h-28 md:h-32 lg:h-20 flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Create your HR account</h1>
        <p className="mt-2 text-sm text-gray-600">Start with 5 free interviews</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <FormInput
          id="name"
          label="Full Name *"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormInput
          id="email"
          label="Email *"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          id="companyName"
          label="Company Name"
          placeholder="Your company (optional)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <FormInput
          id="password"
          label="Password *"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        {message && <div className="text-sm text-green-600 bg-green-50 p-3 rounded">{message}</div>}

        <PrimaryButton loading={loading} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="text-indigo-600 font-medium hover:underline">
          Log in
        </button>
      </div>
    </AuthCard>
  )
}
