import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.resumePath}
      download
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 ${className}`}
    >
      Resume
      <Download className="h-4 w-4" />
    </a>
  );
}
