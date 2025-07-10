// src/pages/_layouts/app.tsx
import { Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between bg-zinc-900 px-6 py-4 text-white">
        <h1 className="text-lg font-bold">Painel do Parceiro</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm">
            Olá, <strong>{user?.name}</strong>
          </span>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sair
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col bg-zinc-950 p-6 text-white">
        <Outlet />
      </main>
    </div>
  )
}
