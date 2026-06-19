"use client";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import ResumeButton from "@/components/ui/ResumeButton";
import SocialLinks from "@/components/ui/SocialLinks";

export default function HeroPage() {
  return (
    <section className="snap-section mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-6 pt-40 md:pt-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl">
          hi, I&apos;m {siteConfig.name}
        </h1>
        <p className="mt-4 text-lg text-neutral-300">{siteConfig.role}</p>
        <p className="mt-4 max-w-md text-neutral-400">{siteConfig.bio}</p>

        <div className="mt-8 flex items-center gap-6">
          <ResumeButton />
          <SocialLinks />
        </div>
      </motion.div>
    </section>
  );
}
