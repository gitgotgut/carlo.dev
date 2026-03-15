import { projects } from "@/lib/projects"
import { getContributionData } from "@/lib/github"
import { ProjectsContent } from "./projects-content"

export const revalidate = 3600 // Revalidate contribution data hourly

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
