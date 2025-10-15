"use client"

import { useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useIsMobile } from "@/hooks/use-mobile"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  disableOnMobile?: boolean
  offset?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number }
  batchChildren?: boolean
  stagger?: number
  start?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string }
  duration?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number }
  ease?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string }
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  disableOnMobile = true,
  offset,
  batchChildren = false,
  stagger = 0.08,
  start,
  duration,
  ease
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  useGSAP(() => {
    if ((disableOnMobile && isMobile) || prefersReducedMotion) return
    gsap.registerPlugin(ScrollTrigger)

    const element = sectionRef.current
    if (!element) return

    const delaySeconds = Math.max(0, delay) / 1000

    const getOffsetFor = (bp: 'base' | 'sm' | 'md' | 'lg' | 'xl'): number => {
      if (typeof offset === 'number') return offset
      const defaults = { base: 32, sm: 50, md: 90, lg: 100, xl: 110 }
      const map = offset || {}
      return (map[bp] ?? defaults[bp])
    }

    const getStartFor = (
      bp: 'base' | 'sm' | 'md' | 'lg' | 'xl',
      defaults: { base: string; sm: string; md: string; lg: string; xl: string }
    ): string => {
      if (typeof start === 'string') return start
      const map = start || {}
      return (map[bp] ?? defaults[bp])
    }

    const getDurationFor = (
      bp: 'base' | 'sm' | 'md' | 'lg' | 'xl',
      defaults: { base: number; sm: number; md: number; lg: number; xl: number }
    ): number => {
      if (typeof duration === 'number') return duration
      const map = duration || {}
      return (map[bp] ?? defaults[bp])
    }

    const getEaseFor = (
      bp: 'base' | 'sm' | 'md' | 'lg' | 'xl',
      defaults: { base: string; sm: string; md: string; lg: string; xl: string }
    ): string => {
      if (typeof ease === 'string') return ease
      const map = ease || {}
      return (map[bp] ?? defaults[bp])
    }

    const makeFromVars = (distance: number) => {
      const base: Record<string, number | string> = { opacity: 0 }
      switch (direction) {
        case "up":
          base.y = distance
          break
        case "down":
          base.y = -distance
          break
        case "left":
          base.x = distance
          break
        case "right":
          base.x = -distance
          break
        default:
          base.y = distance
      }
      return base
    }

    const mm = gsap.matchMedia()

    const animateSingle = (distance: number, startVal: string, durationVal: number, easeVal: string) => {
      const vars = makeFromVars(distance)
      gsap.fromTo(
        element,
        vars,
        {
          opacity: 1,
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: durationVal,
          ease: easeVal,
          delay: delaySeconds,
          scrollTrigger: {
            trigger: element,
            start: startVal,
            toggleActions: "play none none none",
            once: true
          }
        }
      )
    }

    const animateBatch = (distance: number, startVal: string, durationVal: number, easeVal: string) => {
      const vars = makeFromVars(distance)
      ScrollTrigger.batch(Array.from(element.children), {
        start: startVal,
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch as any,
            vars,
            {
              opacity: 1,
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: durationVal,
              ease: easeVal,
              delay: delaySeconds,
              stagger
            }
          )
        }
      })
    }

    const run = (bp: 'base' | 'sm' | 'md' | 'lg' | 'xl', distance: number) => {
      const singleDefaults = { base: "top 85%", sm: "top 85%", md: "top 85%", lg: "top 85%", xl: "top 85%" }
      const batchDefaults = { base: "top 90%", sm: "top 90%", md: "top 90%", lg: "top 90%", xl: "top 90%" }
      const durationDefaults = { base: 0.7, sm: 0.7, md: 0.7, lg: 0.7, xl: 0.7 }
      const batchDurationDefaults = { base: 0.6, sm: 0.6, md: 0.6, lg: 0.6, xl: 0.6 }
      const easeDefaults = { base: "power2.out", sm: "power2.out", md: "power2.out", lg: "power2.out", xl: "power2.out" }

      const startVal = getStartFor(bp, batchChildren ? batchDefaults : singleDefaults)
      const durationVal = getDurationFor(bp, batchChildren ? batchDurationDefaults : durationDefaults)
      const easeVal = getEaseFor(bp, easeDefaults)

      if (batchChildren) {
        animateBatch(distance, startVal, durationVal, easeVal)
      } else {
        animateSingle(distance, startVal, durationVal, easeVal)
      }
    }

    // Tailwind-like breakpoints
    mm.add("(max-width: 639px)", () => run('base', getOffsetFor('base')))
    mm.add("(min-width: 640px) and (max-width: 767px)", () => run('sm', getOffsetFor('sm')))
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => run('md', getOffsetFor('md')))
    mm.add("(min-width: 1024px) and (max-width: 1279px)", () => run('lg', getOffsetFor('lg')))
    mm.add("(min-width: 1280px)", () => run('xl', getOffsetFor('xl')))

    return () => mm.revert()
  }, { dependencies: [delay, direction, isMobile, disableOnMobile, prefersReducedMotion, offset, batchChildren, stagger], scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={className}
    >
      {children}
    </section>
  )
}
