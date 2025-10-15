"use client"

import { MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function InterventionZone() {
  return (
    <section id="zone" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Zone d'intervention</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SDSA intervient rapidement dans toute l'Île-de-France, avec une spécialisation dans les Yvelines et
              l'Essonne.
            </p>

            <Card className="border-2 border-primary/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Secteurs couverts</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Yvelines (78)</li>
                      <li>• Essonne (91)</li>
                      <li>• Toute l'Île-de-France</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Horaires d'intervention</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dimanche au vendredi : 24h/24</li>
                      <li>• Samedi : 19h00 - 00h00</li>
                      <li className="text-accent font-medium">• Disponible 7j/7</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-24 w-24 text-primary mx-auto mb-4 animate-float" />
                <p className="text-2xl font-semibold text-primary">Île-de-France</p>
                <p className="text-lg text-muted-foreground mt-2">Yvelines • Essonne</p>
              </div>
            </div>

            <div className="absolute top-10 left-10 w-4 h-4 bg-primary rounded-full animate-pulse" />
            <div className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full animate-pulse delay-100" />
            <div className="absolute bottom-20 left-20 w-5 h-5 bg-primary rounded-full animate-pulse delay-200" />
            <div className="absolute bottom-10 right-10 w-4 h-4 bg-accent rounded-full animate-pulse delay-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
