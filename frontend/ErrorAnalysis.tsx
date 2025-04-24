'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bar } from 'react-chartjs-2'

// Dados de exemplo para análise de erros
const mockData = {
  areas: ['Linguagens', 'Humanas', 'Natureza', 'Matemática'],
  errosPorDificuldade: {
    linguagens: { facil: 5, medio: 8, dificil: 12 },
    humanas: { facil: 3, medio: 7, dificil: 10 },
    natureza: { facil: 8, medio: 12, dificil: 15 },
    matematica: { facil: 6, medio: 10, dificil: 18 }
  },
  questoesErradas: [
    { id: 'Q123', area: 'Linguagens', dificuldade: 'Fácil', topico: 'Interpretação de Texto', dica: 'Revisar técnicas de leitura e identificação de ideias principais.' },
    { id: 'Q234', area: 'Linguagens', dificuldade: 'Médio', topico: 'Figuras de Linguagem', dica: 'Estudar os diferentes tipos de figuras de linguagem e suas aplicações.' },
    { id: 'Q345', area: 'Humanas', dificuldade: 'Difícil', topico: 'Revolução Industrial', dica: 'Revisar as fases da Revolução Industrial e seus impactos sociais.' },
    { id: 'Q456', area: 'Natureza', dificuldade: 'Médio', topico: 'Genética', dica: 'Praticar exercícios de cruzamentos genéticos e probabilidade.' },
    { id: 'Q567', area: 'Natureza', dificuldade: 'Fácil', topico: 'Ecologia', dica: 'Revisar conceitos básicos de cadeias alimentares e ciclos biogeoquímicos.' },
    { id: 'Q678', area: 'Matemática', dificuldade: 'Difícil', topico: 'Geometria Analítica', dica: 'Praticar exercícios envolvendo equações de retas e circunferências.' },
    { id: 'Q789', area: 'Matemática', dificuldade: 'Médio', topico: 'Funções', dica: 'Revisar os diferentes tipos de funções e suas propriedades.' }
  ]
}

export default function ErrorAnalysis() {
  const [selectedArea, setSelectedArea] = useState('todas')
  const [selectedDifficulty, setSelectedDifficulty] = useState('todas')
  const [showDetails, setShowDetails] = useState(false)

  // Filtrar questões erradas com base nas seleções
  const filteredQuestions = mockData.questoesErradas.filter(q => {
    const areaMatch = selectedArea === 'todas' || q.area.toLowerCase() === selectedArea
    const difficultyMatch = selectedDifficulty === 'todas' || q.dificuldade.toLowerCase() === selectedDifficulty
    return areaMatch && difficultyMatch
  })

  // Preparar dados para o gráfico de barras
  const barChartData = {
    labels: mockData.areas,
    datasets: [
      {
        label: 'Fácil',
        data: mockData.areas.map(area => mockData.errosPorDificuldade[area.toLowerCase() as keyof typeof mockData.errosPorDificuldade].facil),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
      },
      {
        label: 'Médio',
        data: mockData.areas.map(area => mockData.errosPorDificuldade[area.toLowerCase() as keyof typeof mockData.errosPorDificuldade].medio),
        backgroundColor: 'rgba(234, 179, 8, 0.7)',
      },
      {
        label: 'Difícil',
        data: mockData.areas.map(area => mockData.errosPorDificuldade[area.toLowerCase() as keyof typeof mockData.errosPorDificuldade].dificil),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }
    ]
  }

  // Opções para o gráfico de barras
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Erros por Área e Dificuldade'
      }
    },
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
      <div>
        <h1 className="text-2xl font-bold">Análise de Erros</h1>
        <p className="text-muted-foreground">
          Analise seus erros por área de conhecimento e nível de dificuldade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Área</label>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as áreas</SelectItem>
              <SelectItem value="linguagens">Linguagens</SelectItem>
              <SelectItem value="humanas">Humanas</SelectItem>
              <SelectItem value="natureza">Natureza</SelectItem>
              <SelectItem value="matematica">Matemática</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Dificuldade</label>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as dificuldades</SelectItem>
              <SelectItem value="fácil">Fácil</SelectItem>
              <SelectItem value="médio">Médio</SelectItem>
              <SelectItem value="difícil">Difícil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Erros</CardTitle>
          <CardDescription>
            Visualização dos erros por área de conhecimento e nível de dificuldade
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <Bar data={barChartData} options={barChartOptions} />
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Resumo de Erros</h2>
        <Button 
          variant="outline" 
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
        </Button>
      </div>

      <Tabs defaultValue="linguagens">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="linguagens">Linguagens</TabsTrigger>
          <TabsTrigger value="humanas">Humanas</TabsTrigger>
          <TabsTrigger value="natureza">Natureza</TabsTrigger>
          <TabsTrigger value="matematica">Matemática</TabsTrigger>
        </TabsList>
        {['linguagens', 'humanas', 'natureza', 'matematica'].map((area) => (
          <TabsContent key={area} value={area}>
            <Card>
              <CardHeader>
                <CardTitle>{area.charAt(0).toUpperCase() + area.slice(1)}</CardTitle>
                <CardDescription>
                  Análise de erros na área de {area.charAt(0).toUpperCase() + area.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="bg-green-50 dark:bg-green-950/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">Fácil</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockData.errosPorDificuldade[area as keyof typeof mockData.errosPorDificuldade].facil}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        questões erradas
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Médio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockData.errosPorDificuldade[area as keyof typeof mockData.errosPorDificuldade].medio}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        questões erradas
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-950/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">Difícil</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockData.errosPorDificuldade[area as keyof typeof mockData.errosPorDificuldade].dificil}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        questões erradas
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {showDetails && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Detalhes das Questões</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Dificuldade</TableHead>
                          <TableHead>Tópico</TableHead>
                          <TableHead>Dica de Revisão</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockData.questoesErradas
                          .filter(q => q.area.toLowerCase() === area)
                          .map((question) => (
                            <TableRow key={question.id}>
                              <TableCell>{question.id}</TableCell>
                              <TableCell>{question.dificuldade}</TableCell>
                              <TableCell>{question.topico}</TableCell>
                              <TableCell>{question.dica}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Recomendações de Estudo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Com base na sua análise de erros, recomendamos que você foque nos seguintes tópicos:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Revisar <strong>Ecologia</strong> em Natureza (8 erros em questões fáceis)</li>
            <li>Praticar <strong>Geometria Analítica</strong> em Matemática (18 erros em questões difíceis)</li>
            <li>Estudar <strong>Figuras de Linguagem</strong> em Linguagens (8 erros em questões médias)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
