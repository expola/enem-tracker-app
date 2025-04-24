'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ApiContextType {
  fetchTestes: (filters?: any) => Promise<any>
  fetchTesteById: (id: string) => Promise<any>
  createTeste: (testeData: any) => Promise<any>
  updateTeste: (id: string, testeData: any) => Promise<any>
  deleteTeste: (id: string) => Promise<any>
  fetchEstatisticas: (filters?: any) => Promise<any>
  fetchAnaliseErros: (filters?: any) => Promise<any>
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export function ApiProvider({ children }: { children: ReactNode }) {
  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const fetchTestes = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string)
      })

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests?${queryParams.toString()}`,
        {
          headers: getAuthHeaders()
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar testes')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar testes:', error)
      throw error
    }
  }

  const fetchTesteById = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests/${id}`,
        {
          headers: getAuthHeaders()
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar teste')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar teste:', error)
      throw error
    }
  }

  const createTeste = async (testeData: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(testeData)
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao criar teste')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao criar teste:', error)
      throw error
    }
  }

  const updateTeste = async (id: string, testeData: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests/${id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(testeData)
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao atualizar teste')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao atualizar teste:', error)
      throw error
    }
  }

  const deleteTeste = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests/${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders()
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao excluir teste')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao excluir teste:', error)
      throw error
    }
  }

  const fetchEstatisticas = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string)
      })

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests/estatisticas?${queryParams.toString()}`,
        {
          headers: getAuthHeaders()
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar estatísticas')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      throw error
    }
  }

  const fetchAnaliseErros = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string)
      })

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tests/analise-erros?${queryParams.toString()}`,
        {
          headers: getAuthHeaders()
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar análise de erros')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar análise de erros:', error)
      throw error
    }
  }

  return (
    <ApiContext.Provider value={{
      fetchTestes,
      fetchTesteById,
      createTeste,
      updateTeste,
      deleteTeste,
      fetchEstatisticas,
      fetchAnaliseErros
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider')
  }
  return context
}
