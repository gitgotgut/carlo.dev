"use client"

import { ExternalLink, Github } from "lucide-react"

import type { Project } from "@/lib/projects"
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "@/components/ui/border-beam"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
        <BorderBeam size={60} duration={8} colorFrom="#00FFF1" colorTo="#9c40ff" />

        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {(project.github || project.live) && (
          <div className="mt-4 flex gap-3 border-t border-border pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
              >
                <Github className="size-4" />
                Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
              >
                <ExternalLink className="size-4" />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
