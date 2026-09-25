<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  to: { type: Number, required: true },
  duration: { type: Number, default: 1600 },
  suffix: { type: String, default: '' },
})

const display = ref(0)
const el = ref(null)

let raf = null
let observer = null

function run() {
  const start = performance.now()
  const to = Number(props.to) || 0

  const step = (now) => {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - (1 - progress) ** 3
    display.value = Math.round(to * eased)

    if (progress < 1)
      raf = requestAnimationFrame(step)
  }

  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = props.to
    return
  }

  if (!el.value) {
    run()
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      run()
      observer.disconnect()
    }
  }, { threshold: 0.4 })

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  if (raf)
    cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<template>
  <span ref="el" class="count-up">{{ display }}<span class="count-up__suffix">{{ suffix }}</span></span>
</template>

<style scoped>
.count-up {
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
}

.count-up__suffix {
  color: var(--cyan);
}
</style>
