"use client";
import { useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function AwardsPage() {
  const [hovered, setHovered] = useState<number | null>(null);

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
        {siteConfig.awards.map((award, i) => {
          const hasLink = Boolean(award.link);
          const hasImage = Boolean(award.image);
          const isInteractive = hasLink || hasImage;

          const openLink = () => {
            if (hasLink) {
              window.open(award.link, "_blank", "noopener,noreferrer");
            }
          };

          return (
            <motion.li
              key={award.title}
              className={`relative flex gap-4 py-5 ${
                hasLink ? "cursor-pointer" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onHoverStart={() => isInteractive && setHovered(i)}
              onHoverEnd={() => setHovered((cur) => (cur === i ? null : cur))}
              onClick={openLink}
              role={hasLink ? "link" : undefined}
              tabIndex={hasLink ? 0 : undefined}
              onKeyDown={(e) => {
                if (hasLink && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  openLink();
                }
              }}
            >
              <Award
                className={`mt-0.5 h-5 w-5 shrink-0 transition-colors ${
                  hovered === i ? "text-neutral-900 dark:text-white" : "text-neutral-500"
                }`}
              />
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
                  {hasLink && (
                    <ExternalLink
                      className={`h-3.5 w-3.5 text-neutral-400 transition-opacity ${
                        hovered === i ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {award.note}
                </p>
              </div>

              {/* Hover popover with the award image */}
              {hasImage && (
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      className="pointer-events-none absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 md:block"
                      initial={{ opacity: 0, scale: 0.92, y: "-40%" }}
                      animate={{ opacity: 1, scale: 1, y: "-50%" }}
                      exit={{ opacity: 0, scale: 0.92, y: "-40%" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl dark:border-white/15 dark:bg-neutral-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={award.image}
                          alt={award.title}
                          className="h-44 w-64 object-cover"
                        />
                        {hasLink && (
                          <div className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <ExternalLink className="h-3 w-3" />
                            View on LinkedIn
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
