import { siteConfig } from "@/lib/site-config";
import SocialLinks from "@/components/ui/SocialLinks";

export default function FooterPage() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-neutral-500">
          © {siteConfig.name}. Built with Next.js.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
