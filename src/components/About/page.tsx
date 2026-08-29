"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import DignizantLink from "@/components/ui/DignizantLink";

const COMPANY = "Dignizant Technologies";

export default function AboutPage() {
  // Split the about text around the company name so it can be rendered as a link.
  const [beforeCompany, ...rest] = siteConfig.about.split(COMPANY);
  const afterCompany = rest.join(COMPANY);

  return (
    <section
      id="about"
      className="snap-section mx-auto max-w-5xl scroll-mt-28 px-6 py-16 sm:py-24"
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
          {rest.length > 0 ? (
            <>
              {beforeCompany}
              <DignizantLink />
              {afterCompany}
            </>
          ) : (
            siteConfig.about
          )}
        </p>

        <dl className="mt-8 max-w-2xl space-y-5">
          {siteConfig.skills.map((group) => (
            <div key={group.category} className="sm:flex sm:gap-5">
              <dt className="shrink-0 pt-1 text-sm text-neutral-400 dark:text-neutral-500 sm:w-24 sm:text-right">
                {group.category}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2 sm:mt-0">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-black/15 bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
