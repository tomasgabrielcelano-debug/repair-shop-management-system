import axios, { AxiosError } from 'axios'
import type { ApiResponse, LoginResponse, ProblemDetails } from './types'
import { authStore } from '../auth/authStore'
import { toast } from 'sonner'

// Default to '/api/v1' (works with Vite proxy).
// For production you can set VITE_API_BASE, e.g. 'https://your-api.com/api/v1'
const baseURL = import.meta.env.VITE_API_BASE ?? '/api/v1'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Raw client (no response interceptor) for optional token refresh.
const raw = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = authStore.getToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }

  // Correlation id for end-to-end tracing in logs.
  // Backend will generate one if missing, but sending it improves observability.
  config.headers = config.headers ?? {}
  if (!('X-Correlation-Id' in (config.headers as any))) {
    const cid =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    ;(config.headers as any)['X-Correlation-Id'] = cid
  }
  return config
})

raw.interceptors.request.use((config) => {
  // Correlation id for end-to-end tracing in logs.
  config.headers = config.headers ?? {}
  if (!('X-Correlation-Id' in (config.headers as any))) {
    const cid =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    ;(config.headers as any)['X-Correlation-Id'] = cid
  }
  return config
})

const refreshEnabled = (import.meta.env.VITE_AUTH_REFRESH ?? 'false') === 'true'
const refreshEndpoint = (import.meta.env.VITE_AUTH_REFRESH_ENDPOINT ?? '/auth/refresh').toString()

export async function refreshAccessToken(): Promise<string | null> {
  if (!refreshEnabled) return null
  const token = authStore.getToken()
  if (!token) return null
  try {
    const res = await raw.post<ApiResponse<LoginResponse>>(
      refreshEndpoint,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const data = res.data?.data
    if (!data?.accessToken || !data?.user) return null
    authStore.set(data.accessToken, data.user)
    return data.accessToken
  } catch {
    return null
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status
    const url = (error.config?.url ?? '').toString()
    const isLogin = url.includes('/auth/login')

    if (status === 401 && !isLogin) {
      const original = error.config as any

      // One retry with refresh (optional; requires backend support).
      if (refreshEnabled && !original?._retry) {
        original._retry = true
        const newToken = await refreshAccessToken()
        if (newToken) {
          original.headers = original.headers ?? {}
          original.headers.Authorization = `Bearer ${newToken}`
          return api(original)
        }
      }

      // Token invalid/expired => logout hard
      authStore.clear()
      toast.error('Sesión expirada', { description: 'Volvé a iniciar sesión.' })
      if (location.pathname !== '/login') {
        location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Helpers that unwrap ApiResponse<T> => T
export async function get<T>(url: string, params?: any): Promise<T> {
  const res = await api.get<ApiResponse<T>>(url, { params })
  return res.data.data
}

export async function post<T>(url: string, body?: any): Promise<T> {
  const res = await api.post<ApiResponse<T>>(url, body)
  return res.data.data
}

export async function put<T>(url: string, body?: any): Promise<T> {
  const res = await api.put<ApiResponse<T>>(url, body)
  return res.data.data
}

export async function del(url: string): Promise<void> {
  await api.delete(url)
}

export function toProblemDetails(err: unknown): ProblemDetails {
  const e = err as AxiosError<any>
  const data = e?.response?.data
  if (data && typeof data === 'object') return data as ProblemDetails
  return {
    title: e?.message ?? 'Request failed',
    status: e?.response?.status
  }
}

export function problemDetailsToText(pd: ProblemDetails): string {
  const lines: string[] = []
  if (pd.title) lines.push(pd.title)
  if (pd.detail) lines.push(pd.detail)
  if (pd.errors) {
    for (const [k, v] of Object.entries(pd.errors)) {
      lines.push(`${k}: ${v.join(', ')}`)
    }
  }
  return lines.filter(Boolean).join('\n') || 'Request failed'
}

// For endpoints that return 204 No Content (e.g. POST /orders/{id}/status)
export async function postNoContent(url: string, body?: any): Promise<void> {
  await api.post(url, body)
}
