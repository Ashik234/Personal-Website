"use client";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

/** Styled console message for the curious dev who opens devtools. */
export default function ConsoleGreeting() {
  useEffect(() => {
    const big = "font-size:48px;font-weight:bold;color:#fff;";
    const dim = "color:#888;font-size:13px;";
    const link = "color:#fff;font-size:13px;font-weight:bold;";

    /* eslint-disable no-console */
    console.log("%cA", big);
    console.log(
      "%cHey there, fellow dev 👋 — poking around the console, I see.",
      dim,
    );
    console.log("%cdebugging life, one bug at a time.", dim);
    console.log(
      `%cIf you like what you see, let's talk:\n%c${siteConfig.socials.github}`,
      dim,
      link,
    );
    console.log(
      "%cpsst — try typing \"ashik\" anywhere on the page. 🎉",
      dim,
    );
    /* eslint-enable no-console */
  }, []);

  return null;
}
