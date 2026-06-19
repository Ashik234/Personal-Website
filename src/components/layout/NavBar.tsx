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
          ? "border-b border-white/10 bg-neutral-900/70 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center px-4 transition-all duration-300 ${
          isScrolled ? "justify-between" : "justify-center"
        }`}
      >
        {/* links — a floating pill at top, inline once scrolled */}
        <div
          className={`flex items-center gap-x-6 transition-all duration-300 ${
            isScrolled
              ? "rounded-none border-0 bg-transparent px-0 py-0"
              : "rounded-full border border-white/10 bg-neutral-900 px-6 py-3"
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
        </div>

        {/* resume + theme toggle — top-right at top, in-bar once scrolled */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isScrolled ? "static" : "fixed right-4 top-4"
          }`}
        >
          <ThemeToggle />
          <ResumeButton />
        </div>
      </div>
    </nav>
  );
}
