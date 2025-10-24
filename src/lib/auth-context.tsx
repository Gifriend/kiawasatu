"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  adminEmail: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuth")
    if (savedAuth) {
      const { email } = JSON.parse(savedAuth)
      setAdminEmail(email)
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === "admin@desa.com" && password === "admin123") {
      setAdminEmail(email)
      setIsLoggedIn(true)
      localStorage.setItem("adminAuth", JSON.stringify({ email }))
      return true
    }
    return false
  }

  const logout = () => {
    setAdminEmail(null)
    setIsLoggedIn(false)
    localStorage.removeItem("adminAuth")
  }

  return <AuthContext.Provider value={{ isLoggedIn, adminEmail, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
