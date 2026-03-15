"use client"

import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { Particles } from "@/components/ui/particles"
import type { Project } from "@/lib/projects"

interface CaseStudyDetailProps {
  project: Project
}

function Section({
  title,
  children,
  delay,
}: {
  title: string
  children: React.ReactNode
  delay: number
}) {
  return (
    <BlurFade inView inViewMargin="-50px" delay={delay}>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
        <BorderBeam size={80} duration={8} colorFrom="#00FFF1" colorTo="#9c40ff" />
        <div className="relative z-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">{title}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </BlurFade>
  )
}

export function CaseStudyDetail({ project }: CaseStudyDetailProps) {
  if (!project.caseStudy) return null

  const { caseStudy } = project

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[35vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <Particles
          className="absolute inset-0"
          quantity={25}
          staticity={30}
          ease={80}
          color="#00FFF1"
          size={0.4}
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <BlurFade delay={0.1} duration={0.6}>
            <Link
              href="/case-studies"
              className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </BlurFade>

          <BlurFade delay={0.2} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} duration={0.6}>
            <p className="mt-4 text-lg text-muted-foreground">
              {project.description}
            </p>
          </BlurFade>

          {/* Links */}
          <BlurFade delay={0.4} duration={0.6}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                View Project Details
              </Link>
            </div>
          </BlurFade>

          {/* Tags */}
          <BlurFade delay={0.5} duration={0.6}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-4xl space-y-6 px-4 py-12">
        {/* Metrics Bar (if present) */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <BlurFade inView inViewMargin="-50px" delay={0}>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {caseStudy.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-border bg-card px-6 py-4 text-center"
                >
                  <p className="text-2xl font-bold text-cyan-400">{metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </BlurFade>
        )}

        {/* Problem Section */}
        <Section title="The Problem" delay={0.1}>
          <p>{caseStudy.problem}</p>
        </Section>

        {/* Approach Section */}
        <Section title="My Approach" delay={0.15}>
          <p>{caseStudy.approach}</p>
        </Section>

        {/* Outcome Section */}
        <Section title="Outcome & Impact" delay={0.2}>
          <p>{caseStudy.outcome}</p>
        </Section>

        {/* Role Section */}
        <Section title="My Role" delay={0.25}>
          <p>{caseStudy.role}</p>
        </Section>

        {/* Context (if present) */}
        {caseStudy.context && (
          <BlurFade inView inViewMargin="-50px" delay={0.3}>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-lg border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {caseStudy.context}
              </span>
            </div>
          </BlurFade>
        )}

        {/* Footer Links */}
        <BlurFade inView inViewMargin="-50px" delay={0.35}>
          <div className="border-t border-border pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <span className="font-medium">See the technical detail</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <span className="font-medium">View source on GitHub</span>
                  <Github className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </BlurFade>
      </section>
    </main>
  )
}
