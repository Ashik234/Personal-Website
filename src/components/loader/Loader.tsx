"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoaderVariant, { type LoaderVariant as Variant } from "./variants";

const MIN_DURATION = 1000; // keep the loader up at least this long

function pickVariant(): Variant {
  // Allow ?loader=1..5 for previewing; falls back to the default.
  if (typeof window !== "undefined") {
    const q = Number(new URLSearchParams(window.location.search).get("loader"));
    if (q >= 1 && q <= 5) return q as Variant;
  }
  return DEFAULT_VARIANT;
}

const DEFAULT_VARIANT: Variant = 1;

export default function Loader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);

  useEffect(() => {
    setVariant(pickVariant());

    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(() => setLoading(false), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LoaderVariant variant={variant} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ filter: "blur(12px)" }}
        animate={{ filter: loading ? "blur(12px)" : "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
