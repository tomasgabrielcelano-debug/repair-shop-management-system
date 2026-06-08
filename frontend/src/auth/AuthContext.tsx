import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { post, refreshAccessToken, toProblemDetails } from '../api/client'
import type { LoginRequest, LoginResponse, ProblemDetails, UserResponse } from '../api/types'
import { toast } from 'sonner'
import { authStore, onAuthChanged } from './authStore'
import { getJwtExpMs } from './jwt'

type AuthState = {
  user: UserResponse | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: ProblemDetails }>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(() => authStore.getUser())
  const [token, setToken] = useState<string | null>(() => authStore.getToken())

  const login = async (email: string, password: string) => {
    try {
      const body: LoginRequest = { email, password }
      const res = await post<LoginResponse>('/auth/login', body)
      authStore.set(res.accessToken, res.user)
      setUser(res.user)
      setToken(res.accessToken)
      return { ok: true as const }
    } catch (err) {
      return { ok: false as const, error: toProblemDetails(err) }
    }
  }

  const logout = () => {
    authStore.clear()
    setUser(null)
    setToken(null)
  }

  // Keep state in sync when auth changes happen outside React (e.g., axios interceptors).
  useEffect(() => {
    const off = onAuthChanged(() => {
      setUser(authStore.getUser())
      setToken(authStore.getToken())
    })

    // Multi-tab sync (storage events don't fire on the same tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'repairshop.user' || e.key === 'repairshop.token') {
        setUser(authStore.getUser())
        setToken(authStore.getToken())
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      off()
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  // Token expiration handling (logout; optional refresh if backend supports it).
  useEffect(() => {
    if (!token) return

    const expMs = getJwtExpMs(token)
    if (!expMs) return

    const refreshEnabled = (import.meta.env.VITE_AUTH_REFRESH ?? 'false') === 'true'

    const forceLogout = (description: string) => {
      logout()
      toast.error('Sesión expirada', { description })
      // Hard redirect avoids keeping stale in-memory state across routes.
      window.location.assign('/login')
    }

    const now = Date.now()
    if (expMs <= now + 5_000) {
      forceLogout('Volvé a iniciar sesión.')
      return
    }

    let refreshTimer: number | undefined
    if (refreshEnabled) {
      const refreshAt = expMs - 60_000 // 60s before exp
      const refreshDelay = refreshAt - now
      if (refreshDelay > 0) {
        refreshTimer = window.setTimeout(async () => {
          const newToken = await refreshAccessToken()
          if (!newToken) forceLogout('No se pudo renovar tu sesión. Volvé a iniciar sesión.')
        }, refreshDelay)
      }
    }

    const logoutDelay = Math.max(0, expMs - now - 2_000)
    const logoutTimer = window.setTimeout(() => {
      forceLogout('Volvé a iniciar sesión.')
    }, logoutDelay)

    return () => {
      if (refreshTimer) window.clearTimeout(refreshTimer)
      window.clearTimeout(logoutTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const value = useMemo<AuthState>(
    () => ({ user, token, isAuthenticated: !!token, login, logout }),
    [user, token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
