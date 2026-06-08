import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

function LinkItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'block rounded-xl px-3 py-2 text-sm transition',
          isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
        )
      }
    >
      {label}
    </NavLink>
  )
}

export default function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-4 md:p-6">
        <aside className="col-span-12 md:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <div className="text-lg font-semibold">RepairShop</div>
              <div className="text-xs text-slate-500">{user?.displayName ?? user?.email}</div>
              <div className="text-xs text-slate-400">Rol: {user?.role ?? '-'}</div>
            </div>

            <nav className="space-y-1">
              <LinkItem to="/app/dashboard" label="Dashboard" />
              <LinkItem to="/app/orders" label="Órdenes" />
              <LinkItem to="/app/customers" label="Clientes" />
              <LinkItem to="/app/devices" label="Equipos" />
              <LinkItem to="/app/inventory" label="Inventario" />
              <LinkItem to="/app/templates" label="Plantillas" />
            </nav>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <Button
                className="w-full"
                onClick={() => {
                  logout()
                  location.href = '/login'
                }}
              >
                Salir
              </Button>
            </div>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
