"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import ResumeButton from "@/components/ui/ResumeButton";
import SocialLinks from "@/components/ui/SocialLinks";

export default function HeroPage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center gap-12 px-6 pt-40 md:flex-row md:justify-between md:pt-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl">
          hi, I&apos;m {siteConfig.name} <span className="inline-block">👋</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-300">{siteConfig.role}</p>
        <p className="mt-4 max-w-md text-neutral-400">{siteConfig.bio}</p>

        <div className="mt-8 flex items-center gap-6">
          <ResumeButton />
          <SocialLinks />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="shrink-0"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-800 rotate-2">
          <Image
            src={siteConfig.photoPath}
            alt={siteConfig.name}
            width={280}
            height={340}
            className="h-[340px] w-[280px] object-cover grayscale"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
