<script setup>
import { Icon } from '@iconify/vue'

import ParticleField from '@/components/ParticleField.vue'
import CountUp from '@/components/ui/CountUp.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'
import TypeWriter from '@/components/ui/TypeWriter.vue'
import { scrollToSection } from '@/composables/useSmoothScroll'
import { profile } from '@/data/portfolio'
</script>

<template>
  <section id="home" class="hero">
    <ParticleField />

    <div class="hero__inner container">
      <p v-reveal class="hero__badge">
        <span class="hero__pulse" />
        {{ profile.available ? 'Available for new projects' : 'Currently booked' }}
      </p>

      <h1 v-reveal="{ delay: 0.06 }" class="hero__title">
        <span class="hero__line">Hi, I'm <span class="gradient-text">{{ profile.name }}</span></span>
        <span class="hero__line hero__line--role">
          <TypeWriter :words="profile.roles" />
        </span>
      </h1>

      <p v-reveal="{ delay: 0.12 }" class="hero__lead lead">
        {{ profile.tagline }}
      </p>

      <div v-reveal="{ delay: 0.18 }" class="hero__actions">
        <MagneticButton data-cursor="View" @click="scrollToSection('#work')">
          Explore my work
          <Icon icon="mdi:arrow-right" width="18" />
        </MagneticButton>

        <MagneticButton
          variant="ghost"
          href="#contact"
          @click.prevent="scrollToSection('#contact')"
        >
          <Icon icon="mdi:email-outline" width="18" />
          Get in touch
        </MagneticButton>
      </div>

      <ul v-reveal="{ delay: 0.24, stagger: 0.08 }" class="hero__stats">
        <li v-for="stat in profile.stats" :key="stat.label" class="hero__stat">
          <CountUp :to="stat.value" :suffix="stat.suffix" class="hero__stat-value" />
          <span class="hero__stat-label">{{ stat.label }}</span>
        </li>
      </ul>
    </div>

    <button class="hero__scroll" type="button" @click="scrollToSection('#about')">
      <span>Scroll</span>
      <Icon icon="mdi:chevron-double-down" width="18" />
    </button>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding-top: calc(var(--nav-h) + 40px);
  padding-bottom: 90px;
  overflow: hidden;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  font-size: 0.82rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
}

.hero__pulse {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lime);
}

.hero__pulse::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--lime);
  animation: hero-pulse 1.8s ease-out infinite;
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: clamp(2.4rem, 7.4vw, 5.4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.hero__line {
  display: block;
}

.hero__line--role {
  font-size: clamp(1.5rem, 4.4vw, 3rem);
  font-weight: 500;
  color: var(--text-muted);
}

.hero__lead {
  max-width: 56ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 4px;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 26px;
  padding-top: 30px;
  border-top: 1px solid var(--border);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__stat-value {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 700;
}

.hero__stat-label {
  font-size: 0.82rem;
  color: var(--text-dim);
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 26px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  translate: -50% 0;
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--text-dim);
  animation: hero-bob 2.4s ease-in-out infinite;
}

.hero__scroll:hover {
  color: var(--cyan);
}

@keyframes hero-pulse {
  from {
    opacity: 0.9;
    transform: scale(0.6);
  }
  to {
    opacity: 0;
    transform: scale(1.9);
  }
}

@keyframes hero-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

@media (max-width: 720px) {
  .hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
