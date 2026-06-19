import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.resumePath}
      download
      className={`inline-flex items-center gap-2 rounded-full border border-black/15 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 ${className}`}
    >
      Resume
      <Download className="h-4 w-4" />
    </a>
  );
}
