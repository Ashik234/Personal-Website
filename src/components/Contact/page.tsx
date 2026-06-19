"use client";
import { motion } from "motion/react";
import SocialLinks from "@/components/ui/SocialLinks";

export default function ContactPage() {
  return (
    <section id="connect" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-serif text-3xl text-white md:text-4xl">connect</h2>
        <SocialLinks className="mt-8" />
      </motion.div>
    </section>
  );
}
