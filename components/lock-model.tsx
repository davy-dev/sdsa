"use client"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"

interface LockModelProps {
  rotation?: [number, number, number]
}

export default function LockModel({ rotation = [0, 0, 0] }: LockModelProps) {
  const groupRef = useRef<Group>(null)
  
  const { scene } = useGLTF("/key.glb")
  
  const optimizedScene = useMemo(() => {
    if (scene) {
      console.log("LockModel - Optimizing scene...")
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = false
          child.receiveShadow = false
          if (child.material) {
            child.material.transparent = false
            child.material.alphaTest = 0.1
          }
        }
      })
    }
    return scene
  }, [scene])

  useFrame((state: any) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <primitive 
        position={[0, 1.5, 0]} 
        rotation={[0, 0, 0]} 
        object={scene} 
        scale={1} 
      />
    </group>
  )
}
