# Minimal B&W Personal Website — Phase 1 Design

**Date:** 2026-06-19
**Scope:** Foundations + NavBar + Hero. (Projects / Blog / Contact pages = later phases.)
**Stack (existing):** Next.js 14 (App Router), TypeScript, Tailwind, shadcn primitives, `motion`, `lucide-react`.

## Goal

Replace the current placeholder site (Hero shows `HHHH`/`FFFFF`, default Next.js metadata, unused theme vars) with a minimal, monochrome (black & white) dark-themed landing page. A visitor immediately sees who Ashik is (full-stack developer) and can download his resume.

Reference inspiration: the Ted personal site (dark bg, big serif headline "hi … here 👋", short bio, resume + socials, photo card on the right). This build adapts that into a strict B&W palette.

## Visual Direction

- **Palette:** pure monochrome. Near-black background `~hsl(0 0% 4%)`, off-white foreground `~hsl(0 0% 98%)`, gray for secondary text/borders. No accent colors.
- **Type:** serif display font for the headline (editorial feel, e.g. Instrument Serif / Fraunces), clean sans (Inter / Geist) for body. Loaded via `next/font` (replaces Protest Revolution).
- **Feel:** generous whitespace, large headline, subtle entrance animation (fade/slide) via `motion`.
- **Photo:** grayscale filter so it stays within the B&W system (optional color-on-hover later).

## Foundations

### `src/app/layout.tsx`
- Add `className="dark"` to `<html>` so shadcn dark vars apply globally.
- Real metadata: `title: "Ashik — Full-stack Developer"`, sensible `description`.
- Load fonts via `next/font` and apply font CSS variables to `<body>`.

### `src/app/globals.css`
- Keep shadcn CSS variables. Make dark values the effective theme.
- Tune `--background` to true near-black; confirm `--foreground` off-white.
- Drop the Protest Revolution `@import` (replaced by next/font).

### `tailwind.config.ts`
- Replace `protest-revolution` fontFamily with `serif` (display) + `sans` (body) families bound to the next/font CSS variables.

### `src/lib/site-config.ts` (new)
Single source of truth for personal data so nothing is hardcoded across components:
```ts
export const siteConfig = {
  name: "Ashik",
  role: "Full-stack developer",
  bio: "Backend by profession, full-stack by passion. I build things for the web.",
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
  socials: {
    github: "https://github.com/Ashik234",
    linkedin: "<linkedin-url>",   // placeholder until provided
    email: "ashik.k@dignizant.com",
  },
  nav: [
    { label: "Ashik", href: "/" },   // name = home link
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
```
(Bio text is a draft — user can tweak.)

### Assets (placeholders)
- `public/profile.jpg` — placeholder image; user drops real photo later.
- `public/resume.pdf` — placeholder file; user replaces with real resume.

## NavBar — `src/components/layout/NavBar.tsx` (rewrite)

- **Keep** the current centered pill layout and dark style (per user screenshot), restyled into the B&W system.
- Pill content: `Ashik` (bold, links to `/` home) · `About` · `Projects` · `Contact`. Links sourced from `siteConfig.nav`.
- **Separate small pill, top-right corner:** `Resume` button with a download icon (`lucide` `Download` / `FileText`). Triggers download of `siteConfig.resumePath` (anchor with `download` attribute).
- Sticky/fixed at top. Reuse existing scroll listener: transparent at top → subtle backdrop blur + thin border once scrolled.
- Both pills: near-black bg, white text, subtle border, rounded-full.

## Hero — `src/components/Hero/page.tsx` (rewrite)

Two-column split (stacks on mobile, text first).

**Left column:**
- Headline: `hi, I'm Ashik 👋` — large serif display.
- Subheading: `Full-stack developer` (from `siteConfig.role`).
- Short bio: 1–2 lines (`siteConfig.bio`).
- Action row: **Resume** download button (reused) + social icons (GitHub, LinkedIn, email) via `SocialLinks`.

**Right column:**
- Photo card using `next/image`, `siteConfig.photoPath`, grayscale filter, rounded frame with a slight tilt (echoes the reference). Placeholder until real photo added.

**Responsive:** single column on small screens — headline/bio/actions on top, photo below (or hidden if it crowds). 

**Motion:** entrance fade + slight upward slide on load via `motion`.

## Shared components (new)

### `src/components/ui/ResumeButton.tsx`
Reusable download button (used by NavBar top-right pill and Hero). Props for size/variant. Renders an anchor with `download` pointing at `siteConfig.resumePath`, label + icon.

### `src/components/ui/SocialLinks.tsx`
Row of icon links (GitHub, LinkedIn, email) from `siteConfig.socials`, lucide icons, monochrome with hover lighten.

## Component / file map

```
src/app/layout.tsx                 (edit: dark class, metadata, fonts)
src/app/globals.css                (edit: dark default, near-black bg, drop old font import)
tailwind.config.ts                 (edit: font families)
src/lib/site-config.ts             (new)
src/components/layout/NavBar.tsx    (rewrite)
src/components/Hero/page.tsx        (rewrite)
src/components/ui/ResumeButton.tsx  (new)
src/components/ui/SocialLinks.tsx   (new)
public/profile.jpg                  (new placeholder)
public/resume.pdf                   (new placeholder)
```

## Out of scope (Phase 1)
- Projects grid / showcase (will pull from GitHub later).
- Blog and Contact pages.
- Footer redesign (left as-is for now).
- Light/dark toggle (dark-only this phase).

## Open items for user
- Real LinkedIn URL.
- Real resume PDF + profile photo (placeholders used until then).
- Confirm serif display font choice.
- Confirm bio wording.

## Success criteria
- `npm run dev` renders a dark, monochrome page with no placeholder gibberish.
- Centered dark nav pill with working `Ashik`→home link; separate top-right Resume pill that downloads the (placeholder) PDF.
- Hero shows name headline, role, bio, resume button, social icons, and a grayscale photo card.
- Responsive: usable on mobile (columns stack).
- All personal data flows from `site-config.ts`.
