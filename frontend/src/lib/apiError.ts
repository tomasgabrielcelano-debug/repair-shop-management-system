import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { problemDetailsToText, toProblemDetails } from '../api/client'

function getStatus(err: unknown): number | undefined {
  const ax = err as AxiosError
  return ax?.response?.status
}

function getCorrelationId(err: unknown): string | undefined {
  const ax = err as AxiosError
  const h = ax?.response?.headers as any
  return h?.['x-correlation-id'] || h?.['X-Correlation-Id'] || h?.['x-request-id']
}

export function toastApiError(fallbackTitle: string, err: unknown) {
  const status = getStatus(err)

  if (status === 401) {
    // 401 is handled centrally by the axios interceptor (logout/redirect).
    return
  }

  if (status === 403) {
    toast.error('No autorizado', {
      description: 'Tu usuario no tiene permisos para esta acción.',
    })
    return
  }

  if (status && status >= 500) {
    const cid = getCorrelationId(err)
    toast.error('Error del servidor', {
      description: cid ? `Ocurrió un error. Intentá de nuevo.\nID: ${cid}` : 'Ocurrió un error. Intentá de nuevo.',
    })
    return
  }

  // Default: show ProblemDetails if present
  const pd = toProblemDetails(err)
  toast.error(fallbackTitle, {
    description: pd ? problemDetailsToText(pd) : undefined,
  })
}
