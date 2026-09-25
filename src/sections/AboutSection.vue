<script setup>
import { Icon } from '@iconify/vue'

import SectionHeading from '@/components/ui/SectionHeading.vue'
import GlowCard from '@/components/ui/GlowCard.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'
import { profile, services } from '@/data/portfolio'

const accents = ['violet', 'cyan', 'magenta', 'violet']
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about__grid">
        <div v-reveal="{ x: -40 }" class="about__aside">
          <div class="about__portrait">
            <span class="about__ring" />
            <span class="about__initials">{{ profile.initials }}</span>
            <span class="about__glow" />
          </div>
          <div class="about__meta">
            <p class="about__meta-row">
              <Icon icon="mdi:map-marker-outline" width="18" />
              {{ profile.location }}
            </p>
            <p class="about__meta-row">
              <Icon icon="mdi:briefcase-outline" width="18" />
              {{ profile.roles[0] }}
            </p>
            <p class="about__meta-row">
              <Icon icon="mdi:email-outline" width="18" />
              <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            </p>
          </div>
        </div>

        <div class="about__content">
          <SectionHeading index="01" eyebrow="About me">
            Designing &amp; engineering <span class="gradient-text">interfaces that feel alive</span>
          </SectionHeading>

          <div v-reveal="{ delay: 0.08 }" class="about__text">
            <p>
              I'm a frontend engineer focused on the modern Vue ecosystem. I care about
              clean architecture, measurable performance and the small details that make
              a product feel premium.
            </p>
            <p>
              My sweet spot is the intersection of design and engineering — building
              component systems, wiring up state, and layering motion and 3D so the
              experience stays smooth even under heavy content.
            </p>
          </div>

          <div v-reveal="{ delay: 0.14 }" class="about__actions">
            <MagneticButton :href="profile.resumeUrl" variant="ghost" target="_blank" rel="noopener">
              <Icon icon="mdi:download-outline" width="18" />
              Download CV
            </MagneticButton>
          </div>

          <ul v-reveal="{ delay: 0.1, stagger: 0.1 }" class="about__services">
            <li v-for="(service, index) in services" :key="service.title">
              <GlowCard :accent="accents[index % accents.length]" class="about__service">
                <span class="about__service-icon">
                  <Icon :icon="service.icon" width="24" />
                </span>
                <h3 class="about__service-title">{{ service.title }}</h3>
                <p class="about__service-text">{{ service.text }}</p>
              </GlowCard>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about__grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}

.about__aside {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: calc(var(--nav-h) + 30px);
}

.about__portrait {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background:
    radial-gradient(circle at 30% 20%, rgba(124, 92, 255, 0.35), transparent 60%),
    radial-gradient(circle at 75% 80%, rgba(34, 211, 238, 0.25), transparent 55%),
    rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.about__initials {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5.4rem);
  font-weight: 700;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about__ring {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  animation: spin 26s linear infinite;
}

.about__glow {
  position: absolute;
  inset: auto;
  bottom: -40%;
  width: 120%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124, 92, 255, 0.4), transparent 60%);
  filter: blur(40px);
}

.about__meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.about__meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.about__meta-row a:hover {
  color: var(--cyan);
}

.about__content {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: var(--text-muted);
  max-width: 62ch;
}

.about__actions {
  display: flex;
}

.about__services {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.about__service-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: var(--cyan);
  border-radius: 14px;
  background: rgba(34, 211, 238, 0.1);
}

.about__service-title {
  margin-bottom: 8px;
  font-size: 1.08rem;
}

.about__service-text {
  font-size: 0.9rem;
  color: var(--text-dim);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 960px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__aside {
    position: static;
    max-width: 340px;
  }
}

@media (max-width: 560px) {
  .about__services {
    grid-template-columns: 1fr;
  }
}
</style>
