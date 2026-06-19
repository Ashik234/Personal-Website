"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import SocialLinks from "@/components/ui/SocialLinks";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = siteConfig.socials.email;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-serif text-3xl text-white md:text-4xl">contact</h2>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="text-lg text-neutral-300 transition hover:text-white md:text-xl"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="text-neutral-500 transition hover:text-white"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        <SocialLinks className="mt-8" />
      </motion.div>
    </section>
  );
}
