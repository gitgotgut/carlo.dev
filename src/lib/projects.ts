export interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
  github?: string
  live?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: "carlo.dev",
    description:
      "This portfolio site — built with Next.js 16, Tailwind CSS v4, and sci-fi themed animations powered by MagicUI. Fully open source.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/gitgotgut/carlo.dev",
    featured: true,
  },
  {
    title: "Synapse Analytics",
    description:
      "A real-time analytics dashboard for tracking user engagement metrics, built with streaming data pipelines and interactive visualizations.",
    tags: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    featured: true,
  },
  {
    title: "Lingua",
    description:
      "AI-powered language learning platform that generates personalized lesson plans and provides real-time pronunciation feedback.",
    tags: ["React", "Python", "AI/ML", "FastAPI"],
    featured: true,
  },
  {
    title: "Nimbus Deploy",
    description:
      "A lightweight CLI and web interface for deploying containerized applications to multiple cloud providers with zero-downtime rollouts.",
    tags: ["Node.js", "TypeScript", "Docker", "AWS"],
  },
  {
    title: "Mosaic",
    description:
      "Collaborative mood board and design asset organizer with drag-and-drop canvas, tagging, and team sharing capabilities.",
    tags: ["React", "TypeScript", "Supabase"],
  },
  {
    title: "Vertex",
    description:
      "Graph-based knowledge management tool that maps relationships between notes, documents, and bookmarks using force-directed layouts.",
    tags: ["Next.js", "TypeScript", "Neo4j"],
  },
  {
    title: "Pulse Monitor",
    description:
      "Open-source uptime monitoring service with incident management, status pages, and multi-channel alerting integrations.",
    tags: ["Node.js", "React", "Redis", "WebSockets"],
  },
]
