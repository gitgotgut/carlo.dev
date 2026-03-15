import { notFound } from "next/navigation"
import { getCaseStudyBySlug, getCaseStudyProjects } from "@/lib/projects"
import { CaseStudyDetail } from "./case-study-detail"

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getCaseStudyBySlug(slug)

  if (!project) {
    return { title: "Case Study Not Found" }
  }

  return {
    title: `${project.title} Case Study | Carlo`,
    description: project.caseStudy?.problem,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getCaseStudyBySlug(slug)

  if (!project) {
    notFound()
  }

  return <CaseStudyDetail project={project} />
}
