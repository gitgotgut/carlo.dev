"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

import type { Project } from "@/lib/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col shadow-sm transition-shadow duration-300 hover:shadow-lg">
        {project.image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              {project.title}
            </div>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        {(project.github || project.live) && (
          <CardFooter className="gap-2">
            {project.github && (
              <Button variant="outline" size="sm" render={<a href={project.github} target="_blank" rel="noopener noreferrer" />}>
                <Github className="size-4" />
                GitHub
              </Button>
            )}
            {project.live && (
              <Button variant="outline" size="sm" render={<a href={project.live} target="_blank" rel="noopener noreferrer" />}>
                <ExternalLink className="size-4" />
                Live Demo
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}
