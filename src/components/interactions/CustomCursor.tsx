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
