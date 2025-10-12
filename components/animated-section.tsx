"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  const getTransformClasses = () => {
    switch (direction) {
      case "up":
        return isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      case "down":
        return isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
      case "left":
        return isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      case "right":
        return isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      default:
        return isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`transition-all duration-700 ease-out ${getTransformClasses()} ${className}`}
    >
      {children}
    </section>
  )
}
