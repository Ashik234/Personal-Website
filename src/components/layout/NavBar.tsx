"use client";
import { useState, useEffect } from "react";

export default function NavBarPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 flex gap-x-6 items-center rounded-full px-6 py-3 transition-all F
        ${isScrolled ? "bg-white/30 backdrop-blur-md shadow-md" : "bg-gray-800"}
      `}
    >
      <h1 className="text-white font-bold">Ashik</h1>

      <div className="flex space-x-6">
        <h1 className="text-white cursor-pointer hover:text-gray-300">About</h1>
        <h1 className="text-white cursor-pointer hover:text-gray-300">Projects</h1>
        <h1 className="text-white cursor-pointer hover:text-gray-300">Contact</h1>
      </div>
    </div>
  );
}
