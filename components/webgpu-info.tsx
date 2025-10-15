"use client"

import { useEffect, useState } from "react"

interface WebGPUInfo {
  supported: boolean
  adapter?: GPUAdapter
  device?: GPUDevice
  features: string[]
  limits: Record<string, number>
}

export default function WebGPUInfo() {
  const [info, setInfo] = useState<WebGPUInfo | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkWebGPU = async () => {
      try {
        if (!navigator.gpu) {
          setInfo({ supported: false, features: [], limits: {} })
          return
        }

        const adapter = await navigator.gpu.requestAdapter()
        if (!adapter) {
          setInfo({ supported: false, features: [], limits: {} })
          return
        }

        const device = await adapter.requestDevice()
        
        setInfo({
          supported: true,
          adapter,
          device,
          features: Array.from(adapter.features),
          limits: adapter.limits
        })
      } catch (error) {
        console.error("WebGPU check failed:", error)
        setInfo({ supported: false, features: [], limits: {} })
      }
    }

    checkWebGPU()
  }, [])

  if (!info) {
    return (
      <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm">
        <div className="animate-pulse">Vérification WebGPU...</div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">WebGPU Status</span>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="text-blue-400 hover:text-blue-300"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      <div className={`${isVisible ? 'block' : 'hidden'}`}>
        <div className="mb-2">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            info.supported ? 'bg-green-400' : 'bg-red-400'
          }`}></span>
          {info.supported ? 'Supporté' : 'Non supporté'}
        </div>
        
        {info.supported && (
          <div className="text-xs space-y-1">
            <div>Limite de mémoire: {Math.round(info.limits.maxBufferSize / 1024 / 1024)} MB</div>
            <div>Textures max: {info.limits.maxTextureDimension2D}</div>
            <div>Features: {info.features.length}</div>
          </div>
        )}
      </div>
    </div>
  )
}
