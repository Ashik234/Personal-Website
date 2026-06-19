# Interactions: Custom Cursor, Footer Reward, /dev Route — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three interactions — a desktop-only custom cursor (dot + ring that scales on hover), a footer "reward" line revealed at the bottom of the page, and a `/dev` route that renders a full-screen terminal auto-printing the résumé.

**Architecture:** Three independent client components. Cursor + footer reward mount in the home page tree; `/dev` is a new App Router route reusing the terminal styling and `siteConfig` data. All monochrome, consistent with the existing site.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, `motion/react`, `lucide-react`.

## Global Constraints

- Dark-only monochrome theme; black/white/gray only, no accent colors.
- No new dependencies.
- All personal data from `src/lib/site-config.ts`.
- Match section conventions where relevant (mono font for terminal, existing color tokens).
- **Workflow:** code + commit only. Run `npx tsc --noEmit` for a type check before committing. Do NOT run `npm run build`/`next start`/screenshots — the user builds and verifies. Commits: author = repo git user only, NO `Co-Authored-By` trailer, NO push.

---

### Task 1: Custom cursor (desktop only)

**Files:**
- Create: `src/components/interactions/CustomCursor.tsx`
- Modify: `src/app/globals.css` (hide native cursor on fine-pointer)
- Modify: `src/app/page.tsx` (mount the component)

**Interfaces:**
- Produces: default-export `CustomCursor` (renders a fixed dot + ring following the mouse; ring scales up over interactive elements). Returns `null` on non-fine-pointer devices.

- [ ] **Step 1: Create the cursor component**

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // only on devices with a fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        'a, button, input, textarea, [role="button"], .cursor-pointer',
      );
      setHovering(interactive);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-white"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-white/40"
        animate={{
          x: pos.x - (hovering ? 20 : 12),
          y: pos.y - (hovering ? 20 : 12),
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Hide native cursor on fine-pointer devices**

Append to `src/app/globals.css`:

```css
/* Hide native cursor where the custom one renders (desktop / mouse) */
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}
```

- [ ] **Step 3: Mount in page.tsx**

In `src/app/page.tsx`, add the import alongside the other easter-egg imports:

```tsx
import CustomCursor from "../components/interactions/CustomCursor";
```

And render it next to the other globals (after `<NameConfetti />`):

```tsx
      <ConsoleGreeting />
      <NameConfetti />
      <CustomCursor />
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/interactions/CustomCursor.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: desktop custom cursor (dot + ring scales on hover)"
```

---

### Task 2: Footer reward line

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: existing footer; adds a hidden line that fades/slides in when the footer scrolls into view (via `motion` `whileInView`). Footer becomes a client component.

- [ ] **Step 1: Add the reward line to the footer**

The footer is currently a server component computing a build-time date. Keep the date as a prop-free constant computed at module/build time, but convert the footer to a client component so it can use `whileInView`. Replace `src/components/layout/Footer.tsx` with:

```tsx
"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import SocialLinks from "@/components/ui/SocialLinks";

// Stamped when the bundle is built.
const LAST_UPDATED = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function FooterPage() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          {siteConfig.available && (
            <span className="flex items-center gap-2 text-sm text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              {siteConfig.availabilityText}
            </span>
          )}
          <p className="text-sm text-neutral-500">
            © {siteConfig.name} · Last updated {LAST_UPDATED}
          </p>
        </div>
        <SocialLinks />
      </div>

      {/* reward — only really seen by people who scroll all the way down */}
      <motion.p
        className="mx-auto mt-8 max-w-5xl text-center text-xs text-neutral-600"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        you scrolled all the way down — respect. now go{" "}
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 underline underline-offset-2 transition hover:text-white"
        >
          check out my code
        </a>
        . 👀
      </motion.p>
    </footer>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: footer reward line revealed at page bottom"
```

---

### Task 3: /dev route — full-screen terminal résumé

**Files:**
- Create: `src/components/dev/DevResume.tsx`
- Create: `src/app/dev/page.tsx`

**Interfaces:**
- Consumes: `siteConfig` (name, role, about, experience, education, awards, projects, socials).
- Produces: a full-screen terminal that auto-prints the résumé line by line on mount.

- [ ] **Step 1: Create the DevResume client component**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function buildLines(): string[] {
  const c = siteConfig;
  const lines: string[] = [];
  lines.push("$ cat resume.txt");
  lines.push("");
  lines.push(`# ${c.name} — ${c.role}`);
  lines.push("");
  lines.push(c.about);
  lines.push("");
  lines.push("## experience");
  c.experience.forEach((j) => {
    lines.push(`- ${j.period}  ${j.role} — ${j.company} · ${j.location}`);
    j.highlights.forEach((h) => lines.push(`    • ${h}`));
  });
  lines.push("");
  lines.push("## education");
  c.education.forEach((e) => {
    lines.push(`- ${e.period}  ${e.qualification} — ${e.school} · ${e.location}`);
  });
  lines.push("");
  lines.push("## awards");
  c.awards.forEach((a) => lines.push(`- ${a.date}  ${a.title} — ${a.org}`));
  lines.push("");
  lines.push("## projects");
  c.projects.forEach((p) => {
    const proj = p as { name: string; live?: string; repo?: string };
    lines.push(`- ${proj.name}  ${proj.live || proj.repo || ""}`);
  });
  lines.push("");
  lines.push("## contact");
  lines.push(`- email    ${c.socials.email}`);
  lines.push(`- github   ${c.socials.github}`);
  lines.push(`- linkedin ${c.socials.linkedin}`);
  lines.push("");
  lines.push("$ _");
  return lines;
}

export default function DevResume() {
  const all = buildLines();
  const [count, setCount] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count >= all.length) return;
    const t = window.setTimeout(() => setCount((n) => n + 1), 60);
    return () => window.clearTimeout(t);
  }, [count, all.length]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [count]);

  return (
    <main className="min-h-screen bg-[hsl(0_0%_4%)] p-4 font-mono text-sm text-neutral-300">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
          <span>ashik@portfolio: ~/resume</span>
          <Link href="/" className="underline underline-offset-2 hover:text-white">
            ← back to site
          </Link>
        </div>
        <div ref={bodyRef} className="leading-relaxed">
          {all.slice(0, count).map((line, i) => (
            <p
              key={i}
              className={
                line.startsWith("#")
                  ? "text-white"
                  : line.startsWith("$")
                    ? "text-neutral-500"
                    : ""
              }
            >
              {line || " "}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create the /dev route page**

```tsx
import type { Metadata } from "next";
import DevResume from "../../components/dev/DevResume";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ashik — resume (dev mode)",
};

export default function DevPage() {
  return <DevResume />;
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/dev/DevResume.tsx src/app/dev/page.tsx
git commit -m "feat: /dev route — full-screen terminal resume"
```

---

## Self-Review

**Spec coverage:**
- Custom cursor (dot + ring, scales on hover, desktop only) → Task 1. ✓
- Footer reward line revealed at bottom → Task 2. ✓
- /dev route, full-screen terminal auto-printing resume → Task 3. ✓

**Placeholder scan:** No TBD/TODO. All code complete.

**Type consistency:**
- Cursor: self-contained, no cross-task types.
- Footer: keeps existing `siteConfig.available`/`availabilityText`; converted to client so `whileInView` works (build-time date moved to module constant — still static).
- DevResume: project url access uses the same `as { name; live?; repo? }` cast used in `SatTerminal.listProjects` to avoid the `as const` union `never` issue. Reads only existing config fields.

**Note (cursor + existing eggs):** `cursor: none` is scoped to `(pointer: fine)` so touch devices keep native behavior. NameConfetti/terminal overlays are unaffected (higher z-index than cursor where needed is not required — cursor is `pointer-events-none`).

## Out of scope
Other easter eggs (Konami, magnetic buttons, scroll-spy, etc.) — separate future plans.
