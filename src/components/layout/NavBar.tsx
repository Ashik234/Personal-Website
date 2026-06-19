"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ResumeButton from "@/components/ui/ResumeButton";

export default function NavBarPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center gap-x-6 rounded-full px-6 py-3 transition-all
          ${
            isScrolled
              ? "border border-white/10 bg-neutral-900/70 backdrop-blur-md"
              : "border border-white/10 bg-neutral-900"
          }`}
      >
        {siteConfig.nav.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-sm transition hover:text-white ${
              i === 0 ? "font-bold text-white" : "text-neutral-300"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="fixed top-4 right-4 z-50">
        <ResumeButton />
      </div>
    </>
  );
}
