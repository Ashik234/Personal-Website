"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function EducationPage() {
  return (
    <section id="education" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        education
      </motion.h2>

      <ol className="mt-10 border-l border-white/15">
        {siteConfig.education.map((edu, i) => (
          <motion.li
            key={`${edu.school}-${edu.period}`}
            className="relative ml-6 pb-12 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* timeline dot */}
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-white/30 bg-neutral-900" />

            <p className="text-xs uppercase tracking-wider text-neutral-500">
              {edu.period}
            </p>
            <h3 className="mt-1 text-lg font-medium text-white">
              {edu.qualification}
            </h3>
            <p className="text-sm text-neutral-400">
              {edu.school} · {edu.location}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
              {edu.note}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
