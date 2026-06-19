"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function ExperiencePage() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        experience
      </motion.h2>
    </section>
  );
}
