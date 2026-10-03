# King Wu — personal website

A single-page personal profile site (hero, about, resume, portfolio, contact) for Zenan (King) Wu, built with Next.js 14, React 18, TypeScript and Tailwind CSS.

- **Live:** https://king-personal-website-kingwu12s-projects.vercel.app/
- **Status:** maintained, low activity. The main profile content was last updated in 2024; a standalone `/motherday2026` page was added in May 2026.
- **Origin:** forked from [tbakerx/react-resume-template](https://github.com/tbakerx/react-resume-template). Most of the layout and component code is the template's; the site-specific content lives in `src/data/data.tsx`.

## Run locally

The repo uses npm (`package-lock.json`; the old `yarn.lock` was removed).

```bash
npm install
npm run dev      # tsc type-check, then next dev on http://localhost:3000
npm run build    # tsc type-check, then next build
npm run start    # serve the production build
npm run lint     # prettier --write + eslint --fix on src/ (rewrites files)
```

There is no test suite. `npm run compile` (`tsc --build`, `noEmit`) is the type check that `dev` and `build` both run first.

## Layout

| Path | What it is |
|---|---|
| `src/pages/index.tsx` | The home page: composes the sections below in order |
| `src/pages/motherday2026.tsx` | Standalone `/motherday2026` page (Chinese-language photo page) |
| `src/pages/_app.tsx`, `_document.tsx` | Next.js app shell |
| `src/data/data.tsx` | **All profile content**: meta, hero, about, skills, portfolio, education, experience, testimonials, contact, socials |
| `src/data/dataDef.ts` | Types for the content in `data.tsx` |
| `src/components/Sections/` | Header, Hero, About, Resume, Portfolio, Testimonials, Contact, Footer |
| `src/components/MotherDay2026/` | The `/motherday2026` page component, its CSS module and `memoryItems.json` |
| `src/components/Icon/` | Inline SVG social icons |
| `src/images/` | Hero background, profile picture and portfolio images (imported statically) |
| `public/motherday2026/` | Photos served for the `/motherday2026` page |
| `next.config.js`, `tailwind.config.js`, `next-sitemap.js` | Build, styling and sitemap config |

## Deployment

Deployed on Vercel from this repo's `main` branch (no `vercel.json`; Vercel's Next.js defaults). Pushing to `main` deploys.

## Notes for agents

- To change what the site says, edit `src/data/data.tsx`; components rarely need touching.
- The contact form (`src/components/Sections/Contact/ContactForm.tsx`) is not wired up: submit only logs to the console. Contact goes through the `mailto:` link in `data.tsx`.
- Some template placeholders remain: portfolio entries titled "Project title 4/5" in `data.tsx`, and the example testimonial is commented out.
- `MotherDayMuseum.tsx` references `/motherday2026/background-music.mp3`, which is not committed; playback fails silently.
- `next-sitemap.js` sets `siteUrl: 'kingwu.me'`, which is not the live Vercel URL. `npm run sitemap` is not part of the build.
- `src/data/resume.pdf` and `resume.docx` are not referenced by any code.
- Run `npm run lint` before committing; it formats with Prettier and enforces sorted imports/keys.
