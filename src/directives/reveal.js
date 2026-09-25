import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * v-reveal — animates an element (or its children with `stagger`) into view
 * when it enters the viewport.
 *
 * Usage:
 *   <div v-reveal>...</div>
 *   <ul v-reveal="{ stagger: 0.08, y: 30 }">
 */
export const reveal = {
  mounted(el, binding) {
    if (prefersReducedMotion())
      return

    const {
      y = 44,
      x = 0,
      duration = 1,
      delay = 0,
      stagger = 0,
      start = 'top 85%',
      once = true,
    } = binding.value || {}

    const targets = stagger ? Array.from(el.children) : el

    const tween = gsap.from(targets, {
      y,
      x,
      autoAlpha: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    })

    // Keep a reference so we can clean up on unmount.
    el._revealTween = tween
  },
  unmounted(el) {
    el._revealTween?.scrollTrigger?.kill()
    el._revealTween?.kill()
    delete el._revealTween
  },
}

export default reveal
