<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const dot = ref(null)
const ring = ref(null)
const enabled = ref(false)

let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
let ringX = mouseX
let ringY = mouseY
let raf = null

function onMove(event) {
  mouseX = event.clientX
  mouseY = event.clientY

  if (dot.value)
    dot.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
}

function loop() {
  ringX += (mouseX - ringX) * 0.16
  ringY += (mouseY - ringY) * 0.16

  if (ring.value)
    ring.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

  raf = requestAnimationFrame(loop)
}

function onOver(event) {
  const interactive = event.target.closest('a, button, [data-cursor], input, textarea')
  ui.setCursor(interactive?.dataset?.cursor || '', Boolean(interactive))
}

const classes = ['has-custom-cursor']

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!fine || reduced)
    return

  enabled.value = true
  classes.forEach(cls => document.documentElement.classList.add(cls))

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseover', onOver, { passive: true })
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  classes.forEach(cls => document.documentElement.classList.remove(cls))
  if (raf)
    cancelAnimationFrame(raf)
})
</script>

<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <span ref="dot" class="cursor__dot" />
    <span
      ref="ring"
      class="cursor__ring"
      :class="{ 'is-hover': ui.cursorHover, 'has-label': ui.cursorLabel }"
    >
      <span v-if="ui.cursorLabel" class="cursor__label">{{ ui.cursorLabel }}</span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.cursor {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
}

.cursor__dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}

.cursor__ring {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  transition:
    width 0.35s var(--ease),
    height 0.35s var(--ease),
    border-color 0.35s var(--ease),
    background-color 0.35s var(--ease);
}

.cursor__ring.is-hover {
  width: 62px;
  height: 62px;
  border-color: var(--cyan);
  background: rgba(34, 211, 238, 0.08);
}

.cursor__ring.has-label {
  width: 88px;
  height: 88px;
  border-color: var(--violet);
  background: rgba(124, 92, 255, 0.18);
}

.cursor__label {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
}
</style>
