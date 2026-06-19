# Minimal B&W Redesign — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder site with a minimal monochrome (black & white) dark landing page — foundations + centered nav pill + split hero with resume download.

**Architecture:** Next.js 14 App Router. All personal data centralized in `src/lib/site-config.ts`. Reusable `ResumeButton` + `SocialLinks` components consumed by NavBar and Hero. Dark theme via shadcn CSS vars (`dark` class on `<html>`). Fonts via `next/font`. Entrance motion via `motion`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, `motion`, `lucide-react`, `next/font`, `next/image`.

## Global Constraints

- Dark-only theme this phase (no light/dark toggle).
- Strict monochrome: black/white/gray only, no accent colors.
- No new dependencies — use what's in `package.json`.
- Personal data flows from `src/lib/site-config.ts` — no hardcoded name/links/text in components.
- This is visual frontend work: the "test cycle" per task = `npm run lint` passes + `npm run build` succeeds (no unit test runner installed). Visual confirmation via `npm run dev` at the end.
- **Commits: author = repo git user only. DO NOT add any `Co-Authored-By` trailer. DO NOT push.**

---

### Task 1: Site config (single source of truth)

**Files:**
- Create: `src/lib/site-config.ts`

**Interfaces:**
- Produces: `siteConfig` object with `name`, `role`, `bio` (string), `resumePath`, `photoPath`, `socials.{github,linkedin,email}`, `nav` (array of `{label, href}`).

- [ ] **Step 1: Create the config file**

```ts
export const siteConfig = {
  name: "Ashik",
  role: "Full-stack developer",
  bio: "Backend by profession, full-stack by passion. I build things for the web.",
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
  socials: {
    github: "https://github.com/Ashik234",
    linkedin: "https://www.linkedin.com/in/ashik", // placeholder — update with real URL
    email: "ashik.k@dignizant.com",
  },
  nav: [
    { label: "Ashik", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `site-config.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/site-config.ts
git commit -m "feat: add site-config single source of truth"
```

---

### Task 2: Foundations — fonts, dark theme, metadata, palette

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: `font-serif` (display) and `font-sans` (body) Tailwind utilities backed by next/font CSS variables; `<html class="dark">`; near-black background.

- [ ] **Step 1: Rewrite `layout.tsx` with fonts, dark class, metadata**

```tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Ashik — Full-stack Developer",
  description: "Personal website of Ashik — backend by profession, full-stack by passion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Update `globals.css` — drop old font import, force near-black bg**

Remove the line `@import url('https://fonts.googleapis.com/css2?family=Protest+Revolution&display=swap');`.

Adjust the `.dark` block background to true near-black (change `--background` to `0 0% 4%`). Leave other dark vars. The file already applies `bg-background text-foreground` to body — keep that.

Resulting top of file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And in `.dark { ... }` set:

```css
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
```

- [ ] **Step 3: Update `tailwind.config.ts` fontFamily**

Replace the `fontFamily` block:

```ts
  		fontFamily: {
  			sans: ['var(--font-sans)', 'sans-serif'],
  			serif: ['var(--font-serif)', 'serif']
  		},
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds, no font/type errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css tailwind.config.ts
git commit -m "feat: dark monochrome foundations — fonts, theme, metadata"
```

---

### Task 3: ResumeButton component

**Files:**
- Create: `src/components/ui/ResumeButton.tsx`

**Interfaces:**
- Consumes: `siteConfig.resumePath` from Task 1.
- Produces: default-export `ResumeButton({ className?: string })` — an anchor with `download` to the resume PDF, label "Resume" + Download icon.

- [ ] **Step 1: Create the component**

```tsx
import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.resumePath}
      download
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 ${className}`}
    >
      Resume
      <Download className="h-4 w-4" />
    </a>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ResumeButton.tsx
git commit -m "feat: add reusable ResumeButton"
```

---

### Task 4: SocialLinks component

**Files:**
- Create: `src/components/ui/SocialLinks.tsx`

**Interfaces:**
- Consumes: `siteConfig.socials` from Task 1.
- Produces: default-export `SocialLinks({ className?: string })` — row of GitHub / LinkedIn / email icon links.

- [ ] **Step 1: Create the component**

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: siteConfig.socials.github, icon: Github, label: "GitHub" },
    { href: siteConfig.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${siteConfig.socials.email}`, icon: Mail, label: "Email" },
  ];
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {items.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          className="text-neutral-400 transition hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/SocialLinks.tsx
git commit -m "feat: add SocialLinks component"
```

---

### Task 5: NavBar rewrite — centered dark pill + top-right Resume pill

**Files:**
- Modify (rewrite): `src/components/layout/NavBar.tsx`

**Interfaces:**
- Consumes: `siteConfig.nav` (Task 1), `ResumeButton` (Task 3).
- Produces: default-export `NavBarPage` rendering both pills, fixed at top.

- [ ] **Step 1: Rewrite NavBar**

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ResumeButton from "@/components/ui/ResumeButton";

export default function NavBarPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center gap-x-6 rounded-full px-6 py-3 transition-all
          ${isScrolled ? "border border-white/10 bg-neutral-900/70 backdrop-blur-md" : "border border-white/10 bg-neutral-900"}`}
      >
        {siteConfig.nav.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-sm transition hover:text-white ${
              i === 0 ? "font-bold text-white" : "text-neutral-300"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="fixed top-4 right-4 z-50">
        <ResumeButton />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success, no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/NavBar.tsx
git commit -m "feat: rewrite NavBar — B&W centered pill + Resume pill"
```

---

### Task 6: Placeholder assets (photo + resume)

**Files:**
- Create: `public/profile.jpg` (placeholder)
- Create: `public/resume.pdf` (placeholder)

- [ ] **Step 1: Create public dir + placeholder files**

Use a tiny valid placeholder. Run (PowerShell):

```powershell
New-Item -ItemType Directory -Force public | Out-Null
# minimal valid PDF
Set-Content -Path public/resume.pdf -Value "%PDF-1.4`n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj`n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj`nxref`n0 3`ntrailer<</Root 1 0 R>>`n%%EOF" -Encoding ascii
```

For `profile.jpg`: drop any placeholder image. If none available, create a 1x1 via a known base64, or instruct user to add. Acceptable: copy any existing jpg, or leave a note. Minimal approach — write a tiny SVG-backed note is NOT a jpg; instead instruct the executor to place a real jpg. If unavailable, create from base64 1x1:

```powershell
[IO.File]::WriteAllBytes("public/profile.jpg", [Convert]::FromBase64String("/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AfwH/2Q=="))
```

- [ ] **Step 2: Verify files exist**

Run: `ls public`
Expected: `profile.jpg`, `resume.pdf` present.

- [ ] **Step 3: Commit**

```bash
git add public/profile.jpg public/resume.pdf
git commit -m "chore: add placeholder profile photo and resume"
```

---

### Task 7: Hero rewrite — split layout, headline, bio, actions, photo

**Files:**
- Modify (rewrite): `src/components/Hero/page.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 1), `ResumeButton` (Task 3), `SocialLinks` (Task 4), placeholder assets (Task 6).
- Produces: default-export `HeroPage`.

- [ ] **Step 1: Rewrite Hero (client component for motion)**

```tsx
"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import ResumeButton from "@/components/ui/ResumeButton";
import SocialLinks from "@/components/ui/SocialLinks";

export default function HeroPage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center gap-12 px-6 pt-40 md:flex-row md:justify-between md:pt-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl">
          hi, I&apos;m {siteConfig.name} <span className="inline-block">👋</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-300">{siteConfig.role}</p>
        <p className="mt-4 max-w-md text-neutral-400">{siteConfig.bio}</p>

        <div className="mt-8 flex items-center gap-6">
          <ResumeButton />
          <SocialLinks />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="shrink-0"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 rotate-2">
          <Image
            src={siteConfig.photoPath}
            alt={siteConfig.name}
            width={280}
            height={340}
            className="h-[340px] w-[280px] object-cover grayscale"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Simplify `src/app/page.tsx` wrapper**

The old wrapper constrains NavBar to `w-60` — remove that. New `page.tsx`:

```tsx
import HeroPage from "../components/Hero/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <NavBarPage />
      <HeroPage />
      <FooterPage />
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success. If `motion/react` import path errors, fall back to `import { motion } from "motion"` per installed version — check `node_modules/motion/package.json` exports.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero/page.tsx src/app/page.tsx
git commit -m "feat: rewrite Hero — split B&W layout with resume + socials"
```

---

### Task 8: Visual verification + lint

**Files:** none (verification only)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors. Fix any reported.

- [ ] **Step 2: Dev server visual check**

Run: `npm run dev`, open http://localhost:3000.
Confirm: dark near-black bg; centered dark nav pill with `Ashik`(bold)/About/Projects/Contact; top-right Resume pill downloads the placeholder PDF; hero shows serif headline "hi, I'm Ashik 👋", role, bio, Resume button, social icons, grayscale tilted photo card; layout stacks on narrow width.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: polish from visual verification"
```

(Skip commit if no fixes needed.)

---

## Self-Review

**Spec coverage:**
- Dark monochrome theme → Task 2. ✓
- Fonts (serif + sans) → Task 2. ✓
- site-config single source → Task 1. ✓
- NavBar centered dark pill, Ashik=home → Task 5. ✓
- Separate top-right Resume pill → Tasks 3 + 5. ✓
- Hero split, headline/role/bio → Task 7. ✓
- Resume in hero + socials → Tasks 3, 4, 7. ✓
- Grayscale photo card → Task 7. ✓
- Placeholders profile.jpg/resume.pdf → Task 6. ✓
- Responsive stacking → Task 7 (`md:` breakpoints). ✓
- Real metadata → Task 2. ✓

**Placeholder scan:** No "TBD"/"implement later". LinkedIn URL is an explicit placeholder value (flagged for user update), not a plan gap.

**Type consistency:** `siteConfig` shape used identically across Tasks 3,4,5,7. Component prop `{ className?: string }` consistent. Default exports consistent with import sites.

**Note on motion import:** Task 7 Step 3 documents the fallback if `motion/react` path differs in the installed version.

## Out of scope (Phase 1)
Projects grid, Blog, Contact pages, Footer redesign, light/dark toggle.
