"use client";
import { useState } from "react";
import { Github, ExternalLink, TerminalSquare } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import SatTerminal from "./SatTerminal";

type Project = (typeof siteConfig.projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const hasTerminal = "terminal" in project && project.terminal;

  return (
    <motion.article
      className={`relative flex flex-col rounded-2xl border border-black/10 bg-neutral-100/50 p-6 transition hover:border-black/20 dark:border-white/10 dark:bg-neutral-900/50 dark:hover:border-white/20 ${
        hasTerminal ? "group cursor-pointer" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => hasTerminal && setOpen(true)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
          {project.name}
        </h3>
        <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="transition hover:text-black dark:hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              className="transition hover:text-black dark:hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-400"
          >
            {t}
          </li>
        ))}
      </ul>

      {hasTerminal && (
        <span className="mt-4 flex items-center gap-1.5 font-mono text-xs text-neutral-400 transition group-hover:text-neutral-700 dark:text-neutral-600 dark:group-hover:text-neutral-300">
          <TerminalSquare className="h-3.5 w-3.5" />
          &gt; click to open terminal
        </span>
      )}

      {hasTerminal && open && <SatTerminal onClose={() => setOpen(false)} />}
    </motion.article>
  );
}

export default function ProjectsPage() {
  return (
    <section id="projects" className="snap-section mx-auto max-w-5xl scroll-mt-28 px-6 py-16 sm:py-24">
      <motion.h2
        className="font-serif text-3xl text-neutral-900 dark:text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        projects
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {siteConfig.projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
