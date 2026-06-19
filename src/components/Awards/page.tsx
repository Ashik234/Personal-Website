"use client";
import { Award } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function AwardsPage() {
  return (
    <section id="awards" className="snap-section mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-neutral-900 dark:text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        awards &amp; recognition
      </motion.h2>

      <ul className="mt-10 divide-y divide-black/10 dark:divide-white/10">
        {siteConfig.awards.map((award, i) => (
          <motion.li
            key={award.title}
            className="flex gap-4 py-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Award className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-base font-medium text-neutral-900 dark:text-white">
                  {award.title}
                </h3>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  · {award.org}
                </span>
                <span className="text-xs uppercase tracking-wider text-neutral-500">
                  {award.date}
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {award.note}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
