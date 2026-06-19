export const siteConfig = {
  name: "Ashik",
  role: "Full-stack developer",
  bio: "Full-stack developer focused on the front end. I build web interfaces with React and Next.js.",
  about:
    "I'm a full-stack developer based in Kannur, Kerala, currently working at Dignizant Technologies. I work mostly on the front end — building interfaces with React, Next.js and TypeScript — and also handle the back end with Node.js and databases when needed. I started self-taught with the MERN stack and have shipped real products since.",
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
  ],
  awards: [
    {
      title: "Pioneer of Learning",
      org: "Dignizant Technologies",
      date: "Oct 2025",
      note: "Recognized during the company's 15th anniversary for continuous learning and contributing to a collaborative learning culture.",
    },
    {
      title: "Employee of the Quarter",
      org: "Dignizant Technologies",
      date: "May 2025",
      note: "Awarded for consistent contributions, teamwork and growth within the team.",
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
