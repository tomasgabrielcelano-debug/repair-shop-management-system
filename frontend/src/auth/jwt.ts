// Lightweight JWT helpers (no external deps)

function base64UrlToBase64(input: string) {
  // base64url -> base64
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  if (pad === 0) return base64
  return base64 + '='.repeat(4 - pad)
}

export function parseJwt<T = any>(token: string): T | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const payload = parts[1]
    const json = atob(base64UrlToBase64(payload))
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

export function getJwtExpMs(token: string): number | null {
  const payload = parseJwt<{ exp?: number }>(token)
  if (!payload?.exp) return null
  // exp is in seconds
  return payload.exp * 1000
}
