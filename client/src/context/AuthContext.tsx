import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginUser, logoutUser, registerUser } from '../api/auth'
import type { LoginPayload, RegisterPayload, User } from '../types/auth'

const AUTH_USER_STORAGE_KEY = 'bookvault_auth_user'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = window.localStorage.getItem(AUTH_USER_STORAGE_KEY)
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser) as User
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const login = async (payload: LoginPayload) => {
    const response = await loginUser(payload)
    setUser(response.user)
    window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(response.user))
  }

  const register = async (payload: RegisterPayload) => {
    const response = await registerUser(payload)
    setUser(response.user)
    window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(response.user))
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      register,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
