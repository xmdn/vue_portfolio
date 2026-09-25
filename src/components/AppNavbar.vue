<script setup>
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

import MagneticButton from '@/components/ui/MagneticButton.vue'
import { getLenis, scrollToSection } from '@/composables/useSmoothScroll'
import { profile } from '@/data/portfolio'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { y } = useWindowScroll()

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const scrolled = computed(() => y.value > 40)

let observers = []

function go(id) {
  ui.closeMenu()
  scrollToSection(`#${id}`)
}

onMounted(() => {
  observers = links
    .map((link) => {
      const el = document.getElementById(link.id)
      if (!el)
        return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            ui.setActiveSection(link.id)
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
      )

      observer.observe(el)
      return observer
    })
    .filter(Boolean)
})

onBeforeUnmount(() => {
  observers.forEach(observer => observer.disconnect())
  getLenis()?.start()
})

// Freeze smooth-scroll while the mobile menu is open.
watch(
  () => ui.menuOpen,
  (open) => {
    const lenis = getLenis()
    if (open)
      lenis?.stop()
    else
      lenis?.start()
  },
)
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="nav__inner container">
      <a class="nav__brand" href="#home" @click.prevent="go('home')">
        <span class="nav__mark">{{ profile.initials }}</span>
        <span class="nav__name">{{ profile.name }}</span>
      </a>

      <nav class="nav__links" aria-label="Primary">
        <button
          v-for="link in links"
          :key="link.id"
          class="nav__link"
          :class="{ 'is-active': ui.activeSection === link.id }"
          @click="go(link.id)"
        >
          {{ link.label }}
        </button>
      </nav>

      <div class="nav__actions">
        <MagneticButton
          href="#contact"
          class="nav__cta"
          @click.prevent="go('contact')"
        >
          Let's talk
          <Icon icon="mdi:arrow-top-right" width="18" />
        </MagneticButton>

        <button
          class="nav__burger"
          :class="{ 'is-open': ui.menuOpen }"
          aria-label="Toggle navigation"
          :aria-expanded="ui.menuOpen"
          @click="ui.toggleMenu()"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="ui.menuOpen" class="nav__mobile">
        <button
          v-for="(link, index) in links"
          :key="link.id"
          class="nav__mobile-link"
          :style="{ '--i': index }"
          @click="go(link.id)"
        >
          <span>{{ link.label }}</span>
          <Icon icon="mdi:arrow-top-right" width="22" />
        </button>

        <a class="nav__mobile-meta" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 800;
  padding-top: 3px;
  border-bottom: 1px solid transparent;
  transition: background-color 0.4s var(--ease), border-color 0.4s var(--ease);
}

.nav.is-scrolled {
  background: rgba(8, 9, 16, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--nav-h);
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
  font-weight: 600;
}

.nav__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-size: 0.9rem;
  color: #fff;
  border-radius: 12px;
  background: var(--grad-primary);
  box-shadow: var(--glow-violet);
}

.nav__name {
  font-size: 1.02rem;
  letter-spacing: -0.01em;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav__link {
  position: relative;
  padding: 9px 14px;
  font-size: 0.9rem;
  color: var(--text-muted);
  border-radius: 999px;
  transition: color 0.3s var(--ease), background-color 0.3s var(--ease);
}

.nav__link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.nav__link.is-active {
  color: #fff;
  background: rgba(124, 92, 255, 0.16);
}

.nav__link.is-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 16px;
  height: 2px;
  translate: -50% 0;
  border-radius: 2px;
  background: var(--grad-primary);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav__cta {
  padding: 11px 20px;
  font-size: 0.86rem;
}

.nav__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 12px;
}

.nav__burger span {
  display: block;
  width: 20px;
  height: 2px;
  margin-inline: auto;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s var(--ease), opacity 0.3s var(--ease);
}

.nav__burger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav__burger.is-open span:nth-child(2) {
  opacity: 0;
}

.nav__burger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav__mobile {
  display: none;
}

@media (max-width: 1024px) {
  .nav__links,
  .nav__cta {
    display: none;
  }

  .nav__burger {
    display: flex;
  }

  .nav__mobile {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 10px 18px 0;
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: rgba(10, 11, 20, 0.96);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .nav__mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--text-muted);
    border-radius: 14px;
    transition: color 0.3s var(--ease), background-color 0.3s var(--ease);
  }

  .nav__mobile-link:hover {
    color: #fff;
    background: rgba(124, 92, 255, 0.14);
  }

  .nav__mobile-meta {
    margin-top: 10px;
    padding: 14px 16px 2px;
    font-size: 0.85rem;
    color: var(--text-dim);
    border-top: 1px solid var(--border);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
