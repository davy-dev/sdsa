"use client"

import { Button } from "@/components/ui/button"
import { Phone, Clock, MapPin } from "lucide-react"
import { OrbitControls, Float } from "@react-three/drei"
import { useEffect, useState } from "react"
import LockModel from "./lock-model"
import HybridCanvas from "./hybrid-canvas"
import WebGPUInfo from "./webgpu-info"


export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [_, setIsLowMemory] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkMemory = () => {
      if ('deviceMemory' in navigator) {
        const deviceMemory = (navigator as any).deviceMemory
        if (deviceMemory && deviceMemory < 4) {
          setIsLowMemory(true)
        }
      }
      
      if (window.innerWidth < 768) {
        setIsLowMemory(true)
      }
    }
    
    checkMemory()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <WebGPUInfo />
       <div className="absolute inset-0 opacity-40">
         <HybridCanvas 
           camera={{ position: [0, 0, 15], fov: 50 }}
           dpr={[1, 2]}
           performance={{ min: 0.5 }}
         >
           <ambientLight intensity={7} />
           <pointLight position={[-10, -10, -10]} intensity={10} />
           <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
             <LockModel rotation={[0, scrollY * 0.005, 0]} />
           </Float>
           <OrbitControls enableZoom={false} enablePan={false} autoRotateSpeed={0.5} />
         </HybridCanvas>
       </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
              Serrurerie Dépannage et Sécurisation d'Accès
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty leading-relaxed">
              Service complet de serrurerie disponible 7j/7. Intervention rapide pour l'ouverture de portes et
              installation de systèmes de sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fadeInUp ">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Clock className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Disponible 24/7</h3>
              <p className="text-white/80 text-sm">Intervention rapide à toute heure</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <MapPin className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Île-de-France</h3>
              <p className="text-white/80 text-sm">Yvelines & Essonne</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Phone className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Devis Gratuit</h3>
              <p className="text-white/80 text-sm">Sans engagement</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <a href="tel:0744897125">
                <Phone className="mr-2 h-5 w-5" />
                Appeler maintenant
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              <a href="https://wa.me/33744897125" target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
