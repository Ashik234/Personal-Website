"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Line = { type: "in" | "out"; text: string };

const BANNER = [
  "Smart AI Test Suite (SAT) v1.0",
  "AI-powered unit-test generation. Type `help` to start.",
];

function run(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  switch (c) {
    case "help":
      return [
        "available commands:",
        "  whoami      who built this",
        "  about       what is SAT",
        "  sat gen     generate tests (demo)",
        "  sat test    run tests (demo)",
        "  ls          list things",
        "  clear       clear the screen",
        "  exit        close the terminal",
      ];
    case "whoami":
      return ["ashik — full-stack dev, front-end focused. one of the builders of SAT (Team Aakhri)."];
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
    case "exit":
    case "quit":
      return ["__CLOSE__"];
    default:
      return [`command not found: ${cmd} — type \`help\``];
  }
}

export default function SatTerminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>(
    BANNER.map((text) => ({ type: "out" as const, text })),
  );
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
    const cmd = value;
    setValue("");
    const out = run(cmd);
    if (out[0] === "__CLOSE__") {
      onClose();
      return;
    }
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { type: "in", text: cmd },
      ...out.map((text) => ({ type: "out" as const, text })),
    ]);
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
        {lines.map((l, i) => (
          <p
            key={i}
            className={l.type === "in" ? "text-white" : "text-neutral-400"}
          >
            {l.type === "in" ? <span className="text-neutral-600">$ </span> : null}
            {l.text}
          </p>
        ))}

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
