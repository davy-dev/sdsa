"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(20)
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFadingOut(true)
           
            setTimeout(() => {
              setIsVisible(false)
              onComplete?.()
            }, 200)
          }, 20)
          return 100
        }
    
        return Math.min(prev + 2, 100)
      })
    }, 20)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isMounted || !isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-all duration-800 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >

      <div className={`mb-8 text-center transition-all duration-600 ease-out ${
        isFadingOut ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">SDSA</h1>
        <p className="text-gray-600">Serrurerie Dépannage et Sécurisation d'Accès</p>
      </div>

      <div className={`w-80 max-w-[90vw] transition-all duration-600 ease-out ${
        isFadingOut ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
   
        <div className="text-center mt-4">
          <span className="text-2xl font-semibold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

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
