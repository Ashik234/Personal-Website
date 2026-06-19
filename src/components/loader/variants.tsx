"use client";
import { motion } from "motion/react";

/**
 * Five monochrome, Ashik-monogram loader variants.
 * Each fills the screen; the parent Loader handles mount/exit + page blur.
 */

export type LoaderVariant = 1 | 2 | 3 | 4 | 5;

const shell =
  "fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(0_0%_4%)]";

/* 1 — Draw-on "A": SVG strokes draw themselves, then a soft fade. */
function DrawA() {
  return (
    <div className={shell}>
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
        <motion.path
          d="M20 85 L50 15 L80 85"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        <motion.path
          d="M33 60 L67 60"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "easeInOut" }}
        />
      </svg>
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
  1: DrawA,
  2: ScaleAK,
  3: RingA,
  4: SplitAK,
  5: PulseWipe,
};

export default function LoaderVariant({ variant }: { variant: LoaderVariant }) {
  const Cmp = map[variant] ?? DrawA;
  return <Cmp />;
}
