import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const menuOpen = ref(false)
  const activeSection = ref('home')
  const scrolled = ref(false)
  const cursorLabel = ref('')
  const cursorHover = ref(false)

  function toggleMenu(value) {
    menuOpen.value = typeof value === 'boolean' ? value : !menuOpen.value
  }

  function closeMenu() {
    menuOpen.value = false
  }

  function setActiveSection(id) {
    activeSection.value = id
  }

  function setScrolled(value) {
    scrolled.value = value
  }

  function setCursor(label = '', hover = false) {
    cursorLabel.value = label
    cursorHover.value = hover
  }

  return {
    menuOpen,
    activeSection,
    scrolled,
    cursorLabel,
    cursorHover,
    toggleMenu,
    closeMenu,
    setActiveSection,
    setScrolled,
    setCursor,
  }
})
