'use client'

import { useState } from 'react'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('Login successful!')

      window.location.href = '/snippets/home'
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4 border border-gray-300 shadow-md rounded-md bg-white">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter password"
        required
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full">
        Login
      </button>
    </form>
  )
}
