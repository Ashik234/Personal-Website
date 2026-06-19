"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TRIGGER = "ashik";

type Piece = { id: number; x: number; dx: number; dy: number; rot: number; size: number };

/** Type "ashik" anywhere → a small monochrome confetti burst. */
export default function NameConfetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    let buffer = "";

    const burst = () => {
      const next: Piece[] = Array.from({ length: 28 }, (_, i) => ({
        id: Date.now() + i,
        x: 50,
        dx: (Math.cos((i / 28) * Math.PI * 2) || 0.1) * (40 + (i % 5) * 12),
        dy: (Math.sin((i / 28) * Math.PI * 2) || 0.1) * (40 + (i % 5) * 12) - 30,
        rot: (i % 2 ? 1 : -1) * (180 + i * 10),
        size: 6 + (i % 3) * 3,
      }));
      setPieces(next);
      window.setTimeout(() => setPieces([]), 1300);
    };

    const onKey = (e: KeyboardEvent) => {
      // ignore typing inside inputs/textareas
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-TRIGGER.length);
      if (buffer === TRIGGER) burst();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-sm"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.id % 2 ? "#ffffff" : "#9ca3af",
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: `${p.dx}vh`, y: `${p.dy}vh`, opacity: 0, rotate: p.rot }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
