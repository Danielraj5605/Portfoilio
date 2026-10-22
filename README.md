# Danielraj — Portfolio ("Ghibli meets enterprise")

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · GSAP ScrollTrigger · Lenis

A painterly meadow-sky portfolio with a living avatar, day/night skies, pinned scroll scenes and
case-study pages — built to stay fast, accessible and readable as a professional portfolio.

## Run it

Requires Node.js 20.9+ (developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-checks too)
npm start          # serve the production build
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, sitemap and Open Graph (e.g. `https://danielraj.vercel.app`) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Contact-form delivery via [Web3Forms](https://web3forms.com) (free; key is emailed to you). Without it the form asks visitors to email you instead of failing silently. |

## Editing content

Everything you'll want to change lives in `content/`:

| File | What's in it |
| --- | --- |
| `profile.ts` | Name, **title**, headline, intro, email, links, résumé path |
| `projects.ts` | The four case studies (copy, tags, palette, optional `stack` and `links`) — search for `TODO` |
| `experience.ts` | Timeline (work, community, education) |
| `skills.tsx` | Skill groups and icons |

The résumé is `public/resume.pdf`.

### Avatar artwork

Drop illustrated art into `public/avatar/` (transparent PNG, WebP or AVIF, ≥1200 px tall, 4:5 canvas).
The site picks it up at build time — no code changes:

| File | Used for |
| --- | --- |
| `idle`, `wave`, `pointing`, `thinking`, `laptop` | One pose per section (hero waves; the docked companion changes pose as you scroll) |
| `<pose>-body`, `<pose>-head`, `<pose>-pupils` *(optional)* | Layered rig — head leans and pupils follow the cursor |

Until art exists, an illustrated placeholder (not a photo) stands in with the same rig.

## How it's put together

```
app/            layout (fonts, metadata, theme boot script), home, /work/[slug], OG image, sitemap, robots, 404
components/
  scene/        Sky (sun/moon, stars), Clouds, Hills, Particles (dust motes / fireflies)
  avatar/       Avatar, PlaceholderAvatar, SpeechBubble, Companion (docked, per-section poses/lines)
  sections/     Hero, About, Skills, Projects, Experience, Contact
  projects/     ProjectArt (generated covers), CaseStudy
  layout/       Navbar, Footer, IntroLoader
  providers/    SmoothScroll (Lenis ⇄ GSAP ticker), PageTransition (cloud wipe)
  ui/           SplitText, MagneticButton, TiltCard, Cursor, ScrollProgress, FormField, …
lib/            gsap, motion tokens, theme/intro state, avatar discovery, hooks
content/        all copy and data
```

**Motion rules:** only `transform` and `opacity` animate. GSAP (lazy-loaded) owns scroll-linked scenes —
the pinned hero and the pinned experience timeline; Motion owns component motion. Decorative loops pause
off-screen and for the hidden theme. `prefers-reduced-motion` turns off the intro, Lenis, pins, cursor,
tilt and parallax (Experience becomes a plain list).

## Deploy (Vercel — recommended)

1. Push the repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo (framework auto-detected as Next.js).
3. Add the environment variables above (**Settings → Environment Variables**).
4. Deploy. Every push to the production branch redeploys; PRs get preview URLs.

Then run [PageSpeed Insights](https://pagespeed.web.dev/) against the live URL for real Lighthouse scores.

> GitHub Pages also works via static export (`output: 'export'` + `basePath: '/Portfoilio'` in
> `next.config.ts`, `images.unoptimized: true`), at the cost of Next.js image optimisation.
