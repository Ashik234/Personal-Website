"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ResumeButton from "@/components/ui/ResumeButton";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function NavBarPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-black/10 bg-neutral-100/70 py-3 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center px-4 transition-all duration-300 ${
          isScrolled ? "justify-between" : "justify-between md:justify-center"
        }`}
      >
        {/* links — a floating pill at top, inline once scrolled */}
        <div
          className={`flex items-center gap-x-4 transition-all duration-300 sm:gap-x-6 ${
            isScrolled
              ? "rounded-none border-0 bg-transparent px-0 py-0"
              : "rounded-full border border-black/10 bg-neutral-100 px-4 py-2.5 dark:border-white/10 dark:bg-neutral-900 sm:px-6 sm:py-3"
          }`}
        >
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition hover:text-black dark:hover:text-white ${
                i === 0
                  ? "font-bold text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* resume + theme toggle — in-flow on mobile, top-right at top on desktop, in-bar once scrolled */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isScrolled ? "static" : "static md:fixed md:right-4 md:top-4"
          }`}
        >
          <ThemeToggle />
          <ResumeButton className="max-sm:hidden" />
        </div>
      </div>
    </nav>
  );
}
