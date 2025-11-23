import React from 'react'

export default function PrimaryButton({ children, loading, disabled, type = 'submit' }) {
  const label = loading
    ? (typeof children === 'string'
        ? (children.toLowerCase().includes('create') ? 'Signing up...' : children.toLowerCase().includes('sign') ? 'Signing in...' : 'Loading...')
        : 'Loading...')
    : children

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="w-full inline-flex justify-center items-center py-2 sm:py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 transition transform duration-150 hover:-translate-y-0.5"
    >
      {label}
    </button>
  )
}
