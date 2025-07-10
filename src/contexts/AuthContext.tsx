// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/lib/axios'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signOut: () => void
  signIn: (data: { user: User; token: string }) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }, [])

  function signOut() {
    localStorage.clear()
    setUser(null)
    window.location.href = '/sign-in'
  }

  function signIn({ user, token }: { user: User; token: string }) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
