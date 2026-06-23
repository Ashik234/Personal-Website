"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  // colors of the theme we're switching TO (overlay paints the destination)
  const nextBg = isDark ? "hsl(0 0% 98%)" : "hsl(0 0% 4%)";
  const nextFg = isDark ? "#0a0a0a" : "#fafafa";

  const toggle = () => {
    if (playing) return;
    setPlaying(true);
    // flip the theme mid-animation so it reveals already re-themed
    window.setTimeout(() => setTheme(isDark ? "light" : "dark"), 350);
    window.setTimeout(() => setPlaying(false), 800);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Toggle theme"
        onClick={toggle}
        className={`rounded-full border border-black/15 bg-neutral-100 p-2 text-neutral-700 transition hover:text-black dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-white ${className}`}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {playing && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center"
            style={{ background: nextBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.35, 0.65, 1], ease: "easeInOut" }}
          >
            <motion.span
              className="font-fraunces italic"
              style={{ fontSize: "8rem", lineHeight: 1, color: nextFg }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 1.1] }}
              transition={{ duration: 0.8, times: [0, 0.35, 0.7, 1] }}
            >
              A
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
