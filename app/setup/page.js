'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SetupPage() {
  const [state, setState] = useState('loading')

  useEffect(() => {
    fetch('/api/setup')
      .then(r => r.json())
      .then(d => setState(d.status === 'ok' ? 'success' : 'error'))
      .catch(() => setState('error'))
  }, [])

  return (
    <div className="bg-gray-950 text-gray-100 antialiased min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4">
        {state === 'loading' && (
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 flex items-center justify-center mx-auto mb-5">
              <i className="ph-duotone ph-circle-notch text-3xl text-violet-400 animate-spin"></i>
            </div>
            <p className="text-gray-400 text-sm">Setting up database...</p>
          </div>
        )}

        {state === 'success' && (
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <i className="ph-duotone ph-check-circle text-3xl text-emerald-400"></i>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Setup Complete</h2>
            <p className="text-gray-500 text-sm mb-6">
              Table <code className="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">products</code> has been created successfully.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-purple-500 transition-all">
              <i className="ph-duotone ph-rocket-launch"></i>
              Go to Home
            </Link>
          </div>
        )}

        {state === 'error' && (
          <div className="bg-gray-900/50 border border-red-800/50 rounded-2xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
              <i className="ph-duotone ph-warning text-3xl text-red-400"></i>
            </div>
            <h2 className="text-xl font-bold text-white mb-2 text-center">Setup Failed</h2>
            <p className="text-gray-500 text-sm mb-4 text-center">
              Database connection error. Check your credentials in environment variables.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
