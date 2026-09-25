<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { experience } from '@/data/portfolio'
</script>

<template>
  <section id="experience" class="section experience">
    <div class="container">
      <SectionHeading index="04" eyebrow="Journey">
        Experience &amp; <span class="gradient-text">milestones</span>
      </SectionHeading>

      <ol class="timeline">
        <li
          v-for="(item, index) in experience"
          :key="item.role"
          v-reveal="{ delay: index * 0.06, y: 42 }"
          class="timeline__item"
        >
          <span class="timeline__node" aria-hidden="true" />

          <div class="timeline__card">
            <p class="timeline__period">{{ item.period }}</p>
            <h3 class="timeline__role">{{ item.role }}</h3>
            <p class="timeline__company">{{ item.company }}</p>
            <p class="timeline__text">{{ item.text }}</p>

            <ul class="timeline__tags">
              <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-left: 34px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 8px;
  width: 1px;
  background: linear-gradient(to bottom, var(--violet), var(--cyan), transparent);
  opacity: 0.6;
}

.timeline__item {
  position: relative;
}

.timeline__node {
  position: absolute;
  top: 26px;
  left: -34px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: var(--bg);
}

.timeline__node::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--grad-primary);
  box-shadow: 0 0 16px rgba(124, 92, 255, 0.8);
}

.timeline__card {
  padding: 26px 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.012));
  transition: border-color 0.4s var(--ease), transform 0.4s var(--ease);
}

.timeline__card:hover {
  border-color: var(--border-strong);
  transform: translateX(6px);
}

.timeline__period {
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cyan);
}

.timeline__role {
  margin-top: 8px;
  font-size: clamp(1.15rem, 2vw, 1.5rem);
}

.timeline__company {
  margin-top: 2px;
  font-size: 0.9rem;
  color: var(--text-dim);
}

.timeline__text {
  margin-top: 14px;
  color: var(--text-muted);
  max-width: 68ch;
}

.timeline__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.timeline__tags li {
  padding: 5px 12px;
  font-size: 0.76rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 600px) {
  .timeline {
    padding-left: 26px;
  }

  .timeline__node {
    left: -26px;
  }

  .timeline__card {
    padding: 20px;
  }
}
</style>
