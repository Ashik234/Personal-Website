"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function buildLines(): string[] {
  const c = siteConfig;
  const lines: string[] = [];
  lines.push("$ cat resume.txt");
  lines.push("");
  lines.push(`# ${c.name} — ${c.role}`);
  lines.push("");
  lines.push(c.about);
  lines.push("");
  lines.push("## experience");
  c.experience.forEach((j) => {
    lines.push(`- ${j.period}  ${j.role} — ${j.company} · ${j.location}`);
    j.highlights.forEach((h) => lines.push(`    • ${h}`));
  });
  lines.push("");
  lines.push("## education");
  c.education.forEach((e) => {
    lines.push(`- ${e.period}  ${e.qualification} — ${e.school} · ${e.location}`);
  });
  lines.push("");
  lines.push("## awards");
  c.awards.forEach((a) => lines.push(`- ${a.date}  ${a.title} — ${a.org}`));
  lines.push("");
  lines.push("## projects");
  c.projects.forEach((p) => {
    const proj = p as { name: string; live?: string; repo?: string };
    lines.push(`- ${proj.name}  ${proj.live || proj.repo || ""}`);
  });
  lines.push("");
  lines.push("## contact");
  lines.push(`- email    ${c.socials.email}`);
  lines.push(`- github   ${c.socials.github}`);
  lines.push(`- linkedin ${c.socials.linkedin}`);
  lines.push("");
  lines.push("$ _");
  return lines;
}

export default function DevResume() {
  const all = buildLines();
  const [count, setCount] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count >= all.length) return;
    const t = window.setTimeout(() => setCount((n) => n + 1), 60);
    return () => window.clearTimeout(t);
  }, [count, all.length]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [count]);

  return (
    <main className="min-h-screen bg-[hsl(0_0%_4%)] p-4 font-mono text-sm text-neutral-300">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
          <span>ashik@portfolio: ~/resume</span>
          <Link href="/" className="underline underline-offset-2 hover:text-white">
            ← back to site
          </Link>
        </div>
        <div ref={bodyRef} className="leading-relaxed">
          {all.slice(0, count).map((line, i) => (
            <p
              key={i}
              className={
                line.startsWith("#")
                  ? "text-white"
                  : line.startsWith("$")
                    ? "text-neutral-500"
                    : ""
              }
            >
              {line || " "}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
