import { getCaseStudyProjects } from "@/lib/projects"
import { CaseStudiesContent } from "./case-studies-content"

export const metadata = {
  title: "Case Studies | Carlo",
  description: "Deep dives into the problems I've solved and how I approached them.",
}

export default function CaseStudiesPage() {
  const projects = getCaseStudyProjects()

  return <CaseStudiesContent projects={projects} />
}
