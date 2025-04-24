'use client'

import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-xl">ENEM Tracker</div>
          <nav className="flex gap-4 sm:gap-6">
            <Button variant="ghost" onClick={() => window.location.href = '/login'}>
              Login
            </Button>
            <Button onClick={() => window.location.href = '/cadastro'}>
              Cadastre-se
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Acompanhe seu desempenho no ENEM com análise TRI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Registre seus testes, visualize seu progresso e receba feedback personalizado para melhorar seus resultados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => window.location.href = '/cadastro'}>
                    Comece agora
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => window.location.href = '/login'}>
                    Já tenho uma conta
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative aspect-video overflow-hidden rounded-xl">
                <div className="bg-gradient-to-r from-primary to-primary/60 w-full h-full flex items-center justify-center text-white text-center p-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Visualize seu progresso</h3>
                    <p>Gráficos interativos e análises detalhadas do seu desempenho</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Principais Funcionalidades
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para acompanhar seu desempenho no ENEM
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Dashboard Interativo</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Visualize sua evolução com gráficos de linha, radar e KPIs detalhados.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M2 12h20" />
                    <path d="M6 12v8" />
                    <path d="M18 12v8" />
                    <path d="M12 12v8" />
                    <path d="M18 2v4" />
                    <path d="M6 2v4" />
                    <path d="M12 2v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Análise de Erros</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Identifique padrões de erros por dificuldade e área de conhecimento.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Feedback Personalizado</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Receba sugestões de estudo baseadas no seu desempenho e padrões de erro.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ENEM Tracker. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
