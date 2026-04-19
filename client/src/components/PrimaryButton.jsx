import React from 'react'

export default function PrimaryButton({ children, loading, disabled, type = 'submit', onClick, className = '' }) {
  const label = loading
    ? (typeof children === 'string'
        ? (children.toLowerCase().includes('create') ? 'Creating account...' : children.toLowerCase().includes('sign') ? 'Signing in...' : 'Loading...')
        : 'Loading...')
    : children

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`w-full inline-flex justify-center items-center py-3 px-4 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 hover:-translate-y-0.5 ${className}`}
      style={{ backgroundColor: '#4f46e5' }}
    >
      {label}
    </button>
  )
}
