"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import InterventionZone from "@/components/intervention-zone"
import TrustSection from "@/components/trust-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import AnimatedSection from "@/components/animated-section"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isContentVisible, setIsContentVisible] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setIsContentVisible(true)
    }, 100)
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <main 
        className={`min-h-screen bg-background overflow-hidden transition-all duration-1000 ease-in-out pt-20 ${
          isContentVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <AnimatedSection delay={0} direction="up">
          <HeroSection />
        </AnimatedSection>
        <AnimatedSection delay={200} direction="up">
          <ServicesSection />
        </AnimatedSection>
        <AnimatedSection delay={400} direction="left">
          <InterventionZone />
        </AnimatedSection>
        <AnimatedSection delay={400} direction="right">
          <TrustSection />
        </AnimatedSection>
        <AnimatedSection delay={600} direction="up">
          <ContactSection />
        </AnimatedSection>
        <AnimatedSection delay={100} direction="up">
          <Footer />
        </AnimatedSection>
      </main>
    </>
  )
}
