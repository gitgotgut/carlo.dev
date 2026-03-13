import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Carlo",
  description:
    "A collection of projects I have built — from developer tools and dashboards to AI-powered applications.",
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
