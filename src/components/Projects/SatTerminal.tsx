"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Line =
  | { type: "in"; text: string }
  | { type: "out"; text: string }
  | { type: "help" };

const BANNER = [
  "Smart AI Test Suite (SAT) v1.0",
  "AI-powered unit-test generation. Type or click `help` to start.",
];

// Commands shown in the interactive help table (clickable).
const COMMANDS: { cmd: string; desc: string }[] = [
  { cmd: "whoami", desc: "who built this" },
  { cmd: "about", desc: "what is SAT" },
  { cmd: "sat gen", desc: "generate tests (demo)" },
  { cmd: "sat test", desc: "run tests (demo)" },
  { cmd: "sat coverage", desc: "show coverage report (demo)" },
  { cmd: "cat resume", desc: "download my resume" },
  { cmd: "ls", desc: "list things" },
  { cmd: "clear", desc: "clear the screen" },
  { cmd: "exit", desc: "close the terminal" },
];

// All command strings usable for tab-completion.
const COMPLETIONS = [
  "whoami", "about", "help", "clear", "exit",
  "sat gen", "sat test", "sat coverage", "cat resume",
  "ls", "experience", "education", "awards", "projects", "secrets",
];

function listExperience(): string[] {
  return siteConfig.experience.flatMap((j) => [
    `${j.period}  ${j.role}`,
    `  ${j.company} · ${j.location}`,
  ]);
}

function listEducation(): string[] {
  return siteConfig.education.flatMap((e) => [
    `${e.period}  ${e.qualification}`,
    `  ${e.school} · ${e.location}`,
  ]);
}

function listAwards(): string[] {
  return siteConfig.awards.flatMap((a) => [`${a.date}  ${a.title} — ${a.org}`]);
}

function listProjects(): string[] {
  return siteConfig.projects.flatMap((p) => {
    const proj = p as { name: string; live?: string; repo?: string };
    return [proj.name, `  ${proj.live || proj.repo || ""}`];
  });
}

function output(cmd: string): string[] {
  // strip an optional leading "cd " / "open " so `cd experience` works too
  const c = cmd.trim().toLowerCase().replace(/^(cd|open)\s+/, "");
  if (!c) return [];
  switch (c) {
    case "whoami":
      return ["ashik — full-stack dev, front-end focused. builder of SAT."];
    case "about":
      return [
        "SAT is a unified CLI that uses AI agents to generate, run and",
        "auto-fix unit tests — 95-98% less time than writing them by hand.",
        "Powered by Groq + Llama 3.3 70B. Won 2nd prize at our AI hackathon.",
      ];
    case "sat gen":
    case "sat gen unit":
      return [
        "$ sat gen unit src/utils/validator.ts",
        "→ analyzing AST + dependencies...",
        "→ detected framework: jest",
        "→ generated 7 test cases (incl. edge cases) ✓",
        "→ wrote __tests__/validator.test.ts",
      ];
    case "sat test":
      return [
        "$ sat test",
        "PASS __tests__/validator.test.ts",
        "Tests: 7 passed, 7 total ✓",
      ];
    case "sat coverage":
      return [
        "$ sat coverage",
        "File            | % Stmts | % Branch | % Funcs | % Lines",
        "----------------|---------|----------|---------|--------",
        "validator.ts    |   98.2  |   95.0   |  100.0  |  98.2",
        "All files       |   97.6  |   94.1   |   98.8  |  97.6",
      ];
    case "cat resume":
    case "cat resume.pdf":
      return ["→ opening resume... 📄"];
    case "sudo":
    case "sudo su":
      return ["nice try — you don't have root here. (but I respect the hustle)"];
    case "rm -rf":
    case "rm -rf /":
    case "rm -rf *":
      return ["whoa 😅 — not deleting anything. this portfolio took effort."];
    case "ls":
      return ["experience/  education/  awards/  projects/  secrets/"];
    case "experience":
    case "experience/":
      return listExperience();
    case "education":
    case "education/":
      return listEducation();
    case "awards":
    case "awards/":
      return listAwards();
    case "projects":
    case "projects/":
      return listProjects();
    case "secrets":
    case "secrets/":
    case "ls secrets":
    case "cat secrets":
      return ["nice try 😏 — but you found the terminal, that counts."];
    default:
      return [`command not found: ${cmd} — type \`help\``];
  }
}

export default function SatTerminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    ...BANNER.map((text) => ({ type: "out" as const, text })),
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1); // -1 = current input
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const exec = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const c = cmd.toLowerCase();
      if (!c) return;
      setHistory((prev) => [...prev, cmd]);
      if (c === "exit" || c === "quit") {
        onClose();
        return;
      }
      if (c === "clear") {
        setLines([]);
        return;
      }
      if (c === "help") {
        setLines((prev) => [...prev, { type: "in", text: cmd }, { type: "help" }]);
        return;
      }
      // side effect: open/download the resume
      if (c === "cat resume" || c === "cat resume.pdf") {
        window.open(siteConfig.resumePath, "_blank");
      }
      setLines((prev) => [
        ...prev,
        { type: "in", text: cmd },
        ...output(cmd).map((text) => ({ type: "out" as const, text })),
      ]);
    },
    [onClose],
  );

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    exec(value);
    setValue("");
    setHistIndex(-1);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setValue("");
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const q = value.trim().toLowerCase();
      if (!q) return;
      const match = COMPLETIONS.find((c) => c.startsWith(q));
      if (match) setValue(match);
    }
  };

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col rounded-2xl border border-white/20 bg-black/95 font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="text-neutral-500">sat — terminal</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close terminal"
          className="text-neutral-500 transition hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={bodyRef} className="flex-1 overflow-y-auto px-3 py-2 leading-relaxed">
        {lines.map((l, i) => {
          if (l.type === "help") {
            return (
              <div key={i} className="my-1">
                <p className="text-neutral-500">available commands (click to run):</p>
                {COMMANDS.map((c) => (
                  <button
                    key={c.cmd}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      exec(c.cmd);
                    }}
                    className="flex w-full items-baseline gap-2 text-left transition hover:text-white"
                  >
                    <span className="text-white">{c.cmd}</span>
                    <span className="min-w-0 flex-1 truncate text-neutral-700">
                      {"─".repeat(40)}
                    </span>
                    <span className="shrink-0 text-neutral-400">{c.desc}</span>
                  </button>
                ))}
              </div>
            );
          }
          return (
            <p
              key={i}
              className={l.type === "in" ? "text-white" : "text-neutral-400"}
            >
              {l.type === "in" ? <span className="text-neutral-600">$ </span> : null}
              {l.text}
            </p>
          );
        })}

        <form onSubmit={submit} className="flex items-center gap-1">
          <span className="text-neutral-600">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-white outline-none"
          />
        </form>
      </div>
    </div>
  );
}
