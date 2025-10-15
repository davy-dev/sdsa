"use client"

import { Canvas } from "@react-three/fiber"

interface HybridCanvasProps {
  children: React.ReactNode
  [key: string]: any
}

export default function HybridCanvas({ children, ...props }: HybridCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      {...props}
    >
      {children}
    </Canvas>
  )
}
