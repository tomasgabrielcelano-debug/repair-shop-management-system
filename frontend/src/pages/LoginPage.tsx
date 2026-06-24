import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '../auth/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

const schema = z.object({
  email: z.string().min(3),
  password: z.string().min(6)
})

type FormValues = z.infer<typeof schema>

// Credenciales de demo (deben existir en la base; ver DbSeeder / comando --seed)
const DEMO_EMAIL = 'admin@local'
const DEMO_PASSWORD = 'Admin12345'

export default function LoginPage() {
  const nav = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  })

  const fillDemo = () => {
    form.setValue('email', DEMO_EMAIL, { shouldValidate: true })
    form.setValue('password', DEMO_PASSWORD, { shouldValidate: true })
  }

  useEffect(() => {
    if (isAuthenticated) nav('/app', { replace: true })
  }, [isAuthenticated, nav])

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await login(values.email, values.password)
    if (res.ok) {
      toast.success('Bienvenido')
      nav('/app')
    } else {
      toast.error(res.error.title ?? 'No se pudo iniciar sesión', {
        description: res.error.detail
      })
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>RepairShop</CardTitle>
            <p className="mt-1 text-sm text-slate-500">Iniciá sesión para acceder al panel.</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-md border border-sky-200 bg-sky-50 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sky-900">🔎 Acceso de demo</span>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="rounded border border-sky-300 bg-white px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-100"
                >
                  Usar credenciales de demo
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Email: <code className="font-mono text-slate-800">{DEMO_EMAIL}</code>
                {' · '}
                Contraseña: <code className="font-mono text-slate-800">{DEMO_PASSWORD}</code>
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input {...form.register('email')} placeholder="tu@email.com" autoComplete="email" />
              </div>
              <div>
                <label className="text-sm font-medium">Contraseña</label>
                <Input
                  {...form.register('password')}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">Ingresá con tu cuenta.</div>
                <Button variant="primary" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Entrando…' : 'Entrar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
