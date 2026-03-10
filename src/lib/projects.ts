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
    title: "Synapse Analytics",
    description:
      "A real-time analytics dashboard for tracking user engagement metrics, built with streaming data pipelines and interactive visualizations.",
    tags: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Lingua",
    description:
      "AI-powered language learning platform that generates personalized lesson plans and provides real-time pronunciation feedback.",
    tags: ["React", "Python", "AI/ML", "FastAPI"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Nimbus Deploy",
    description:
      "A lightweight CLI and web interface for deploying containerized applications to multiple cloud providers with zero-downtime rollouts.",
    tags: ["Node.js", "TypeScript", "Docker", "AWS"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Mosaic",
    description:
      "Collaborative mood board and design asset organizer with drag-and-drop canvas, tagging, and team sharing capabilities.",
    tags: ["React", "TypeScript", "Supabase"],
    github: "#",
    live: "#",
  },
  {
    title: "Vertex",
    description:
      "Graph-based knowledge management tool that maps relationships between notes, documents, and bookmarks using force-directed layouts.",
    tags: ["Next.js", "TypeScript", "Neo4j"],
    github: "#",
  },
  {
    title: "Pulse Monitor",
    description:
      "Open-source uptime monitoring service with incident management, status pages, and multi-channel alerting integrations.",
    tags: ["Node.js", "React", "Redis", "WebSockets"],
    github: "#",
    live: "#",
  },
]
