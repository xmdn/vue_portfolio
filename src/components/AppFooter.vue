<script setup>
import { Icon } from '@iconify/vue'

import { scrollToSection } from '@/composables/useSmoothScroll'
import { profile } from '@/data/portfolio'

const year = new Date().getFullYear()

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__mark">{{ profile.initials }}</span>
        <div>
          <p class="footer__name">{{ profile.name }}</p>
          <p class="footer__role">{{ profile.roles[0] }} · {{ profile.location }}</p>
        </div>
      </div>

      <nav class="footer__links" aria-label="Footer">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="footer__link"
          @click="scrollToSection(`#${link.id}`)"
        >
          {{ link.label }}
        </button>
      </nav>

      <ul class="footer__socials">
        <li v-for="social in profile.socials" :key="social.name">
          <a
            class="footer__social"
            :href="social.url"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon :icon="social.icon" width="20" />
          </a>
        </li>
      </ul>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} {{ profile.name }}. Built with Vue 3, Three.js &amp; GSAP.</p>
      <button class="footer__top" @click="scrollToSection('#home')">
        Back to top
        <Icon icon="mdi:arrow-up" width="18" />
      </button>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  z-index: 1;
  padding-block: 54px 34px;
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, transparent, rgba(124, 92, 255, 0.05));
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer__mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  font-family: var(--font-display);
  font-weight: 600;
  border-radius: 14px;
  background: var(--grad-warm);
}

.footer__name {
  font-family: var(--font-display);
  font-weight: 600;
}

.footer__role {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.footer__link {
  padding: 8px 14px;
  font-size: 0.9rem;
  color: var(--text-muted);
  border-radius: 999px;
  transition: color 0.3s var(--ease), background-color 0.3s var(--ease);
}

.footer__link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.footer__socials {
  display: flex;
  gap: 10px;
}

.footer__social {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
}

.footer__social:hover {
  color: #fff;
  border-color: var(--cyan);
  transform: translateY(-3px);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 38px;
  padding-top: 22px;
  font-size: 0.84rem;
  color: var(--text-dim);
  border-top: 1px solid var(--border);
}

.footer__top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: var(--text-muted);
  transition: color 0.3s var(--ease);
}

.footer__top:hover {
  color: var(--cyan);
}
</style>
