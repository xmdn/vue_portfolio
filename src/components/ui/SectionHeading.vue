<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  accent: { type: String, default: '' },
  accentWarm: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  index: { type: String, default: '' },
})
</script>

<template>
  <header
    v-reveal="{ y: 34 }"
    class="section-heading"
    :class="`section-heading--${align}`"
  >
    <span v-if="eyebrow" class="eyebrow">
      <span v-if="index" class="section-heading__index">{{ index }}</span>
      {{ eyebrow }}
    </span>

    <h2 class="section-heading__title">
      <template v-if="accent">
        {{ title }}
        <span :class="accentWarm ? 'gradient-text gradient-text--warm' : 'gradient-text'">{{ accent }}</span>
      </template>
      <template v-else>
        {{ title }}
      </template>
      <slot />
    </h2>

    <p v-if="$slots.lead" class="section-heading__lead lead">
      <slot name="lead" />
    </p>
  </header>
</template>

<style scoped lang="scss">
.section-heading {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-heading--center {
  align-items: center;
  text-align: center;
}

.section-heading--center .section-heading__lead {
  margin-inline: auto;
}

.section-heading__index {
  margin-right: 6px;
  color: var(--text-dim);
}

.section-heading__title {
  font-size: clamp(1.9rem, 4.6vw, 3.4rem);
  max-width: 22ch;
}

.section-heading--center .section-heading__title {
  max-width: 26ch;
}

.section-heading__lead {
  margin-top: 4px;
}
</style>
