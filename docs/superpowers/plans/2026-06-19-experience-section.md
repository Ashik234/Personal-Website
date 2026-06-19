# Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Experience section (vertical timeline, detailed entries with bullet highlights) below the About section.

**Architecture:** Reuse the established pattern — data in `src/lib/site-config.ts`, a client section component using `motion/react` `whileInView` reveal (mirrors About), wired into `src/app/page.tsx` after About. Vertical timeline rendered with a left rail (line + dots) and entries stacked newest-first.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, `motion/react`.

## Global Constraints

- Dark-only monochrome theme; black/white/gray only, no accent colors.
- No new dependencies.
- All content flows from `src/lib/site-config.ts` — no hardcoded copy in the component.
- Match existing section conventions: `mx-auto max-w-5xl px-6 py-24`, lowercase serif `<h2>` heading, `scroll-mt-28`, `whileInView` entrance.
- Verification per task = `npx tsc --noEmit` clean + `npm run build` succeeds. Visual check via production `next start` screenshot at the end.
- **Build flake note:** if a build throws `_document`/`.nft.json`/`pages-manifest` ENOENT (not a code error — tsc passes), run `rm -rf .next` and rebuild; kill stray node workers if it persists.
- **Commits: author = repo git user only. NO `Co-Authored-By` trailer. NO push.**

---

### Task 1: Add experience data to site-config

**Files:**
- Modify: `src/lib/site-config.ts`

**Interfaces:**
- Produces: `siteConfig.experience` — array of `{ role: string; company: string; location: string; period: string; highlights: string[] }`, ordered newest-first.

- [ ] **Step 1: Add the `experience` array**

Insert after the `skills` array (before `resumePath`) in the `siteConfig` object:

```ts
  experience: [
    {
      role: "Full-stack Developer",
      company: "Dignizant Technologies",
      location: "Kerala, India",
      period: "2024 — Present",
      highlights: [
        "Build and ship full-stack web applications end to end, from API and database design to React/Next.js front ends.",
        "Work across the TypeScript ecosystem — Next.js, Node.js, MongoDB and PostgreSQL — delivering client and internal products.",
        "Own features through the full cycle: design, implementation, review and deployment.",
      ],
    },
    {
      role: "MERN Stack Developer (Training & Projects)",
      company: "KINFRA Industrial Park · BROTOTYPE",
      location: "Kozhikode, Kerala",
      period: "2022 — 2024",
      highlights: [
        "Completed an intensive mentored program covering front-end, back-end and full-stack development.",
        "Built multiple full-stack projects with the MERN stack (MongoDB, Express, React, Node.js).",
        "Grew from self-taught fundamentals to shipping complete, deployed applications.",
      ],
    },
  ],
```

(Copy is a draft from the user's history — user can edit later.)

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: exit 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/site-config.ts
git commit -m "feat: add experience data to site-config"
```

---

### Task 2: Experience timeline component

**Files:**
- Create: `src/components/Experience/page.tsx`

**Interfaces:**
- Consumes: `siteConfig.experience` (Task 1).
- Produces: default-export `ExperiencePage`.

- [ ] **Step 1: Create the component**

```tsx
"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function ExperiencePage() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        experience
      </motion.h2>

      <ol className="mt-10 border-l border-white/15">
        {siteConfig.experience.map((job, i) => (
          <motion.li
            key={`${job.company}-${job.period}`}
            className="relative ml-6 pb-12 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* timeline dot */}
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-white/30 bg-neutral-900" />

            <p className="text-xs uppercase tracking-wider text-neutral-500">
              {job.period}
            </p>
            <h3 className="mt-1 text-lg font-medium text-white">
              {job.role}
            </h3>
            <p className="text-sm text-neutral-400">
              {job.company} · {job.location}
            </p>

            <ul className="mt-3 space-y-1.5">
              {job.highlights.map((h, j) => (
                <li
                  key={j}
                  className="relative pl-4 text-sm leading-relaxed text-neutral-400 before:absolute before:left-0 before:text-neutral-600 before:content-['—']"
                >
                  {h}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience/page.tsx
git commit -m "feat: add Experience timeline component"
```

---

### Task 3: Wire Experience into the page + verify

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `ExperiencePage` (Task 2). Renders it between `AboutPage` and `FooterPage`.

- [ ] **Step 1: Import and render Experience after About**

Change `src/app/page.tsx` to add the import and the component:

```tsx
import HeroPage from "../components/Hero/page";
import AboutPage from "../components/About/page";
import ExperiencePage from "../components/Experience/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import Loader from "../components/loader/Loader";
import "./globals.css";

export default function Home() {
  return (
    <Loader>
      <main className="min-h-screen w-full">
        <NavBarPage />
        <HeroPage />
        <AboutPage />
        <ExperiencePage />
        <FooterPage />
      </main>
    </Loader>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success. (If `_document`/ENOENT flake → `rm -rf .next` and rebuild.)

- [ ] **Step 3: Visual verify**

Run: `npx next start -p 3009`, screenshot `http://localhost:3009/` (tall window, e.g. 1280x2200, virtual-time ~3000ms so the loader clears).
Confirm: below About sits an "experience" heading, a left timeline rail with two dotted entries (Dignizant newest, then KINFRA/BROTOTYPE), each showing period, role, company·location, and dash bullet highlights. Monochrome, consistent with About.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire Experience section into page"
```

---

## Self-Review

**Spec coverage:**
- Vertical timeline → Task 2 (`border-l` rail + absolute dots). ✓
- Detailed entries + bullet highlights → Task 1 (`highlights[]`) + Task 2 (`<ul>`). ✓
- Two entries (Dignizant + KINFRA/BROTOTYPE), newest-first → Task 1 array order. ✓
- Below About → Task 3 placement. ✓
- Data in site-config → Task 1. ✓
- Matches section conventions (max-w-5xl, serif h2, whileInView) → Task 2. ✓

**Placeholder scan:** No TBD/TODO. Highlight copy is real draft text (flagged editable), not a gap.

**Type consistency:** `experience` entry shape `{role, company, location, period, highlights[]}` defined in Task 1, consumed identically in Task 2. Component default-export name `ExperiencePage` consistent across Tasks 2 and 3.

## Out of scope
Education, Projects, Contact sections (later plans). Footer unchanged.
