"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lock, Shield, DoorOpen, Settings, Building2, Wrench } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: DoorOpen,
    title: "Ouverture de porte",
    description: "Ouverture porte claquée, intervention rapide sans dégâts",
  },
  {
    icon: Lock,
    title: "Installation de serrures",
    description: "Serrures monopoint et multipoint, verrous de sécurité",
  },
  {
    icon: Shield,
    title: "Porte blindée",
    description: "Installation et blindage de portes, sécurité maximale",
  },
  {
    icon: Settings,
    title: "Volets roulants",
    description: "Pose et réparation de volets roulants électriques et manuels",
  },
  {
    icon: Building2,
    title: "Collectivités",
    description: "Maintenance serrurerie, organigramme de clés, dispositifs ERP",
  },
  {
    icon: Wrench,
    title: "Dépannage urgent",
    description: "Intervention 24/7 pour tous types de serrures et portes",
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            x: index < 3 ? -500 : 500,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 pb-[670px] bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">Nos Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Des solutions complètes de serrurerie pour particuliers et professionnels
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[700px] opacity-30 pointer-events-none z-0">
          <Image
            src="/locksmith-character-3d.png"
            alt="Serrurier professionnel SDSA"
            fill
            className="object-contain object-bottom"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {services.map((service, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl bg-background/95 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
