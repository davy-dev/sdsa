"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Délai avant de commencer le fondu
          setTimeout(() => {
            setIsFadingOut(true)
            // Délai avant de masquer complètement le loader
            setTimeout(() => {
              setIsVisible(false)
              onComplete?.()
            }, 800) // Durée du fondu
          }, 300)
          return 100
        }
        return prev + Math.random() * 15 + 5 // Progression variable entre 5 et 20
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-all duration-800 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Logo ou titre */}
      <div className={`mb-8 text-center transition-all duration-600 ease-out ${
        isFadingOut ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">SDSA</h1>
        <p className="text-gray-600">Serrurerie Dépannage et Sécurisation d'Accès</p>
      </div>

      {/* Barre de progression */}
      <div className={`w-80 max-w-[90vw] transition-all duration-600 ease-out ${
        isFadingOut ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Pourcentage */}
        <div className="text-center mt-4">
          <span className="text-2xl font-semibold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Message de chargement */}
      <div className={`mt-6 text-center transition-all duration-600 ease-out ${
        isFadingOut ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <p className="text-gray-500 animate-pulse">
          Chargement en cours...
        </p>
      </div>
    </div>
  )
}
