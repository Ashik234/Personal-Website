// TEMP preview — choose a theme-switch transition effect. Delete after pick.
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type FX = 1 | 2 | 3 | 4;

const LABELS: Record<FX, string> = {
  1: "Circle wipe + A",
  2: "Full fade + A",
  3: "Slide panel + A",
  4: "Iris clip + A",
};

// Each preview toggles a local "dark" flag so you can see the bg flip.
export default function TransitionPreview() {
  const [dark, setDark] = useState(true);
  const [fx, setFx] = useState<FX>(1);
  const [playing, setPlaying] = useState(false);

  const bg = dark ? "hsl(0 0% 4%)" : "hsl(0 0% 98%)";
  const fg = dark ? "#fafafa" : "#0a0a0a";
  const nextBg = dark ? "hsl(0 0% 98%)" : "hsl(0 0% 4%)";
  const nextFg = dark ? "#0a0a0a" : "#fafafa";

  const trigger = () => {
    if (playing) return;
    setPlaying(true);
    // flip the theme at the midpoint of the animation
    window.setTimeout(() => setDark((d) => !d), 350);
    window.setTimeout(() => setPlaying(false), 800);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden transition-colors"
      style={{ background: bg, color: fg }}
    >
      <div className="mx-auto max-w-3xl px-8 py-16">
        <h1 className="font-serif text-4xl">transition preview</h1>
        <p className="mt-2 text-sm opacity-60">
          Pick an effect, then hit “toggle theme” to see it. Currently:{" "}
          {dark ? "dark" : "light"}.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {([1, 2, 3, 4] as FX[]).map((n) => (
            <button
              key={n}
              onClick={() => setFx(n)}
              className="rounded-full border px-4 py-2 text-sm transition"
              style={{
                borderColor: fx === n ? fg : "transparent",
                background: fx === n ? fg : "transparent",
                color: fx === n ? bg : fg,
                outline: fx === n ? "none" : `1px solid ${fg}33`,
              }}
            >
              {n}. {LABELS[n]}
            </button>
          ))}
        </div>

        <button
          onClick={trigger}
          className="mt-8 rounded-full px-6 py-3 text-sm font-medium"
          style={{ background: fg, color: bg }}
        >
          ⟳ toggle theme ({LABELS[fx]})
        </button>

        <p className="mt-12 text-sm opacity-60">
          Sample content to show the background change. The “A” is the loader
          monogram, reused for brand continuity.
        </p>
      </div>

      <AnimatePresence>
        {playing && (
          <Overlay fx={fx} nextBg={nextBg} nextFg={nextFg} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Overlay({ fx, nextBg, nextFg }: { fx: FX; nextBg: string; nextFg: string }) {
  const A = (
    <motion.span
      className="font-fraunces italic"
      style={{ fontSize: "8rem", lineHeight: 1, color: nextFg }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 1.1] }}
      transition={{ duration: 0.8, times: [0, 0.35, 0.7, 1] }}
    >
      A
    </motion.span>
  );

  if (fx === 1) {
    // circle wipe from center
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)", "circle(75% at 50% 50%)", "circle(0% at 50% 50%)"] }}
        transition={{ duration: 0.8, times: [0, 0.4, 0.65, 1], ease: "easeInOut" }}
        style={{ background: nextBg }}
      >
        {A}
      </motion.div>
    );
  }

  if (fx === 2) {
    // full fade panel
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.35, 0.65, 1], ease: "easeInOut" }}
        style={{ background: nextBg }}
      >
        {A}
      </motion.div>
    );
  }

  if (fx === 3) {
    // slide panel across
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center"
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "0%", "100%"] }}
        transition={{ duration: 0.85, times: [0, 0.4, 0.6, 1], ease: [0.7, 0, 0.3, 1] }}
        style={{ background: nextBg }}
      >
        {A}
      </motion.div>
    );
  }

  // fx === 4 — iris clip from a corner-ish point
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center"
      initial={{ clipPath: "circle(0% at 90% 8%)" }}
      animate={{ clipPath: ["circle(0% at 90% 8%)", "circle(130% at 90% 8%)", "circle(130% at 90% 8%)", "circle(0% at 90% 8%)"] }}
      transition={{ duration: 0.85, times: [0, 0.45, 0.65, 1], ease: "easeInOut" }}
      style={{ background: nextBg }}
    >
      {A}
    </motion.div>
  );
}
