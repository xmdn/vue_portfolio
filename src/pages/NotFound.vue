<script setup>
import MagneticButton from '@/components/ui/MagneticButton.vue'
</script>

<template>
  <section class="not-found container">
    <p class="not-found__code">404</p>
    <h1 class="not-found__title">Lost in the grid</h1>
    <p class="lead not-found__lead">
      The page you are looking for drifted into the void. Let's head back to safety.
    </p>

    <MagneticButton href="/" @click.prevent="$router.push('/')">
      Back home
    </MagneticButton>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 70vh;
  padding-block: 120px;
  text-align: center;
}

.not-found__code {
  font-family: var(--font-display);
  font-size: clamp(4rem, 16vw, 11rem);
  font-weight: 700;
  line-height: 1;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.not-found__title {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
}

.not-found__lead {
  margin-inline: auto;
}
</style>
