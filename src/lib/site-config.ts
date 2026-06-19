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
  education: [
    {
      qualification: "12th Standard · Junior Software Developer",
      school: "Vocational Higher Secondary, Chirakkara",
      location: "Thalassery, Kannur",
      period: "2020 — 2022",
      note: "Vocational track that introduced me to software development and set me on the path to becoming a full-stack developer.",
    },
  ],
  projects: [
    {
      name: "Matchday",
      description:
        "A football World Cup companion app — fixtures, teams and match data in a fast, modern interface.",
      tech: ["TypeScript", "Next.js", "React"],
      repo: "https://github.com/Ashik234/Matchday",
      live: "https://matchday-worldcup.vercel.app",
    },
    {
      name: "DEVNET",
      description:
        "A full-stack platform for developers to connect, learn and collaborate, with profiles, posts and discussions.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      repo: "https://github.com/Ashik234/DEVNET-FRONTEND",
      live: "https://devnetapp.vercel.app",
    },
    {
      name: "Gaming Deck",
      description:
        "An e-commerce platform for gaming accessories with secure payments and advanced search and filtering.",
      tech: ["JavaScript", "React", "Node.js"],
      repo: "https://github.com/Ashik234/Gaming-Deck",
      live: "https://gaming-deck.onrender.com",
    },
    {
      name: "InnoByte Services",
      description:
        "A client web application built and deployed end to end, from front end to API.",
      tech: ["JavaScript", "React", "Node.js"],
      repo: "https://github.com/Ashik234/InnoByte-Services-Client",
      live: "https://inno-byte-services-client.vercel.app",
    },
  ],
  available: true,
  availabilityText: "Available for work",
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
  socials: {
    github: "https://github.com/Ashik234",
    linkedin: "https://www.linkedin.com/in/ashiik",
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
