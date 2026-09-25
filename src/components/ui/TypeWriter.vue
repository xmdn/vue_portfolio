<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  words: { type: Array, required: true },
  typeSpeed: { type: Number, default: 72 },
  deleteSpeed: { type: Number, default: 38 },
  pause: { type: Number, default: 1500 },
})

const text = ref('')

let wordIndex = 0
let charIndex = 0
let deleting = false
let timer = null

function tick() {
  const word = props.words[wordIndex] || ''

  if (!deleting) {
    charIndex += 1
    text.value = word.slice(0, charIndex)

    if (charIndex >= word.length) {
      deleting = true
      timer = setTimeout(tick, props.pause)
      return
    }
  }
  else {
    charIndex -= 1
    text.value = word.slice(0, charIndex)

    if (charIndex <= 0) {
      deleting = false
      wordIndex = (wordIndex + 1) % props.words.length
    }
  }

  timer = setTimeout(tick, deleting ? props.deleteSpeed : props.typeSpeed)
}

onMounted(() => {
  timer = setTimeout(tick, 450)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="typewriter">
    <span class="typewriter__text">{{ text }}</span>
    <span class="typewriter__caret" aria-hidden="true" />
  </span>
</template>

<style scoped>
.typewriter {
  display: inline-flex;
  align-items: center;
}

.typewriter__text {
  background: var(--grad-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.typewriter__caret {
  display: inline-block;
  width: 3px;
  height: 1em;
  margin-left: 6px;
  background: var(--cyan);
  box-shadow: 0 0 12px var(--cyan);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
