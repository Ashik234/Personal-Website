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
      companyUrl: "https://dignizant.com/",
      location: "Surat, Gujarat",
      period: "2024 — Present",
      highlights: [
        "Build and ship full-stack web applications end to end, from API and database design to React/Next.js front ends.",
        "Work across the TypeScript ecosystem — Next.js, Node.js, MongoDB and PostgreSQL — delivering client and internal products.",
        "Own features through the full cycle: design, implementation, review and deployment.",
      ],
    },
    {
      role: "MERN Stack Developer (Training & Projects)",
      company: "Brototype",
      companyUrl: "http://brototype.com/",
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
      name: "Smart AI Test Suite (SAT)",
      description:
        "A unified CLI that uses AI agents to generate, run and auto-fix unit tests — analyzing code structure, dependencies and edge cases to produce ready-to-run tests in minutes.",
      tech: ["TypeScript", "Node.js", "Groq", "Llama 3.3", "Jest"],
      repo: "",
      live: "https://www.npmjs.com/package/smart-ai-terminal",
      terminal: true,
    },
    {
      name: "AshikNow",
      description:
        "A live personal stats hub — one terminal-styled page pulling live data from every platform I'm on: code, chess, typing, music, films and more, with journey pages and compare mode.",
      tech: ["TypeScript", "Next.js", "React", "Vercel"],
      repo: "https://github.com/Ashik234/AshikNow",
      live: "https://ashiknow.vercel.app",
    },
    {
      name: "Pause-ture",
      description:
        "A Windows break-reminder app that actually stops you — fullscreen countdown-gated popups for eye, posture, water and walk breaks, with idle detection and a ~4 MB Tauri installer.",
      tech: ["Rust", "Tauri", "TypeScript"],
      repo: "https://github.com/Ashik234/Pause-ture",
      live: "",
    },
    {
      name: "Matchday",
      description:
        "A football World Cup companion app — fixtures, teams and match data in a fast, modern interface.",
      tech: ["TypeScript", "Next.js", "React"],
      repo: "https://github.com/Ashik234/Matchday",
      live: "https://matchday-worldcup.vercel.app",
    },
  ],
  awards: [
    {
      title: "2nd Prize — Internal AI Hackathon",
      org: "Dignizant Technologies",
      date: "Jan 2026",
      note: "Won second prize as a team for building Smart AI Test Suite, an AI-powered automated unit-test generator.",
      image: "/awards/ai-hackathon.jpg",
      link: "",
    },
    {
      title: "Pioneer of Learning",
      org: "Dignizant Technologies",
      date: "Oct 2025",
      note: "Recognized during the company's 15th anniversary for continuous learning and contributing to a collaborative learning culture.",
      image: "/awards/pioneer-of-learning.jpg",
      link: "https://www.linkedin.com/posts/ashiik_continuouslearning-gratitude-dignizanttechnologies-activity-7382651863285915648-0df4",
    },
    {
      title: "Employee of the Quarter",
      org: "Dignizant Technologies",
      date: "Q1 2025 (Jan – Mar)",
      note: "Awarded for consistent contributions, teamwork and growth within the team.",
      image: "/awards/employee-of-the-quarter.jpg",
      link: "https://www.linkedin.com/posts/ashiik_feeling-truly-grateful-and-excited-to-be-activity-7326222893812514817-nZrT",
    },
  ],
  now: [
    "Learning Python",
    "Building Game Zone",
  ],
  available: true,
  availabilityText: "Available for work",
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
  socials: {
    github: "https://github.com/Ashik234",
    linkedin: "https://www.linkedin.com/in/ashiik",
    email: "ashikk.dev@gmail.com",
  },
  nav: [
    { label: "Ashik", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Connect", href: "#connect" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
