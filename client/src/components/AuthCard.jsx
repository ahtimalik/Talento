import React, { useRef, useEffect } from 'react'

export default function AuthCard({ children }) {
  const innerRef = useRef(null)
  const debug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debugAuth')

  useEffect(() => {
    if (!innerRef.current) return
    const el = innerRef.current
    const rect = el.getBoundingClientRect()
    // Log computed sizes to help debug visual differences
    // Open DevTools console and add `?debugAuth` to the URL to enable
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('AuthCard inner width:', rect.width, 'height:', rect.height)
    }
  }, [debug])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:py-12 w-[500px]">
      <div
        className="w-full bg-white p-4 sm:p-8 md:p-10 rounded-2xl shadow-xl ring-1 ring-gray-100 mx-auto box-border"
      >
        <div
          ref={innerRef}
          className="w-full"
          style={debug ? { outline: '2px dashed rgba(99,102,241,0.45)', boxSizing: 'border-box' } : { boxSizing: 'border-box' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
