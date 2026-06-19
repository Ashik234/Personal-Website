"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

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
  { cmd: "ls", desc: "list things" },
  { cmd: "clear", desc: "clear the screen" },
  { cmd: "exit", desc: "close the terminal" },
];

function output(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  switch (c) {
    case "whoami":
      return [
        "ashik — full-stack dev, front-end focused. one of the builders of SAT (Team Aakhri).",
      ];
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
    case "ls":
      return ["experience/  education/  awards/  projects/  secrets/"];
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
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const exec = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const c = cmd.toLowerCase();
      if (!c) return;
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
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-white outline-none"
          />
        </form>
      </div>
    </div>
  );
}
