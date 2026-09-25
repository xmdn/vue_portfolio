# Vue Portfolio — Dark Futuristic

An immersive, single-page developer portfolio built with **Vue 3**, **Three.js** and **GSAP**.

## ✨ Highlights

- **Three.js hero** — animated neon particle nebula + wireframe shell that reacts to the pointer.
- **GSAP reveal directive** (`v-reveal`) — scroll-triggered entrances with stagger.
- **3D tilt directive** (`v-tilt`) — pointer-following tilt with a light glare on cards.
- **Custom cursor** — dot + magnetic ring that scales on interactive elements.
- **Lenis smooth scroll** — synced with GSAP's `ScrollTrigger` through a single RAF loop.
- **Scroll-spy navigation**, scroll progress bar, infinite tech marquee.
- **Filterable project grid**, animated skill bars, scroll-driven timeline.
- Full `prefers-reduced-motion` support and touch-device fallbacks.

## 🧱 Tech stack

| Purpose | Library |
| --- | --- |
| Core | Vite + Vue 3 (Composition API, `<script setup>`) |
| Routing | Vue Router 4 |
| State | Pinia |
| Motion | GSAP 3 + ScrollTrigger, Lenis |
| 3D | Three.js |
| Utils | `@vueuse/core` |
| Icons | `@iconify/vue` |
| Styles | SCSS + CSS custom properties |

## 🚀 Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## 📝 Customizing content

All copy lives in a single file: [`src/data/portfolio.js`](src/data/portfolio.js).
Edit `profile`, `services`, `skills`, `experience`, `projects` and `techMarquee`
to make the site yours — no component changes required.

## 🗂 Structure

```
src/
├─ assets/styles/     # design tokens + base styles (SCSS)
├─ components/        # cursor, navbar, footer, 3D field, ui primitives
├─ composables/       # useSmoothScroll (Lenis + ScrollTrigger)
├─ data/              # portfolio content
├─ directives/        # v-reveal, v-tilt
├─ pages/             # HomeView, NotFound
├─ router/            # routes
├─ sections/          # Hero, About, Skills, Projects, Experience, Contact
└─ stores/            # Pinia UI store
```
