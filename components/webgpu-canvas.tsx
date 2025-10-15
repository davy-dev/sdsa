"use client"

import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { WebGPURenderer } from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js"

interface WebGPUCanvasProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  [key: string]: any
}

export default function WebGPUCanvas({ children, fallback, ...props }: WebGPUCanvasProps) {
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const checkWebGPUSupport = async () => {
      try {
        if (!navigator.gpu) {
          console.log("WebGPU not supported in this browser")
          setIsWebGPUSupported(false)
          return
        }

        // Vérifier si Three.js WebGPU renderer est disponible
        const adapter = await navigator.gpu.requestAdapter()
        if (!adapter) {
          console.log("WebGPU adapter not available")
          setIsWebGPUSupported(false)
          return
        }

        console.log("WebGPU is supported! 🚀")
        setIsWebGPUSupported(true)
      } catch (error) {
        console.log("WebGPU check failed:", error)
        setIsWebGPUSupported(false)
      }
    }

    checkWebGPUSupport()
  }, [])

  const createWebGPURenderer = async (canvas: HTMLCanvasElement) => {
    try {
      const renderer = new WebGPURenderer({ canvas })
      await renderer.init()
      setIsInitialized(true)
      console.log("WebGPU renderer initialized successfully! 🎉")
      return renderer
    } catch (error) {
      console.error("Failed to initialize WebGPU renderer:", error)
      setIsInitialized(false)
      throw error
    }
  }

  if (isWebGPUSupported === null) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Vérification de WebGPU...</p>
        </div>
      </div>
    )
  }

  if (!isWebGPUSupported) {
    return fallback || (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="text-white text-center">
          <p>WebGPU non supporté, utilisation de WebGL</p>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      gl={createWebGPURenderer}
      {...props}
    >
      {children}
    </Canvas>
  )
}
