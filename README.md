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

## 📮 Contact form (Resend + Worker)

The contact form posts to **`POST /api/contact`**, handled by the Worker in
[`src/index.js`](src/index.js). The Worker validates the input and relays the
message to your inbox through the [Resend](https://resend.com) API, so your
email address and API key never reach the browser.

**Free tier:** Resend gives 3,000 emails / month (100 / day) — plenty for a
portfolio contact form.

### 1. Create a Resend API key

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. *(Optional but recommended)* Verify your own domain under **Domains** by
   adding the DKIM / SPF / DMARC DNS records it gives you to Cloudflare DNS.

### 2. Set the secrets

```bash
npx wrangler secret put RESEND_API_KEY   # your Resend API key
npx wrangler secret put CONTACT_TO       # the inbox that receives the messages
```

`CONTACT_FROM` is a plain variable in `wrangler.jsonc` (`vars`):

| Value | When to use |
| --- | --- |
| `onboarding@resend.dev` *(default)* | Quick test without a domain — **can only deliver to the email you signed up with** |
| `portfolio@yourdomain.com` | Real use — requires a **verified domain** in Resend |

#### Where secrets actually live

`.dev.vars` is **local-only**: it is git-ignored, never uploaded to Cloudflare,
and read solely by `wrangler dev`. Production secrets are stored **in your
Cloudflare account, on the Worker itself**, and injected as `env.*` at runtime.

| | Where it lives | In Git? | Uploaded? | Used by |
| --- | --- | --- | --- | --- |
| Local dev | `.dev.vars` | ❌ no | ❌ never | `wrangler dev` |
| Production | Worker → **Settings → Variables and Secrets** | ❌ no | ✅ stored in your account | the deployed Worker |
| Plain config | `wrangler.jsonc` → `vars` | ✅ yes | ✅ yes | both (used for `CONTACT_FROM`) |

So `.dev.vars` never needs to reach Cloudflare — you set the *same names* in the
account. Two ways to do it:

**Dashboard** — Workers & Pages → `vue-portfolio` → **Settings** →
**Variables and Secrets** → **Edit** → **Add** → Type: **Secret** →
then click **Deploy**.

**CLI** (run `npx wrangler login` once):

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_TO
```

Because secrets are Worker-level **configuration, not code**, they **survive
every future deploy** from Workers Builds — a `git push` never overwrites or
removes them. You only set them once.

> ⚠️ Workers Builds *build* environment variables (the build's own Settings →
> Environment variables) are available **only during the build**, not as `env.*`
> inside the Worker at runtime. Don't put the Resend key there.

`wrangler.jsonc` declares the required secrets, so `wrangler dev` warns you
locally when one is missing:

```jsonc
"secrets": { "required": ["RESEND_API_KEY", "CONTACT_TO"] }
```

> 🔁 For CI/CD you can also ship code + secrets together:
> `npx wrangler deploy --secrets-file .env.production`

### 3. Local development

```bash
cp .dev.vars.example .dev.vars   # then fill in your keys
npm run dev:api                  # Worker on http://localhost:8787
npm run dev                      # Vite on http://localhost:5173 (proxies /api → 8787)
```

### 4. Deploy

```bash
npm run deploy
```

> ℹ️ Only `/api/*` goes through the Worker (`assets.run_worker_first`); every
> other request is served directly as a static asset from Cloudflare's edge.

## 📝 Customizing content

**Everything you see on the page is text in one file:** [`src/data/portfolio.js`](src/data/portfolio.js).
Open it, edit the strings, and the whole site updates — no component changes required.

| Key | Controls |
| --- | --- |
| `profile` | Your name, initials, cycling hero roles, tagline, location, email, CV link, footer note, headline numbers and social links |
| `sections.nav` | Navigation labels and the header CTA button |
| `sections.hero` | Greeting, availability badge, hero buttons, scroll hint |
| `sections.about` | Section heading, "About me" paragraphs, CV button label |
| `sections.skills` | Section heading |
| `sections.projects` | Section heading and the project filter tabs |
| `sections.experience` | Section heading |
| `sections.contact` | Section heading, intro text, form labels/placeholders, submit button and success message |
| `services` | The four "what I do" cards in the About section |
| `skills` | Skill names and their bar levels (0–100) |
| `experience` | Timeline entries (newest first) |
| `projects` | Project cards — `category` must match one of `sections.projects.filters` |
| `techMarquee` | The scrolling ribbon of technologies |

> ℹ️ `src/data/portfolio.js` is the only file you need to touch for wording.
> Icons use [Iconify](https://iconify.design) names (e.g. `mdi:language-php`).


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
