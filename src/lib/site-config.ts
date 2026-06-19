export const siteConfig = {
  name: "Ashik",
  role: "Full-stack developer",
  bio: "Backend by profession, full-stack by passion. I build things for the web.",
  about:
    "I'm a full-stack developer based in Kannur, Kerala, currently building web applications at Dignizant Technologies. I started out self-taught with the MERN stack and now work across the modern TypeScript ecosystem — Next.js and React on the front end, Node.js and databases on the back. I like shipping clean, reliable products and learning a little more with every bug I fix.",
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Supabase",
    "Redis",
    "Tailwind CSS",
    "Git",
  ],
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
  socials: {
    github: "https://github.com/Ashik234",
    linkedin: "https://www.linkedin.com/in/ashik", // placeholder — update with real URL
    email: "ashikash796@gmail.com",
  },
  nav: [
    { label: "Ashik", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
