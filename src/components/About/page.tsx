"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <section
      id="about"
      className="snap-section mx-auto max-w-5xl scroll-mt-28 px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-serif text-3xl text-neutral-900 dark:text-white md:text-4xl">
          about
        </h2>

        <p className="mt-6 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
          {siteConfig.about}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {siteConfig.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-black/15 bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
