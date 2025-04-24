'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Bar, Radar } from 'react-chartjs-2'

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Dados de exemplo para os gráficos
const mockData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  areas: ['Linguagens', 'Humanas', 'Natureza', 'Matemática'],
  acertos: {
    geral: [65, 68, 72, 75, 79, 82],
    linguagens: [70, 72, 75, 78, 80, 83],
    humanas: [75, 78, 80, 82, 85, 88],
    natureza: [60, 63, 67, 70, 73, 76],
    matematica: [55, 60, 65, 70, 75, 80]
  },
  errosPorDificuldade: {
    facil: [10, 8, 7, 6, 5, 4],
    medio: [15, 14, 13, 12, 10, 9],
    dificil: [10, 10, 8, 7, 6, 5]
  },
  radarData: [75, 82, 68, 70]
}

export default function Dashboard() {
  const [periodo, setPeriodo] = useState('todos')

  // Configuração do gráfico de linha
  const lineChartData = {
    labels: mockData.labels,
    datasets: [
      {
        label: 'Geral',
        data: mockData.acertos.geral,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3
      },
      {
        label: 'Linguagens',
        data: mockData.acertos.linguagens,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3
      },
      {
        label: 'Humanas',
        data: mockData.acertos.humanas,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3
      },
      {
        label: 'Natureza',
        data: mockData.acertos.natureza,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.3
      },
      {
        label: 'Matemática',
        data: mockData.acertos.matematica,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3
      }
    ]
  }

  // Configuração do gráfico de barras empilhadas
  const barChartData = {
    labels: mockData.labels,
    datasets: [
      {
        label: 'Fácil',
        data: mockData.errosPorDificuldade.facil,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
      },
      {
        label: 'Médio',
        data: mockData.errosPorDificuldade.medio,
        backgroundColor: 'rgba(234, 179, 8, 0.7)',
      },
      {
        label: 'Difícil',
        data: mockData.errosPorDificuldade.dificil,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }
    ]
  }

  // Configuração do gráfico de radar
  const radarChartData = {
    labels: mockData.areas,
    datasets: [
      {
        label: 'Desempenho por Área',
        data: mockData.radarData,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)'
      }
    ]
  }

  // Opções comuns para os gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  // Opções específicas para o gráfico de barras empilhadas
  const barChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe seu desempenho nos testes e simulados do ENEM
          </p>
        </div>
        <Tabs defaultValue="todos" value={periodo} onValueChange={setPeriodo}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="30dias">30 dias</TabsTrigger>
            <TabsTrigger value="90dias">90 dias</TabsTrigger>
            <TabsTrigger value="ano">Ano</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">
              +15% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Linguagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Humanas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +10% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Redação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">820</div>
            <p className="text-xs text-muted-foreground">
              +50 pontos em relação à última
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Acertos</CardTitle>
            <CardDescription>
              Percentual de acertos ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <Line data={lineChartData} options={chartOptions} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Erros por Dificuldade</CardTitle>
            <CardDescription>
              Distribuição de erros por nível de dificuldade
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <Bar data={barChartData} options={barChartOptions} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Área</CardTitle>
          <CardDescription>
            Comparativo entre as quatro áreas de conhecimento
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex justify-center">
          <div className="w-full max-w-md">
            <Radar data={radarChartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Feedback Personalizado */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Feedback Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Você tem 10% de erros em questões <strong>Fáceis</strong> de <strong>Natureza</strong> – 
            sugerimos revisar os tópicos de <strong>Ecologia</strong> e <strong>Biologia Celular</strong>.
          </p>
          <p className="mt-2">
            Seu desempenho em <strong>Matemática</strong> melhorou 25% nos últimos testes. 
            Continue praticando <strong>Geometria Espacial</strong> para manter o progresso.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
