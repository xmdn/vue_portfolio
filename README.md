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

## ☁️ Deploying to Cloudflare

The repo ships with [`wrangler.jsonc`](wrangler.jsonc), which deploys `dist/`
as **Cloudflare Workers Static Assets** with SPA routing enabled:

```jsonc
{
  "name": "vue-portfolio",
  "compatibility_date": "2026-09-25",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

### Cloudflare build settings

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

> ⚠️ **Why the config file matters:** without an explicit Wrangler config,
> `wrangler deploy` falls back to framework auto-detection and tries to parse
> `vite.config.js` itself, which fails with `Error parsing file: vite.config.js`.
> Declaring `assets.directory` explicitly removes the guesswork.
>
> Also make sure no *Build output directory* is set in the dashboard — the assets
> directory comes from `wrangler.jsonc`, and `dist/` is already git-ignored.

`not_found_handling: "single-page-application"` makes unknown paths return
`index.html` with a `200` status, so Vue Router's history mode works on deep
links and hard refreshes — **without** a `_redirects` file.

> ⚠️ Do **not** add a catch-all `/* /index.html 200` rule to `_redirects`.
> Cloudflare validates those rules strictly and rejects it with
> `code: 100324 — Infinite loop detected`, because `/*` also matches
> `/index.html` itself. `not_found_handling` is the correct, loop-free mechanism
> since it only applies to paths that match no real static asset.
>
> A classic **Cloudflare Pages** project needs no `_redirects` either: Pages
> enables SPA mode automatically as long as the build output has no top-level
> `404.html`.

Local one-shot deploy (build + upload):

```bash
npm run deploy
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
