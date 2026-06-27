"use client";

const DIGNIZANT_URL = "https://dignizant.com/";

/**
 * Renders "Dignizant Technologies" (or custom children) as a teal brand-colored
 * link to the Dignizant website. Color/URL live here so every mention stays consistent.
 */
export default function DignizantLink({
  children = "Dignizant Technologies",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={DIGNIZANT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-medium text-neutral-700 underline decoration-dotted underline-offset-2 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white sm:whitespace-nowrap ${className}`}
    >
      {children}
    </a>
  );
}
