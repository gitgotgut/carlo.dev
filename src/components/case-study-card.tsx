"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "@/components/ui/border-beam"
import { BlurFade } from "@/components/ui/blur-fade"
import type { Project } from "@/lib/projects"
import { ArrowRight } from "lucide-react"

interface CaseStudyCardProps {
  project: Project
  index: number
}

export function CaseStudyCard({ project, index }: CaseStudyCardProps) {
  if (!project.caseStudy) return null

  const problemTeaser =
    project.caseStudy.problem.substring(0, 120) +
    (project.caseStudy.problem.length > 120 ? "..." : "")

  return (
    <BlurFade inView inViewMargin="-50px" delay={index * 0.1}>
      <Link href={`/case-studies/${project.slug}`}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
          <BorderBeam size={60} duration={8} colorFrom="#00FFF1" colorTo="#9c40ff" />

          <div className="relative z-10">
            {/* Title + Badge */}
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="flex-1 text-lg font-semibold">{project.title}</h3>
              <Badge
                variant="outline"
                className="whitespace-nowrap text-xs"
              >
                Case Study
              </Badge>
            </div>

            {/* Problem Teaser */}
            <div className="mb-4 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                The Problem
              </p>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {problemTeaser}
              </p>
            </div>

            {/* Metrics (if present) */}
            {project.caseStudy.metrics && project.caseStudy.metrics.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.caseStudy.metrics.map((metric) => (
                  <span
                    key={metric.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/50 px-2 py-1 text-xs"
                  >
                    <span className="font-mono font-semibold text-cyan-400">
                      {metric.value}
                    </span>
                    <span className="text-muted-foreground">{metric.label}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Divider & CTA */}
            <div className="border-t border-border pt-4">
              <div className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-cyan-400">
                Read Case Study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </BlurFade>
  )
}
