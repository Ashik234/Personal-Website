"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function NowPage() {
  return (
    <section id="now" className="snap-section mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-neutral-900 dark:text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        now
      </motion.h2>

      <p className="mt-3 text-sm text-neutral-500">what I&apos;m up to these days</p>

      <ul className="mt-8 space-y-4">
        {siteConfig.now.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-900/60 dark:bg-white/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
