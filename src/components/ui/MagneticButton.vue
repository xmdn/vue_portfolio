<script setup>
import { ref } from 'vue'

const props = defineProps({
  href: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
  strength: { type: Number, default: 0.3 },
})

const el = ref(null)

function onMove(event) {
  const node = el.value
  if (!node)
    return

  const rect = node.getBoundingClientRect()
  const x = (event.clientX - (rect.left + rect.width / 2)) * props.strength
  const y = (event.clientY - (rect.top + rect.height / 2)) * props.strength

  node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
}

function reset() {
  if (el.value)
    el.value.style.transform = 'translate(0, 0)'
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    ref="el"
    :href="href || undefined"
    class="magnetic"
    :class="`magnetic--${variant}`"
    @mousemove="onMove"
    @mouseleave="reset"
    @focus="reset"
  >
    <span class="magnetic__glow" aria-hidden="true" />
    <span class="magnetic__inner">
      <slot />
    </span>
  </component>
</template>

<style scoped lang="scss">
.magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 30px;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #fff;
  border-radius: 999px;
  isolation: isolate;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease);
}

.magnetic--primary {
  background: var(--grad-primary);
  box-shadow: 0 12px 40px rgba(124, 92, 255, 0.35);
}

.magnetic--primary:hover {
  box-shadow: 0 18px 55px rgba(124, 92, 255, 0.5);
}

.magnetic--ghost {
  border: 1px solid var(--border-strong);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}

.magnetic--ghost:hover {
  border-color: rgba(34, 211, 238, 0.6);
  box-shadow: 0 12px 40px rgba(34, 211, 238, 0.18);
}

.magnetic__glow {
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  background: var(--grad-primary);
  opacity: 0;
  filter: blur(14px);
  transition: opacity 0.35s var(--ease);
}

.magnetic:hover .magnetic__glow {
  opacity: 0.75;
}

.magnetic__inner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}
</style>
