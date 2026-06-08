import type { UserResponse } from '../api/types'

const TOKEN_KEY = 'repairshop.token'
const USER_KEY = 'repairshop.user'

// Simple pub/sub for same-tab updates (e.g., axios interceptors triggering logout)
const AUTH_EVENT = 'repairshop:auth'
function emitAuthChanged() {
  try {
    window.dispatchEvent(new Event(AUTH_EVENT))
  } catch {
    // no-op (SSR / tests)
  }
}

export function onAuthChanged(handler: () => void) {
  window.addEventListener(AUTH_EVENT, handler)
  return () => window.removeEventListener(AUTH_EVENT, handler)
}

export const authStore = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  set(token: string, user: UserResponse) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    emitAuthChanged()
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    emitAuthChanged()
  },
  getUser(): UserResponse | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as UserResponse
    } catch {
      return null
    }
  }
}
