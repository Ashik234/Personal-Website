// TEMP preview — compare 6 custom cursor designs. Delete after pick.
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Variant = 1 | 2 | 3 | 4 | 5 | 6;

const LABELS: Record<Variant, string> = {
  1: "Crosshair",
  2: "Blend / invert",
  3: "Trailing dots",
  4: "Rotating square",
  5: "Label on hover",
  6: "Magnetic ring",
};

function useMouse() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverEl, setHoverEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = (e.target as HTMLElement)?.closest(
        "a, button, [data-target]",
      ) as HTMLElement | null;
      setHoverEl(el);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return { pos, hoverEl, hovering: !!hoverEl };
}

/* 1 — Crosshair */
function Crosshair() {
  const { pos, hovering } = useMouse();
  const s = hovering ? 26 : 18;
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[200]" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
      <div className="absolute bg-white" style={{ width: s, height: 1, left: -s / 2, top: 0 }} />
      <div className="absolute bg-white" style={{ width: 1, height: s, left: 0, top: -s / 2 }} />
    </div>
  );
}

/* 2 — Blend / invert circle */
function Blend() {
  const { pos, hovering } = useMouse();
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-white mix-blend-difference"
      animate={{ x: pos.x - (hovering ? 22 : 9), y: pos.y - (hovering ? 22 : 9), width: hovering ? 44 : 18, height: hovering ? 44 : 18 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}

/* 3 — Trailing dots */
function Trailing() {
  const { pos } = useMouse();
  const trail = [0, 1, 2, 3];
  return (
    <>
      {trail.map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-white"
          animate={{ x: pos.x - 3, y: pos.y - 3 }}
          transition={{ type: "spring", stiffness: 200 - i * 40, damping: 20, mass: 0.4 + i * 0.2 }}
          style={{ width: 6 - i, height: 6 - i, opacity: 1 - i * 0.22 }}
        />
      ))}
    </>
  );
}

/* 4 — Rotating square */
function Square() {
  const { pos, hovering } = useMouse();
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] border border-white/70"
      animate={{ x: pos.x - (hovering ? 18 : 10), y: pos.y - (hovering ? 18 : 10), width: hovering ? 36 : 20, height: hovering ? 36 : 20, rotate: hovering ? 135 : 45 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    />
  );
}

/* 5 — Label on hover */
function LabelCursor() {
  const { pos, hoverEl, hovering } = useMouse();
  const label = hoverEl?.getAttribute("data-label") || (hovering ? "open" : "");
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[200]" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
      <div className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      {label && (
        <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-black">
          {label}
        </span>
      )}
    </div>
  );
}

/* 6 — Magnetic ring (snaps to hovered element) */
function Magnetic() {
  const { pos, hoverEl } = useMouse();
  const rect = hoverEl?.getBoundingClientRect();
  const ring = rect
    ? { x: rect.left - 4, y: rect.top - 4, w: rect.width + 8, h: rect.height + 8, r: 12 }
    : { x: pos.x - 16, y: pos.y - 16, w: 32, h: 32, r: 9999 };
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] border border-white/60"
        animate={{ x: ring.x, y: ring.y, width: ring.w, height: ring.h, borderRadius: ring.r }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-white"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "tween", duration: 0 }}
      />
    </>
  );
}

const MAP: Record<Variant, () => JSX.Element> = {
  1: Crosshair,
  2: Blend,
  3: Trailing,
  4: Square,
  5: LabelCursor,
  6: Magnetic,
};

export default function CursorPreview() {
  const [v, setV] = useState<Variant>(1);
  const Cursor = MAP[v];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[hsl(0_0%_4%)] p-10 text-neutral-300"
      style={{ cursor: "none" }}
    >
      <Cursor />

      <h1 className="font-serif text-4xl text-white">cursor preview</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Move the mouse around. Hover the buttons + cards. Switch designs below.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {([1, 2, 3, 4, 5, 6] as Variant[]).map((n) => (
          <button
            key={n}
            onClick={() => setV(n)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              v === n ? "border-white bg-white text-black" : "border-white/20 text-neutral-300 hover:border-white/40"
            }`}
          >
            {n}. {LABELS[n]}
          </button>
        ))}
      </div>

      {/* sample hover targets */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        <a href="#" data-label="view" className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 hover:border-white/30">
          Sample link card — hover me
        </a>
        <button data-label="open" className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-left hover:border-white/30">
          Sample button — hover me
        </button>
        <div data-target data-label="drag" className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6">
          Sample target — hover me
        </div>
      </div>

      <p className="mt-10 text-sm text-neutral-500">
        Currently showing: <span className="text-white">{LABELS[v]}</span>
      </p>
    </main>
  );
}
