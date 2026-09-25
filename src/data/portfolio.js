/**
 * Central content source for the portfolio.
 * Replace the placeholder values below with your real data —
 * every section reads from here, so one file is enough to re-skin the site.
 */

export const profile = {
  name: 'Your Name',
  initials: 'YN',
  roles: ['Frontend Engineer', 'Vue 3 Specialist', 'Creative Developer', 'UI Animator'],
  tagline:
    'I design and build fast, immersive interfaces — where clean architecture meets expressive motion.',
  location: 'Kyiv, Ukraine',
  email: 'hello@yourname.dev',
  resumeUrl: '#',
  available: true,
  stats: [
    { value: 6, suffix: '+', label: 'Years crafting UIs' },
    { value: 48, suffix: '', label: 'Projects shipped' },
    { value: 30, suffix: '+', label: 'Happy clients' },
    { value: 12, suffix: '', label: 'Open-source repos' },
  ],
  socials: [
    { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com' },
    { name: 'Telegram', icon: 'mdi:telegram', url: 'https://telegram.org' },
    { name: 'Email', icon: 'mdi:email-outline', url: 'mailto:hello@yourname.dev' },
  ],
}

export const techMarquee = [
  'Vue 3',
  'TypeScript',
  'Vite',
  'Pinia',
  'GSAP',
  'Three.js',
  'Nuxt',
  'Tailwind CSS',
  'SCSS',
  'Vue Router',
  'VueUse',
  'WebGL',
]

export const services = [
  {
    icon: 'mdi:rocket-launch-outline',
    title: 'Product Frontend',
    text: 'SPA and SSR apps on Vue 3 + Vite with clean architecture, typed APIs and predictable state.',
  },
  {
    icon: 'mdi:auto-fix',
    title: 'Motion & Interaction',
    text: 'Scroll-driven storytelling with GSAP and micro-interactions that make interfaces feel alive.',
  },
  {
    icon: 'mdi:cube-outline',
    title: '3D & WebGL',
    text: 'Three.js scenes, shaders and particle systems that stay smooth on every device.',
  },
  {
    icon: 'mdi:palette-outline',
    title: 'Design Systems',
    text: 'Reusable UI kits and token-driven theming that keep large products consistent.',
  },
]

export const skills = [
  { name: 'Vue 3 / Composition API', level: 96, icon: 'mdi:vuejs' },
  { name: 'JavaScript / TypeScript', level: 92, icon: 'mdi:language-typescript' },
  { name: 'GSAP & Animation', level: 90, icon: 'mdi:animation-play-outline' },
  { name: 'Three.js / WebGL', level: 82, icon: 'mdi:cube-scan' },
  { name: 'CSS / SCSS / Tailwind', level: 94, icon: 'mdi:language-css3' },
  { name: 'Vite / Tooling', level: 88, icon: 'mdi:lightning-bolt-outline' },
  { name: 'Pinia / State', level: 90, icon: 'mdi:database-outline' },
  { name: 'Accessibility & UX', level: 85, icon: 'mdi:account-heart-outline' },
]

export const experience = [
  {
    period: '2023 — Present',
    role: 'Senior Frontend Engineer',
    company: 'Nebula Studio',
    text: 'Lead the design-system and animation layer for a multi-tenant SaaS platform serving 40k users.',
    tags: ['Vue 3', 'Pinia', 'GSAP', 'Design System'],
  },
  {
    period: '2021 — 2023',
    role: 'Frontend Developer',
    company: 'Orbit Labs',
    text: 'Built interactive marketing sites and dashboards with scroll-driven storytelling and WebGL accents.',
    tags: ['Nuxt', 'Three.js', 'SCSS'],
  },
  {
    period: '2019 — 2021',
    role: 'Vue Developer',
    company: 'Freelance',
    text: 'Delivered 20+ client projects: e-commerce frontends, admin tools and landing pages.',
    tags: ['Vue 2', 'Vuex', 'Webpack'],
  },
]

export const projects = [
  {
    title: 'Aurora Dashboard',
    category: 'Web App',
    year: '2025',
    description:
      'Real-time analytics platform with animated charts, theming and a blazing-fast data grid.',
    tags: ['Vue 3', 'Pinia', 'ApexCharts'],
    accent: ['#7c5cff', '#22d3ee'],
    url: '#',
  },
  {
    title: 'Nova Commerce',
    category: 'E-commerce',
    year: '2024',
    description: 'Headless storefront with 3D product previews and buttery-smooth transitions.',
    tags: ['Nuxt', 'Three.js', 'Stripe'],
    accent: ['#ff2d95', '#7c5cff'],
    url: '#',
  },
  {
    title: 'Pulse Portfolio',
    category: 'Website',
    year: '2024',
    description: 'Award-styled personal site with GSAP scroll scenes and a custom cursor.',
    tags: ['Vue 3', 'GSAP', 'Lenis'],
    accent: ['#22d3ee', '#b6ff5c'],
    url: '#',
  },
  {
    title: 'Helios Design System',
    category: 'UI Kit',
    year: '2023',
    description: 'Token-driven component library with dark mode and full accessibility support.',
    tags: ['Vue 3', 'SCSS', 'Storybook'],
    accent: ['#b6ff5c', '#22d3ee'],
    url: '#',
  },
  {
    title: 'Orbit SaaS Kit',
    category: 'Web App',
    year: '2023',
    description: 'Subscription billing portal with role-based access and animated onboarding.',
    tags: ['Vue 3', 'Vue Router', 'REST'],
    accent: ['#7c5cff', '#ff2d95'],
    url: '#',
  },
  {
    title: 'Lumen Landing',
    category: 'Website',
    year: '2022',
    description: 'High-conversion landing page with WebGL hero and 98 Lighthouse score.',
    tags: ['Vite', 'Three.js', 'CSS'],
    accent: ['#22d3ee', '#7c5cff'],
    url: '#',
  },
]

export const projectFilters = ['All', 'Web App', 'Website', 'E-commerce', 'UI Kit']
