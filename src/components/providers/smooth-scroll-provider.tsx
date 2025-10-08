'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

interface WindowWithScrollTrigger extends Window {
  ScrollTrigger?: {
    update: () => void
  }
}

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
      autoRaf: false, // CRITICAL: Disable autoRaf to use GSAP ticker
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
    })

    lenisRef.current = lenis

    // Integrate with GSAP - CORRECTED IMPLEMENTATION
    function raf(time: number) {
      lenis.raf(time * 1000) // CRITICAL: Multiply by 1000 for correct timing
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0) // CRITICAL: Disable lag smoothing for immediate responsiveness

    // Handle ScrollTrigger updates
    lenis.on('scroll', () => {
      // Update ScrollTrigger on scroll
      const windowWithST = window as WindowWithScrollTrigger
      if (typeof window !== 'undefined' && windowWithST.ScrollTrigger) {
        windowWithST.ScrollTrigger.update()
      }
    })

    // Cleanup function
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  // Handle anchor link clicks
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const targetId = target.getAttribute('href')?.slice(1)
        if (targetId && lenisRef.current) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            lenisRef.current.scrollTo(targetElement, {
              offset: -80, // Account for navbar height
              duration: 1.5,
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return <>{children}</>
}