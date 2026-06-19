# Light/Dark Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a working light/dark theme toggle — install `next-themes`, add a toggle control in the navbar, and convert every component's hardcoded dark colors to theme-aware `dark:` pairs so both modes look intentional.

**Architecture:** `next-themes` manages the `class` on `<html>` (persistence + system pref + no flash). Tailwind is already `darkMode: ["class"]`. We keep dark as the default but make each component render correct colors in BOTH modes using `light-class dark:dark-class` pairs. Hero/loader stay as-is where they are intentionally always-dark (loader), otherwise everything flips.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, `next-themes`, `motion/react`, `lucide-react`.

## Global Constraints

- Monochrome both modes: dark = near-black bg + off-white text; light = off-white bg + near-black text. Grays invert. No accent colors.
- One new dependency allowed: `next-themes`.
- Default theme = dark; remember user choice; respect system on first visit is optional (default to dark to preserve current identity → `defaultTheme="dark"`, `enableSystem={false}`).
- All personal data stays in `src/lib/site-config.ts`.
- **Color mapping (apply consistently):**
  - page bg: dark `hsl(0 0% 4%)` ↔ light `hsl(0 0% 98%)` (via CSS vars / `bg-background`)
  - primary text: `text-neutral-900 dark:text-white`
  - secondary text: `text-neutral-600 dark:text-neutral-300`
  - muted text: `text-neutral-500 dark:text-neutral-400`
  - faint text: `text-neutral-400 dark:text-neutral-500`
  - borders: `border-black/10 dark:border-white/10` (and `/15`, `/20` variants keep ratio)
  - pill/card bg: `bg-neutral-100 dark:bg-neutral-900` (and `/50` variants)
  - hover text: `hover:text-black dark:hover:text-white`
- **Workflow:** code + commit only. Run `npx tsc --noEmit` before committing. Do NOT run build/dev/screenshots. Commits: repo git user only, NO `Co-Authored-By`, NO push.

---

### Task 1: Install next-themes + ThemeProvider + remove hardcoded dark class

**Files:**
- Modify: `package.json` (add dependency)
- Create: `src/components/theme/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css` (drive bg/fg from tokens both modes)

**Interfaces:**
- Produces: `<ThemeProvider>` wrapping the app; `<html>` no longer hardcodes `dark`; body background driven by `bg-background text-foreground` which resolves per theme.

- [ ] **Step 1: Add dependency to package.json**

Add to `dependencies` in `package.json`:

```json
    "next-themes": "^0.4.4",
```

(Run `npm install` locally — user handles install/build.)

- [ ] **Step 2: Create ThemeProvider wrapper**

```tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 3: Update layout.tsx — wrap children, drop hardcoded dark, add suppressHydrationWarning**

```tsx
import { Inter, Instrument_Serif, Fraunces } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import ThemeProvider from "../components/theme/ThemeProvider";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
  style: "italic",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Ashik — Full-stack Developer",
  description:
    "Personal website of Ashik — backend by profession, full-stack by passion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${fraunces.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Ensure globals.css light bg is correct**

The `:root` block already holds light values and `.dark` holds dark. Confirm `:root` has `--background: 0 0% 98%;` (light) — change the existing `--background: 0 0% 100%;` to `0 0% 98%` for an off-white (not stark white):

```css
  :root {
    --background: 0 0% 98%;
    --foreground: 0 0% 3.9%;
```

Leave `.dark` as `--background: 0 0% 4%;`. Body already uses `@apply bg-background text-foreground`, so it flips automatically.

- [ ] **Step 5: Typecheck + commit**

```bash
npx tsc --noEmit
git add package.json src/components/theme/ThemeProvider.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: add next-themes provider, remove hardcoded dark class"
```

---

### Task 2: Theme toggle button in navbar

**Files:**
- Create: `src/components/theme/ThemeToggle.tsx`
- Modify: `src/components/layout/NavBar.tsx`

**Interfaces:**
- Consumes: `useTheme` from next-themes.
- Produces: default-export `ThemeToggle` — a button cycling light/dark, sun/moon icon. Mounted in the navbar near the Resume pill.

- [ ] **Step 1: Create ThemeToggle**

```tsx
"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // avoid hydration mismatch — render a placeholder until mounted
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`rounded-full border border-black/15 bg-neutral-100 p-2 text-neutral-700 transition hover:text-black dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-white ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
```

- [ ] **Step 2: Mount toggle in NavBar (next to Resume)**

In `src/components/layout/NavBar.tsx`, import and place the toggle in the right-side area beside `ResumeButton`. Wrap the resume + toggle in a flex container:

```tsx
import ThemeToggle from "@/components/theme/ThemeToggle";
```

Replace the resume div (the `static`/`fixed` wrapper) so both controls sit together:

```tsx
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isScrolled ? "static" : "fixed right-4 top-4"
          }`}
        >
          <ThemeToggle />
          <ResumeButton />
        </div>
```

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/components/theme/ThemeToggle.tsx src/components/layout/NavBar.tsx
git commit -m "feat: add theme toggle button to navbar"
```

---

### Task 3: Convert NavBar + shared UI (ResumeButton, SocialLinks) colors

**Files:**
- Modify: `src/components/layout/NavBar.tsx`
- Modify: `src/components/ui/ResumeButton.tsx`
- Modify: `src/components/ui/SocialLinks.tsx`

- [ ] **Step 1: NavBar pill colors → theme-aware**

In NavBar, update the nav pill and link classes:
- pill bg: `bg-neutral-900` → `bg-neutral-100 dark:bg-neutral-900`
- pill blur bg: `bg-neutral-900/70` → `bg-neutral-100/70 dark:bg-neutral-900/70`
- borders: `border-white/10` → `border-black/10 dark:border-white/10`
- first link: `text-white` → `text-neutral-900 dark:text-white`
- other links: `text-neutral-300` → `text-neutral-600 dark:text-neutral-300`
- link hover: `hover:text-white` → `hover:text-black dark:hover:text-white`

- [ ] **Step 2: ResumeButton colors**

```tsx
import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.resumePath}
      download
      className={`inline-flex items-center gap-2 rounded-full border border-black/15 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 ${className}`}
    >
      Resume
      <Download className="h-4 w-4" />
    </a>
  );
}
```

- [ ] **Step 3: SocialLinks colors**

Change the link class:
```tsx
className="text-neutral-500 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
```

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/components/layout/NavBar.tsx src/components/ui/ResumeButton.tsx src/components/ui/SocialLinks.tsx
git commit -m "feat: theme-aware colors for navbar and shared UI"
```

---

### Task 4: Convert Hero + About colors

**Files:**
- Modify: `src/components/Hero/page.tsx`
- Modify: `src/components/About/page.tsx`

- [ ] **Step 1: Hero**

- headline `text-white` → `text-neutral-900 dark:text-white`
- role `text-neutral-300` → `text-neutral-600 dark:text-neutral-300`
- bio `text-neutral-400` → `text-neutral-500 dark:text-neutral-400`

- [ ] **Step 2: About**

- heading `text-white` → `text-neutral-900 dark:text-white`
- paragraph `text-neutral-400` → `text-neutral-600 dark:text-neutral-400`
- chips: `border-white/15 bg-neutral-900 text-neutral-300` → `border-black/15 bg-neutral-100 text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300`

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/components/Hero/page.tsx src/components/About/page.tsx
git commit -m "feat: theme-aware colors for hero and about"
```

---

### Task 5: Convert Experience + Education + Awards colors

**Files:**
- Modify: `src/components/Experience/page.tsx`
- Modify: `src/components/Education/page.tsx`
- Modify: `src/components/Awards/page.tsx`

- [ ] **Step 1: Apply the standard mapping to all three**

For each of the three timeline/list components:
- heading `text-white` → `text-neutral-900 dark:text-white`
- rail `border-white/15` → `border-black/15 dark:border-white/15`
- dot `border-white/30 bg-neutral-900` → `border-black/30 bg-neutral-100 dark:border-white/30 dark:bg-neutral-900`
- period/date label `text-neutral-500` → keep (`text-neutral-500` reads in both) but make role/title `text-white` → `text-neutral-900 dark:text-white`
- company/school/notes `text-neutral-400` → `text-neutral-600 dark:text-neutral-400`
- award icon `text-neutral-500` → keep
- highlight dash `before:text-neutral-600` → `before:text-neutral-400 dark:before:text-neutral-600`

- [ ] **Step 2: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/components/Experience/page.tsx src/components/Education/page.tsx src/components/Awards/page.tsx
git commit -m "feat: theme-aware colors for experience, education, awards"
```

---

### Task 6: Convert Projects (+ SatTerminal) + Now + Connect + Footer colors

**Files:**
- Modify: `src/components/Projects/page.tsx`
- Modify: `src/components/Now/page.tsx`
- Modify: `src/components/Contact/page.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Note:** `SatTerminal` is intentionally a dark terminal — KEEP it dark in both modes (terminals are dark). No change to SatTerminal.

- [ ] **Step 1: Projects cards**

- heading `text-white` → `text-neutral-900 dark:text-white`
- card `border-white/10 bg-neutral-900/50` → `border-black/10 bg-neutral-100/50 dark:border-white/10 dark:bg-neutral-900/50`
- card hover `hover:border-white/20` → `hover:border-black/20 dark:hover:border-white/20`
- title `text-white` → `text-neutral-900 dark:text-white`
- icon links `text-neutral-400 hover:text-white` → `text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white`
- description `text-neutral-400` → `text-neutral-600 dark:text-neutral-400`
- tech tags `border-white/10 text-neutral-400` → `border-black/10 text-neutral-600 dark:border-white/10 dark:text-neutral-400`
- terminal hint `text-neutral-600 group-hover:text-neutral-300` → `text-neutral-400 group-hover:text-neutral-700 dark:text-neutral-600 dark:group-hover:text-neutral-300`

- [ ] **Step 2: Now**

- heading `text-white` → `text-neutral-900 dark:text-white`
- subtitle `text-neutral-500` → keep
- items `text-neutral-300` → `text-neutral-700 dark:text-neutral-300`
- dot stays white-on-ping; for light mode use `bg-neutral-900 dark:bg-white` for the solid dot and `bg-neutral-900/60 dark:bg-white/60` for the ping.

- [ ] **Step 3: Connect**

- heading `text-white` → `text-neutral-900 dark:text-white`
- (SocialLinks already converted in Task 3)

- [ ] **Step 4: Footer**

- border `border-white/10` → `border-black/10 dark:border-white/10`
- availability text `text-neutral-300` → `text-neutral-700 dark:text-neutral-300`
- availability dot `bg-white` / `bg-white/60` → `bg-neutral-900 dark:bg-white` / `bg-neutral-900/60 dark:bg-white/60`
- copyright `text-neutral-500` → keep
- reward line `text-neutral-600` → `text-neutral-500 dark:text-neutral-600`
- reward link `text-neutral-400 hover:text-white` → `text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white`

- [ ] **Step 5: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/components/Projects/page.tsx src/components/Now/page.tsx src/components/Contact/page.tsx src/components/layout/Footer.tsx
git commit -m "feat: theme-aware colors for projects, now, connect, footer"
```

---

## Self-Review

**Spec coverage:**
- Install next-themes + provider → Task 1. ✓
- Toggle button → Task 2. ✓
- All components converted: NavBar/ResumeButton/SocialLinks (T3), Hero/About (T4), Experience/Education/Awards (T5), Projects/Now/Connect/Footer (T6). ✓
- Loader + SatTerminal intentionally stay dark (terminals/loader are always-dark) — noted in T6. ✓
- Scrollbar (globals.css) uses `rgba(255,255,255,...)` — acceptable; subtle in light mode. (Optional future polish, not blocking.)

**Placeholder scan:** No TBD/TODO. Each task lists exact class replacements.

**Type consistency:** No new types/signatures except `ThemeToggle({className?})` and `ThemeProvider({children})` — both defined in Tasks 1-2 and used consistently. `useTheme` from next-themes returns `{ resolvedTheme, setTheme }` — used as documented.

**Risk note:** the bulk is mechanical class swaps. Default stays dark, so even if a component is missed it still looks right in dark mode; light mode is where any miss shows.

## Out of scope
- Converting the loader or SatTerminal (intentionally dark).
- Scrollbar light-mode tinting (optional polish).
- System-preference auto-detection (defaulting to dark to keep identity).
