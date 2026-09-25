<script setup>
defineProps({
  items: { type: Array, required: true },
  reverse: { type: Boolean, default: false },
})
</script>

<template>
  <div class="marquee" :class="{ 'marquee--reverse': reverse }">
    <div class="marquee__track">
      <span v-for="(item, index) in items" :key="`a-${index}`" class="marquee__item">
        {{ item }}
        <i class="marquee__dot" aria-hidden="true" />
      </span>
      <!-- Duplicate for a seamless infinite loop -->
      <span
        v-for="(item, index) in items"
        :key="`b-${index}`"
        class="marquee__item"
        aria-hidden="true"
      >
        {{ item }}
        <i class="marquee__dot" aria-hidden="true" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-block: 22px;
  border-block: 1px solid var(--border);
  background: linear-gradient(90deg, rgba(124, 92, 255, 0.06), rgba(34, 211, 238, 0.05));
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 32s linear infinite;
}

.marquee--reverse .marquee__track {
  animation-direction: reverse;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 26px;
  padding-inline: 26px;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
}

.marquee__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--grad-primary);
}

@keyframes marquee-scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
