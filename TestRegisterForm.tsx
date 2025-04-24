'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

export default function TestRegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [testType, setTestType] = useState('simulado')
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    testType: 'simulado',
    timeSpent: '',
    essayScore: '',
    areas: {
      linguagens: { total: '', correct: '' },
      humanas: { total: '', correct: '' },
      natureza: { total: '', correct: '' },
      matematica: { total: '', correct: '' }
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [area, field] = name.split('.')
      setFormData(prev => ({
        ...prev,
        areas: {
          ...prev.areas,
          [area]: {
            ...prev.areas[area as keyof typeof prev.areas],
            [field]: value
          }
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSelectChange = (value: string) => {
    setTestType(value)
    setFormData(prev => ({
      ...prev,
      testType: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de envio para a API - será substituída pela chamada real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para o dashboard após o registro
      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao registrar teste:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Novo Teste</CardTitle>
        <CardDescription>
          Preencha os dados do seu teste ou simulado para acompanhar seu desempenho
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data do Teste</Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testType">Tipo de Teste</Label>
              <Select value={testType} onValueChange={handleSelectChange}>
                <SelectTrigger id="testType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tempo">Tempo</SelectItem>
                  <SelectItem value="coerencia">Coerência</SelectItem>
                  <SelectItem value="simulado">Simulado 1</SelectItem>
                  <SelectItem value="simulado2">Simulado 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSpent">Tempo Gasto (min)</Label>
              <Input
                id="timeSpent"
                type="number"
                name="timeSpent"
                value={formData.timeSpent}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="linguagens">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="linguagens">Linguagens</TabsTrigger>
              <TabsTrigger value="humanas">Humanas</TabsTrigger>
              <TabsTrigger value="natureza">Natureza</TabsTrigger>
              <TabsTrigger value="matematica">Matemática</TabsTrigger>
            </TabsList>
            {['linguagens', 'humanas', 'natureza', 'matematica'].map((area) => (
              <TabsContent key={area} value={area} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${area}-total`}>Total de Questões</Label>
                    <Input
                      id={`${area}-total`}
                      type="number"
                      name={`${area}.total`}
                      value={formData.areas[area as keyof typeof formData.areas].total}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${area}-correct`}>Questões Corretas</Label>
                    <Input
                      id={`${area}-correct`}
                      type="number"
                      name={`${area}.correct`}
                      value={formData.areas[area as keyof typeof formData.areas].correct}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="essayScore">Nota da Redação (0-1000)</Label>
            <Input
              id="essayScore"
              type="number"
              name="essayScore"
              value={formData.essayScore}
              onChange={handleInputChange}
              min="0"
              max="1000"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Teste'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
