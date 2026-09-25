/**
 * v-tilt — subtle 3D tilt that follows the pointer.
 * Disabled on touch devices and when the user prefers reduced motion.
 *
 * Usage:
 *   <div v-tilt="{ max: 8, scale: 1.02, glare: true }">...</div>
 */
export const tilt = {
  mounted(el, binding) {
    const { max = 8, scale = 1.02, glare = false } = binding.value || {}

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const noHover = window.matchMedia('(hover: none)').matches

    if (reduced || noHover)
      return

    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'
    el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'

    let glareEl = null

    if (glare) {
      glareEl = document.createElement('span')
      glareEl.className = 'tilt-glare'
      glareEl.style.cssText = [
        'position:absolute',
        'inset:0',
        'border-radius:inherit',
        'pointer-events:none',
        'opacity:0',
        'transition:opacity .35s ease',
        'z-index:2',
      ].join(';')
      el.style.position = el.style.position || 'relative'
      el.appendChild(glareEl)
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const rotateY = (px - 0.5) * max * 2
      const rotateX = (0.5 - py) * max * 2

      el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`

      if (glareEl) {
        glareEl.style.opacity = '1'
        glareEl.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.16), transparent 45%)`
      }
    }

    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
      if (glareEl)
        glareEl.style.opacity = '0'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    el._tiltCleanup = () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      glareEl?.remove()
    }
  },
  unmounted(el) {
    el._tiltCleanup?.()
    delete el._tiltCleanup
  },
}

export default tilt
