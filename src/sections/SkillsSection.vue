<script setup>
import { Icon } from '@iconify/vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import SectionHeading from '@/components/ui/SectionHeading.vue'
import { skills } from '@/data/portfolio'

const listEl = ref(null)
const visible = ref(false)

let observer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }

  if (!listEl.value)
    return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )

  observer.observe(listEl.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="skills" class="section skills">
    <div class="container">
      <SectionHeading index="02" eyebrow="Toolbox" align="center">
        Skills &amp; <span class="gradient-text">technologies</span>
      </SectionHeading>

      <ul ref="listEl" class="skills__grid">
        <li
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="skills__item"
        >
          <div class="skills__head">
            <span class="skills__icon">
              <Icon :icon="skill.icon" width="20" />
            </span>
            <span class="skills__name">{{ skill.name }}</span>
            <span class="skills__level">{{ skill.level }}%</span>
          </div>

          <span class="skills__track">
            <span
              class="skills__fill"
              :style="{
                width: visible ? `${skill.level}%` : '0%',
                transitionDelay: `${index * 0.08}s`,
              }"
            />
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 40px;
}

.skills__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skills__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skills__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  color: var(--violet);
  border: 1px solid var(--border);
  border-radius: 11px;
  background: rgba(124, 92, 255, 0.1);
}

.skills__name {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
}

.skills__level {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--cyan);
}

.skills__track {
  position: relative;
  display: block;
  height: 7px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.skills__fill {
  display: block;
  height: 100%;
  width: 0;
  border-radius: 99px;
  background: var(--grad-primary);
  box-shadow: 0 0 18px rgba(124, 92, 255, 0.55);
  transition: width 1.3s var(--ease);
}

@media (max-width: 700px) {
  .skills__grid {
    grid-template-columns: 1fr;
  }
}
</style>
