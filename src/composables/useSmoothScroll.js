import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { onBeforeUnmount, onMounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Boots a Lenis smooth-scroll instance and keeps GSAP's ScrollTrigger
 * perfectly in sync with it. Call once, inside the root component.
 */
export function useSmoothScroll() {
  onMounted(() => {
    if (prefersReducedMotion())
      return

    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so both share a single RAF loop.
    const raf = time => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    onBeforeUnmount(() => {
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
    })
  })
}

/** Smoothly scrolls to a CSS selector or element (with a navbar offset). */
export function scrollToSection(target, offset = -72) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function getLenis() {
  return lenis
}
