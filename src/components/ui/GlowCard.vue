<script setup>
defineProps({
  accent: { type: String, default: 'violet' },
  padded: { type: Boolean, default: true },
})
</script>

<template>
  <div class="glow-card" :class="[`glow-card--${accent}`, { 'glow-card--padded': padded }]">
    <span class="glow-card__border" aria-hidden="true" />
    <span class="glow-card__halo" aria-hidden="true" />
    <div class="glow-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.glow-card {
  position: relative;
  border-radius: var(--radius);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015));
  border: 1px solid var(--border);
  overflow: hidden;
  transition: transform 0.45s var(--ease), border-color 0.45s var(--ease);
}

.glow-card--padded .glow-card__body {
  padding: 28px;
}

.glow-card__body {
  position: relative;
  z-index: 1;
  height: 100%;
}

.glow-card__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(140deg, var(--_a), transparent 45%, var(--_b));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.35;
  transition: opacity 0.45s var(--ease);
}

.glow-card__halo {
  position: absolute;
  left: 50%;
  bottom: -60%;
  width: 130%;
  aspect-ratio: 1;
  translate: -50% 0;
  background: radial-gradient(circle, var(--_a), transparent 60%);
  opacity: 0;
  filter: blur(50px);
  transition: opacity 0.45s var(--ease);
}

.glow-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-strong);
}

.glow-card:hover .glow-card__border {
  opacity: 1;
}

.glow-card:hover .glow-card__halo {
  opacity: 0.4;
}

.glow-card--violet {
  --_a: rgba(124, 92, 255, 0.9);
  --_b: rgba(34, 211, 238, 0.9);
}

.glow-card--cyan {
  --_a: rgba(34, 211, 238, 0.9);
  --_b: rgba(182, 255, 92, 0.85);
}

.glow-card--magenta {
  --_a: rgba(255, 45, 149, 0.9);
  --_b: rgba(124, 92, 255, 0.9);
}
</style>
