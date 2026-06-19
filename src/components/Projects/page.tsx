"use client";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export default function ProjectsPage() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <motion.h2
        className="font-serif text-3xl text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        projects
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {siteConfig.projects.map((project, i) => (
          <motion.article
            key={project.name}
            className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900/50 p-6 transition hover:border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium text-white">{project.name}</h3>
              <div className="flex items-center gap-3 text-neutral-400">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className="transition hover:text-white"
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
                    className="transition hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-neutral-400"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
