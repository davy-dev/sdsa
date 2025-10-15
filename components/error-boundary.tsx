"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Mettre à jour l'état pour afficher l'UI de fallback
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log l'erreur pour le débogage
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Si c'est une erreur de mémoire WebAssembly, on peut essayer de récupérer
    if (error.message.includes('WebAssembly') || error.message.includes('memory')) {
      console.warn('WebAssembly memory error detected, falling back to 2D version')
    }
  }

  render() {
    if (this.state.hasError) {
      // Afficher l'UI de fallback personnalisée ou par défaut
      return this.props.fallback || (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-spin">
              <div className="w-24 h-24 border-4 border-white/50 rounded-full m-2 animate-pulse" />
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
