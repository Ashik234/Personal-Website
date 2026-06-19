import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: siteConfig.socials.github, icon: Github, label: "GitHub" },
    { href: siteConfig.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${siteConfig.socials.email}`, icon: Mail, label: "Email" },
  ];
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {items.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          className="text-neutral-500 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
