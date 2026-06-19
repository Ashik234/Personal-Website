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
  experience: [
    {
      role: "Full-stack Developer",
      company: "Dignizant Technologies",
      location: "Kerala, India",
      period: "2024 — Present",
      highlights: [
        "Build and ship full-stack web applications end to end, from API and database design to React/Next.js front ends.",
        "Work across the TypeScript ecosystem — Next.js, Node.js, MongoDB and PostgreSQL — delivering client and internal products.",
        "Own features through the full cycle: design, implementation, review and deployment.",
      ],
    },
    {
      role: "MERN Stack Developer (Training & Projects)",
      company: "KINFRA Industrial Park · BROTOTYPE",
      location: "Kozhikode, Kerala",
      period: "2022 — 2024",
      highlights: [
        "Completed an intensive mentored program covering front-end, back-end and full-stack development.",
        "Built multiple full-stack projects with the MERN stack (MongoDB, Express, React, Node.js).",
        "Grew from self-taught fundamentals to shipping complete, deployed applications.",
      ],
    },
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
