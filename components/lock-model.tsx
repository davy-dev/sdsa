"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"

interface LockModelProps {
  rotation?: [number, number, number]
}

export default function LockModel({ rotation = [0, 0, 0] }: LockModelProps) {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF("/key.glb")

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <primitive position={[0,1.5,0]} rotation={[0,0,0]} object={scene} scale={1} />
    </group>
  )
}
