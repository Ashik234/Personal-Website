"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function ExperiencePage() {
  return (
    <section id="experience" className="snap-section mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-neutral-900 dark:text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        experience
      </motion.h2>

      <ol className="mt-10 border-l border-black/15 dark:border-white/15">
        {siteConfig.experience.map((job, i) => (
          <motion.li
            key={`${job.company}-${job.period}`}
            className="relative ml-6 pb-12 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* timeline dot */}
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-black/30 bg-neutral-100 dark:border-white/30 dark:bg-neutral-900" />

            <p className="text-xs uppercase tracking-wider text-neutral-500">
              {job.period}
            </p>
            <h3 className="mt-1 text-lg font-medium text-neutral-900 dark:text-white">
              {job.role}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {(() => {
                const company: string = job.company;
                const companyUrl: string | undefined = job.companyUrl;
                if (companyUrl)
                  return (
                    <a
                      href={companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-700 underline decoration-dotted underline-offset-2 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white sm:whitespace-nowrap"
                    >
                      {company}
                    </a>
                  );
                return company;
              })()}{" "}
              · {job.location}
            </p>

            <ul className="mt-3 space-y-1.5">
              {job.highlights.map((h, j) => (
                <li
                  key={j}
                  className="relative pl-4 text-sm leading-relaxed text-neutral-600 before:absolute before:left-0 before:text-neutral-400 before:content-['—'] dark:text-neutral-400 dark:before:text-neutral-600"
                >
                  {h}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
