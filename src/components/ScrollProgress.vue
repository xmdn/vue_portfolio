<script setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll()

const progress = computed(() => {
  if (typeof document === 'undefined')
    return 0

  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? Math.min(y.value / max, 1) : 0
})
</script>

<template>
  <div class="progress" aria-hidden="true">
    <span class="progress__bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<style scoped>
.progress {
  position: fixed;
  inset: 0 0 auto;
  z-index: 960;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
}

.progress__bar {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  background: linear-gradient(90deg, var(--violet), var(--cyan), var(--magenta));
  box-shadow: 0 0 16px rgba(124, 92, 255, 0.7);
}
</style>
