/**
 * ============================================================================
 *  ✏️  ALL OF THE WEBSITE'S TEXT LIVES HERE.
 *  Edit this single file — you never need to touch the components.
 *  Every section reads its copy from below: your name, roles, headline
 *  numbers, all section headings, skills, experience and projects.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * 1. PROFILE — who you are, how to reach you, headline numbers
 * ------------------------------------------------------------------------ */
export const profile = {
  name: 'Andrii Bilyk',
  initials: 'AB',

  // Cycles through the typing animation in the hero.
  roles: [
    'Full-stack Developer',
    'Vue.js Developer',
    'PHP Developer',
    'Python Developer',
  ],

  tagline:
    'I build complete web products — from databases and REST APIs to polished, animated interfaces with PHP, Python and Vue.js.',

  location: 'Kyiv, Ukraine',
  email: 'hello@yourname.dev',
  resumeUrl: '#',
  available: true,

  // Small print in the footer.
  footerNote: 'Built with Vue 3, Three.js & GSAP.',

  stats: [
    { value: 4, suffix: '+', label: 'Years of experience' },
    { value: 38, suffix: '', label: 'Projects shipped' },
    { value: 24, suffix: '+', label: 'Happy clients' },
    { value: 14, suffix: '', label: 'Technologies used' },
  ],

  socials: [
    { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com' },
    { name: 'Telegram', icon: 'mdi:telegram', url: 'https://telegram.org' },
    { name: 'Email', icon: 'mdi:email-outline', url: 'mailto:hello@yourname.dev' },
  ],
}

/* ---------------------------------------------------------------------------
 * 2. SECTION HEADINGS & COPY — every visible label on the page
 * ------------------------------------------------------------------------ */
export const sections = {
  nav: {
    cta: "Let's talk",
    links: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'work', label: 'Work' },
      { id: 'experience', label: 'Experience' },
      { id: 'contact', label: 'Contact' },
    ],
  },

  hero: {
    greeting: "Hi, I'm",
    badge: 'Available for new projects',
    primaryCta: 'Explore my work',
    secondaryCta: 'Get in touch',
    scrollHint: 'Scroll',
  },

  about: {
    index: '01',
    eyebrow: 'About me',
    title: 'Building products end to end —',
    accent: 'from database to pixel',
    paragraphs: [
      "I'm a full-stack developer working across PHP, Python and Vue.js. I like owning a feature from the database schema and API design all the way down to the final interaction detail.",
      'My sweet spot is where backend reliability meets frontend craft: clean architecture, predictable APIs, and motion that makes an interface feel alive without hurting performance.',
    ],
    ctaLabel: 'Download CV',
  },

  skills: {
    index: '02',
    eyebrow: 'Toolbox',
    title: 'Skills &',
    accent: 'technologies',
  },

  projects: {
    index: '03',
    eyebrow: 'Selected work',
    title: "Projects I'm",
    accent: 'proud of',
    // The first entry is the "show everything" filter and must match "All".
    filters: ['All', 'Web App', 'Website', 'E-commerce', 'UI Kit'],
  },

  experience: {
    index: '04',
    eyebrow: 'Journey',
    title: 'Experience &',
    accent: 'milestones',
  },

  contact: {
    index: '05',
    eyebrow: 'Contact',
    title: "Let's build something",
    accent: 'remarkable',
    // Uses the warm gradient for the highlighted words above.
    accentWarm: true,
    lead: 'Have a project, a role, or just an idea worth exploring? My inbox is always open — I usually reply within a day.',
    fields: {
      name: { label: 'Name', placeholder: 'Jane Doe' },
      email: { label: 'Email', placeholder: 'jane@company.com' },
      message: { label: 'Message', placeholder: 'Tell me about your project...' },
    },
    submitLabel: 'Send message',
    sendingLabel: 'Sending...',
    successMessage: 'Thanks! Your message is on its way.',
    errorMessage: 'Something went wrong. Please try again.',
  },
}

/* ---------------------------------------------------------------------------
 * 3. WHAT I DO — the four cards in the About section
 * ------------------------------------------------------------------------ */
export const services = [
  {
    icon: 'mdi:server-outline',
    title: 'Backend & APIs',
    text: 'REST APIs and business logic in PHP (Laravel) and Python (Django / FastAPI), backed by relational databases.',
  },
  {
    icon: 'mdi:monitor-dashboard',
    title: 'Frontend & SPA',
    text: 'Vue 3 single-page apps with Pinia, Vue Router and a component-driven design system.',
  },
  {
    icon: 'mdi:auto-fix',
    title: 'Motion & Interaction',
    text: 'Scroll-driven storytelling with GSAP and micro-interactions that make interfaces feel alive.',
  },
  {
    icon: 'mdi:database-outline',
    title: 'Data & Integrations',
    text: 'MySQL / PostgreSQL schemas, migrations, caching and third-party service integrations.',
  },
]

/* ---------------------------------------------------------------------------
 * 4. SKILLS — the animated bars (level is a percentage, 0–100)
 * ------------------------------------------------------------------------ */
export const skills = [
  { name: 'Vue 3 / Composition API', level: 92, icon: 'mdi:vuejs' },
  { name: 'JavaScript / TypeScript', level: 88, icon: 'mdi:language-typescript' },
  { name: 'PHP / Laravel', level: 87, icon: 'mdi:language-php' },
  { name: 'Python / Django & FastAPI', level: 83, icon: 'mdi:language-python' },
  { name: 'CSS / SCSS / Tailwind', level: 90, icon: 'mdi:language-css3' },
  { name: 'MySQL / PostgreSQL', level: 84, icon: 'mdi:database-outline' },
  { name: 'REST API / Integrations', level: 86, icon: 'mdi:api' },
  { name: 'Docker / Git / CI-CD', level: 78, icon: 'mdi:docker' },
]

/* ---------------------------------------------------------------------------
 * 5. EXPERIENCE — the timeline (newest first)
 * ------------------------------------------------------------------------ */
export const experience = [
  {
    period: '2023 — Present',
    role: 'Full-stack Developer',
    company: 'Nebula Studio',
    text: 'Build and maintain a multi-tenant SaaS platform — Laravel APIs and queues on the backend, Vue 3 dashboards on the frontend.',
    tags: ['Laravel', 'Vue 3', 'MySQL', 'REST API'],
  },
  {
    period: '2022 — 2023',
    role: 'Full-stack Developer',
    company: 'Orbit Labs',
    text: 'Delivered client web products end to end: Python (FastAPI) services, Vue frontends and third-party integrations.',
    tags: ['Python', 'FastAPI', 'Vue 3', 'PostgreSQL'],
  },
  {
    period: '2021 — 2022',
    role: 'Web Developer',
    company: 'Freelance',
    text: 'Built 20+ websites and web apps — PHP backends, CMS customisation and responsive, accessible frontends.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
  },
]

/* ---------------------------------------------------------------------------
 * 6. PROJECTS — the filterable grid (category must match a filter above)
 * ------------------------------------------------------------------------ */
export const projects = [
  {
    title: 'Aurora Dashboard',
    category: 'Web App',
    year: '2025',
    description:
      'Real-time analytics platform: Laravel API, WebSocket updates and animated Vue 3 charts.',
    tags: ['Laravel', 'Vue 3', 'MySQL'],
    accent: ['#7c5cff', '#22d3ee'],
    url: '#',
  },
  {
    title: 'Nova Commerce',
    category: 'E-commerce',
    year: '2024',
    description:
      'Headless storefront with a Python pricing service, 3D product previews and smooth transitions.',
    tags: ['Vue 3', 'FastAPI', 'Stripe'],
    accent: ['#ff2d95', '#7c5cff'],
    url: '#',
  },
  {
    title: 'Pulse Portfolio',
    category: 'Website',
    year: '2024',
    description:
      'Award-styled personal site with GSAP scroll scenes, a custom cursor and a headless CMS.',
    tags: ['Vue 3', 'GSAP', 'Lenis'],
    accent: ['#22d3ee', '#b6ff5c'],
    url: '#',
  },
  {
    title: 'Helios Design System',
    category: 'UI Kit',
    year: '2023',
    description:
      'Token-driven component library shared across products, with dark mode and full a11y support.',
    tags: ['Vue 3', 'SCSS', 'Storybook'],
    accent: ['#b6ff5c', '#22d3ee'],
    url: '#',
  },
  {
    title: 'Orbit SaaS Kit',
    category: 'Web App',
    year: '2023',
    description:
      'Subscription billing portal with role-based access, background queues and animated onboarding.',
    tags: ['Laravel', 'Vue 3', 'PostgreSQL'],
    accent: ['#7c5cff', '#ff2d95'],
    url: '#',
  },
  {
    title: 'Lumen Landing',
    category: 'Website',
    year: '2022',
    description:
      'High-conversion landing page with a WebGL hero, a PHP form backend and a 98 Lighthouse score.',
    tags: ['Vite', 'Three.js', 'PHP'],
    accent: ['#22d3ee', '#7c5cff'],
    url: '#',
  },
]

/* ---------------------------------------------------------------------------
 * 7. TECH MARQUEE — the scrolling ribbon of technologies
 * ------------------------------------------------------------------------ */
export const techMarquee = [
  'Vue 3',
  'PHP',
  'Python',
  'TypeScript',
  'Laravel',
  'Django',
  'FastAPI',
  'Pinia',
  'Vite',
  'MySQL',
  'PostgreSQL',
  'Docker',
  'REST API',
  'GSAP',
]



