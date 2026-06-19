"use client";
import { motion } from "motion/react";

/**
 * Five monochrome, Ashik-monogram loader variants.
 * Each fills the screen; the parent Loader handles mount/exit + page blur.
 */

export type LoaderVariant = 1 | 2 | 3 | 4 | 5;

const shell =
  "fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(0_0%_4%)]";

/**
 * 1 — Letter "A" (Fraunces italic): the outline "draws" on left→right, then the
 * glyph fills solid. Loops while the page loads. `fontClass` kept for previewing.
 */
export function LetterA({ fontClass = "font-fraunces italic" }: { fontClass?: string }) {
  const base = { fontSize: "6.5rem", lineHeight: 1 } as const;
  return (
    <div className={shell}>
      <div className="relative">
        {/* faint full outline so the A always reads */}
        <span
          className={`${fontClass} block`}
          style={{ ...base, WebkitTextStroke: "1px rgba(255,255,255,0.12)", color: "transparent" }}
          aria-hidden
        >
          A
        </span>

        {/* bright outline that draws on left→right */}
        <motion.span
          className={`${fontClass} absolute inset-0 block`}
          style={{ ...base, WebkitTextStroke: "1.5px white", color: "transparent" }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"] }}
          transition={{
            duration: 2.2,
            times: [0, 0.5, 0.85, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        >
          A
        </motion.span>

        {/* solid fill fades in after the stroke completes */}
        <motion.span
          className={`${fontClass} absolute inset-0 block text-white`}
          style={base}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{
            duration: 2.2,
            times: [0, 0.55, 0.8, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        >
          A
        </motion.span>
      </div>
    </div>
  );
}

/* 2 — "AK" fade + scale with expanding letter-spacing. */
function ScaleAK() {
  return (
    <div className={shell}>
      <motion.span
        className="font-serif text-white"
        initial={{ opacity: 0, scale: 0.6, letterSpacing: "0.05em", filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, letterSpacing: "0.35em", filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: "5rem", paddingLeft: "0.35em" }}
      >
        AK
      </motion.span>
    </div>
  );
}

/* 3 — Rotating thin ring around a static serif "A". */
function RingA() {
  return (
    <div className={shell}>
      <div className="relative flex h-32 w-32 items-center justify-center">
        <motion.span
          className="font-serif text-5xl text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          A
        </motion.span>
        <motion.svg
          className="absolute inset-0"
          width="128"
          height="128"
          viewBox="0 0 128 128"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="90 280"
          />
        </motion.svg>
      </div>
    </div>
  );
}

/* 4 — Two panels slide apart, revealing "AK" between them. */
function SplitAK() {
  return (
    <div className={`${shell} overflow-hidden`}>
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-neutral-900"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.7, 0, 0.3, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-neutral-900"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.7, 0, 0.3, 1] }}
      />
      <motion.span
        className="font-serif text-7xl tracking-[0.2em] text-white"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
        transition={{ duration: 1.5, times: [0, 0.25, 0.6, 1] }}
        style={{ paddingLeft: "0.2em" }}
      >
        AK
      </motion.span>
    </div>
  );
}

/* 5 — "A" pulses, then an expanding circle wipes outward. */
function PulseWipe() {
  return (
    <div className={`${shell} overflow-hidden`}>
      <motion.span
        className="font-serif text-6xl text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1], scale: [0.9, 1.08, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        A
      </motion.span>
      <motion.div
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 60], opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeIn" }}
      />
    </div>
  );
}

const map: Record<LoaderVariant, () => JSX.Element> = {
  1: () => <LetterA />,
  2: ScaleAK,
  3: RingA,
  4: SplitAK,
  5: PulseWipe,
};

export default function LoaderVariant({ variant }: { variant: LoaderVariant }) {
  const Cmp = map[variant] ?? (() => <LetterA />);
  return <Cmp />;
}
