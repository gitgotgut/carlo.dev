import { notFound } from "next/navigation"
import { projects, getProjectBySlug } from "@/lib/projects"
import { getRepoCommits, getRepoLanguages } from "@/lib/github"
import { ProjectDetail } from "./project-detail"

export const revalidate = 3600

// Map project slugs to GitHub repo names
const SLUG_TO_REPO: Record<string, string> = {
  "e-daic-thesis": "e-daic-thesis",
  devteam: "DevTeam",
  "hugo-subscription-tracker": "SubscriptionTracker",
  "carlo-dev": "carlo.dev",
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} | Carlo`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const repoName = SLUG_TO_REPO[slug]
  const [commits, languages] = await Promise.all([
    repoName ? getRepoCommits(repoName) : Promise.resolve([]),
    repoName ? getRepoLanguages(repoName) : Promise.resolve({}),
  ])

  return (
    <ProjectDetail
      project={project}
      commits={commits}
      languages={languages}
    />
  )
}
