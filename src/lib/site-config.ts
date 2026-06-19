export const siteConfig = {
  name: "Ashik",
  role: "Full-stack developer",
  bio: "Backend by profession, full-stack by passion. I build things for the web.",
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
  socials: {
    github: "https://github.com/Ashik234",
    linkedin: "https://www.linkedin.com/in/ashik", // placeholder — update with real URL
    email: "ashik.k@dignizant.com",
  },
  nav: [
    { label: "Ashik", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
