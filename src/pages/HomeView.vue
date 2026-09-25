<script setup>
import MarqueeStrip from '@/components/MarqueeStrip.vue'
import { techMarquee } from '@/data/portfolio'
import AboutSection from '@/sections/AboutSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import HeroSection from '@/sections/HeroSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
</script>

<template>
  <HeroSection />

  <MarqueeStrip :items="techMarquee" />

  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
  <ExperienceSection />

  <MarqueeStrip :items="techMarquee" reverse />

  <ContactSection />
</template>
