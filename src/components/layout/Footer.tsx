import { siteConfig } from "@/lib/site-config";
import SocialLinks from "@/components/ui/SocialLinks";

export default function FooterPage() {
  // Stamped at build time (static export) — reflects the last deploy.
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          {siteConfig.available && (
            <span className="flex items-center gap-2 text-sm text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              {siteConfig.availabilityText}
            </span>
          )}
          <p className="text-sm text-neutral-500">
            © {siteConfig.name} · Last updated {lastUpdated}
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
