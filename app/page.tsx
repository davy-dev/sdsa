"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import InterventionZone from "@/components/intervention-zone"
import TrustSection from "@/components/trust-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import LoadingScreen from "@/components/loading-screen"
import AnimatedSection from "@/components/animated-section"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isContentVisible, setIsContentVisible] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Délai pour permettre au loader de disparaître avant d'afficher le contenu
    setTimeout(() => {
      setIsContentVisible(true)
    }, 100)
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <main 
        className={`min-h-screen bg-background transition-all duration-1000 ease-in-out ${
          isContentVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <Navigation />
        <AnimatedSection delay={0} direction="up">
          <HeroSection />
        </AnimatedSection>
        <AnimatedSection delay={200} direction="up">
          <ServicesSection />
        </AnimatedSection>
        <AnimatedSection delay={400} direction="up">
          <InterventionZone />
        </AnimatedSection>
        <AnimatedSection delay={600} direction="up">
          <TrustSection />
        </AnimatedSection>
        <AnimatedSection delay={800} direction="up">
          <ContactSection />
        </AnimatedSection>
        <AnimatedSection delay={1000} direction="up">
          <Footer />
        </AnimatedSection>
      </main>
    </>
  )
}
