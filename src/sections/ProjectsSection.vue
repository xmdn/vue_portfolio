<script setup>
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

import SectionHeading from '@/components/ui/SectionHeading.vue'
import { projects, sections } from '@/data/portfolio'

const active = ref('All')

const filtered = computed(() =>
  active.value === 'All'
    ? projects
    : projects.filter(project => project.category === active.value),
)
</script>

<template>
  <section id="work" class="section projects">
    <div class="container">
      <div class="projects__top">
        <SectionHeading
          :index="sections.projects.index"
          :eyebrow="sections.projects.eyebrow"
          :title="sections.projects.title"
          :accent="sections.projects.accent"
        />

        <div v-reveal class="projects__filters" role="tablist" aria-label="Filter projects">
          <button
            v-for="filter in sections.projects.filters"
            :key="filter"
            class="projects__filter"
            :class="{ 'is-active': active === filter }"
            role="tab"
            :aria-selected="active === filter"
            @click="active = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <TransitionGroup tag="ul" name="cards" class="projects__grid">
        <li v-for="project in filtered" :key="project.title" class="projects__cell">
          <article
            v-tilt="{ max: 6, scale: 1.015, glare: true }"
            class="projects__card"
          >
            <div
              class="projects__thumb"
              :style="{ backgroundImage: `linear-gradient(135deg, ${project.accent[0]}, ${project.accent[1]})` }"
            >
              <span class="projects__year">{{ project.year }}</span>
              <span class="projects__ghost">{{ project.title }}</span>
            </div>

            <div class="projects__body">
              <div class="projects__row">
                <span class="projects__category">{{ project.category }}</span>
                <a
                  class="projects__link"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  :aria-label="`Open ${project.title}`"
                >
                  <Icon icon="mdi:arrow-top-right" width="18" />
                </a>
              </div>

              <h3 class="projects__title">{{ project.title }}</h3>
              <p class="projects__desc">{{ project.description }}</p>

              <ul class="projects__tags">
                <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </article>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects__top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 26px;
  margin-bottom: clamp(34px, 5vw, 56px);
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
}

.projects__filter {
  padding: 9px 18px;
  font-size: 0.85rem;
  color: var(--text-muted);
  border-radius: 999px;
  transition: color 0.3s var(--ease), background-color 0.3s var(--ease);
}

.projects__filter:hover {
  color: var(--text);
}

.projects__filter.is-active {
  color: #fff;
  background: var(--grad-primary);
  box-shadow: 0 8px 24px rgba(124, 92, 255, 0.35);
}

.projects__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.projects__cell {
  position: relative;
}

.projects__card {
  height: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.012));
  overflow: hidden;
}

.projects__thumb {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  padding: 16px 18px;
  background-size: cover;
  overflow: hidden;
}

.projects__thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(6, 7, 12, 0.75));
}

.projects__year {
  position: relative;
  z-index: 1;
  align-self: flex-start;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 500;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.projects__ghost {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.05;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.projects__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
}

.projects__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.projects__category {
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cyan);
}

.projects__link {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
}

.projects__link:hover {
  color: #fff;
  border-color: var(--violet);
  transform: translateY(-2px);
}

.projects__title {
  font-size: 1.2rem;
}

.projects__desc {
  font-size: 0.9rem;
  color: var(--text-dim);
}

.projects__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 4px;
}

.projects__tags li {
  padding: 4px 11px;
  font-size: 0.72rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
}

.cards-enter-from {
  opacity: 0;
  transform: translateY(26px) scale(0.96);
}

.cards-enter-active,
.cards-leave-active {
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease);
}

.cards-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

.cards-move {
  transition: transform 0.5s var(--ease);
}

@media (max-width: 980px) {
  .projects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}

</style>
