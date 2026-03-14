import { projects } from "@/lib/projects"
import { getContributionData } from "@/lib/github"
import { ProjectsContent } from "./projects-content"

export const revalidate = 86400 // Revalidate contribution data daily

export default async function ProjectsPage() {
  const contributionData = await getContributionData()

  return (
    <ProjectsContent
      projects={projects}
      contributionDays={contributionData.days}
      totalContributions={contributionData.totalContributions}
    />
  )
}
