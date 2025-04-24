'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart, 
  Home, 
  FileText, 
  Settings, 
  Menu, 
  X,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const routes = [
    {
      href: '/dashboard',
      label: 'Visão Geral',
      icon: Home,
      active: pathname === '/dashboard',
    },
    {
      href: '/analise-erros',
      label: 'Análise de Erros',
      icon: BarChart,
      active: pathname === '/analise-erros',
    },
    {
      href: '/redacao',
      label: 'Redação',
      icon: FileText,
      active: pathname === '/redacao',
    },
    {
      href: '/configuracoes',
      label: 'Configurações',
      icon: Settings,
      active: pathname === '/configuracoes',
    },
  ]

  const handleLogout = () => {
    // Remover token de autenticação
    localStorage.removeItem('auth_token')
    // Redirecionar para a página de login
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transition-transform duration-300 transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">ENEM Tracker</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <route.icon className="w-5 h-5 mr-3" />
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
