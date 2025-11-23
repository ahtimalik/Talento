import React from 'react'

export default function FormInput({ label, type = 'text', placeholder, value, onChange, id }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className="mt-2 block w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
