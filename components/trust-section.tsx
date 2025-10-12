"use client"

import { Shield, Award, FileCheck, Clock, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const trustItems = [
  {
    icon: Award,
    title: "Artisan diplômé certifié",
    description: "Expertise reconnue et qualifications professionnelles",
  },
  {
    icon: Shield,
    title: "Assurance RC & Décennale",
    description: "Protection complète pour vos travaux",
  },
  {
    icon: FileCheck,
    title: "Devis gratuit",
    description: "Estimation transparente sans engagement",
  },
  {
    icon: Clock,
    title: "Intervention rapide",
    description: "Disponible 7j/7 pour vos urgences",
  },
]

export default function TrustSection() {
  return (
    <section id="confiance" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Ils nous ont accordé leur confiance</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Des particuliers et professionnels satisfaits de nos services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustItems.map((item, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-8">Nous travaillons avec les meilleures marques</h3>
        </div>

        {/* Brand Carousel - Ready for brand logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* Duplicate the brands array for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center space-x-12 px-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex-shrink-0 w-32 h-20 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20"
                  >
                    <span className="text-white/50 text-xs text-center px-2">Logo {index}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Links */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold mb-6">Retrouvez-nous sur</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/33744897125"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://share.google/PJeK43A9rfTfsoqO3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 12.173-12c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span>Google</span>
            </a>
            <a
              href="https://www.instagram.com/sdsa_france/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.pagesjaunes.fr/pros/61812336"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm1-17h-2v8h2V5zm0 10h-2v2h2v-2z" />
              </svg>
              <span>Pages Jaunes</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
