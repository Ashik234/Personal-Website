"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import SocialLinks from "@/components/ui/SocialLinks";

// Stamped when the bundle is built.
const LAST_UPDATED = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function FooterPage() {
  return (
    <footer className="border-t border-black/10 px-6 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          {siteConfig.available && (
            <span className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-900/60 dark:bg-white/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
              </span>
              {siteConfig.availabilityText}
            </span>
          )}
          <p className="text-sm text-neutral-500">
            © {siteConfig.name} · Last updated {LAST_UPDATED}
          </p>
        </div>
        <SocialLinks />
      </div>

      {/* reward — only really seen by people who scroll all the way down */}
      <motion.p
        className="mx-auto mt-8 max-w-5xl text-center text-xs text-neutral-500 dark:text-neutral-600"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        you scrolled all the way down — respect. now go{" "}
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600 underline underline-offset-2 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          check out my code
        </a>
        . 👀
      </motion.p>
    </footer>
  );
}
