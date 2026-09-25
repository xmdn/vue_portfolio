<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import BackgroundFX from '@/components/BackgroundFX.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

// Single shared Lenis + GSAP ScrollTrigger loop for the whole app.
useSmoothScroll()
</script>

<template>
  <BackgroundFX />
  <CustomCursor />
  <ScrollProgress />

  <div class="app-shell">
    <AppNavbar />

    <main id="main">
      <RouterView />
    </main>

    <AppFooter />
  </div>

  <div class="grain" aria-hidden="true" />
</template>

<style scoped>
.app-shell {
  position: relative;
  z-index: 1;
}
</style>
