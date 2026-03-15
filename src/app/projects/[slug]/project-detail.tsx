"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, BookOpen } from "lucide-react"
import type { Project } from "@/lib/projects"
import type { RepoCommit, RepoLanguages } from "@/lib/github"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { BorderBeam } from "@/components/ui/border-beam"
import { CommitTimeline } from "@/components/commit-timeline"
import { LanguageBar } from "@/components/language-bar"
import {
  PipelineDiagram,
  ResearchQuestions,
  DatasetOverview,
  ExperimentResults,
  KeyFindings,
} from "@/components/thesis-sections"

interface ProjectDetailProps {
  project: Project
  commits: RepoCommit[]
  languages: RepoLanguages
}

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <BlurFade inView inViewMargin="-50px" delay={delay}>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8">
        <BorderBeam
          size={80}
          duration={12}
          colorFrom="#00FFF1"
          colorTo="#9c40ff"
        />
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {title}
        </h2>
        {children}
      </div>
    </BlurFade>
  )
}

export function ProjectDetail({
  project,
  commits,
  languages,
}: ProjectDetailProps) {
  const { showcase, thesis } = project

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[35vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <Particles
          className="absolute inset-0"
          quantity={20}
          staticity={30}
          ease={80}
          color="#00FFF1"
          size={0.4}
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <BlurFade delay={0.05} duration={0.5}>
            <Link
              href="/projects"
              className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </BlurFade>

          <BlurFade delay={0.1} duration={0.5}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} duration={0.5}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {project.description}
            </p>
          </BlurFade>

          <BlurFade delay={0.3} duration={0.5}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.caseStudy && (
                <Link
                  href={`/case-studies/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-fuchsia-400"
                >
                  <BookOpen className="h-4 w-4" />
                  Case Study
                </Link>
              )}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-12">
        {/* Language breakdown */}
        {Object.keys(languages).length > 0 && (
          <Section title="Language Breakdown" delay={0.05}>
            <LanguageBar languages={languages} />
          </Section>
        )}

        {/* Thesis-specific sections */}
        {thesis && (
          <>
            {/* Thesis header */}
            <BlurFade inView inViewMargin="-50px" delay={0.08}>
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                  Master&apos;s Thesis
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {thesis.institution} &middot; {thesis.date}
                </p>
              </div>
            </BlurFade>

            <Section title="Research Questions" delay={0.1}>
              <ResearchQuestions questions={thesis.researchQuestions} />
            </Section>

            <Section title="Pipeline Architecture" delay={0.15}>
              <PipelineDiagram pipeline={thesis.pipeline} />
            </Section>

            <Section title="Dataset" delay={0.2}>
              <DatasetOverview dataset={thesis.dataset} />
            </Section>

            <Section title="Experiment Results" delay={0.25}>
              <ExperimentResults
                experiments={thesis.experiments}
                bestResult={thesis.bestResult}
              />
            </Section>

            <Section title="Key Findings" delay={0.3}>
              <KeyFindings findings={thesis.keyFindings} />
            </Section>
          </>
        )}

        {/* Showcase sections */}
        {showcase && (
          <>
            <Section title="Vision" delay={0.1}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {showcase.vision}
              </p>
            </Section>

            <Section title="What I Built" delay={0.15}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {showcase.built}
              </p>
            </Section>

            <div className="grid gap-6 sm:grid-cols-2">
              <Section title="Key Learnings" delay={0.2}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {showcase.learnings}
                </p>
              </Section>

              {showcase.standout && (
                <Section title="Standout Detail" delay={0.25}>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {showcase.standout}
                  </p>
                </Section>
              )}
            </div>

            <Section title="Development Story" delay={0.3}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {showcase.commitNarrative}
              </p>
            </Section>
          </>
        )}

        {/* Commit timeline */}
        {commits.length > 0 && (
          <Section title={`Commit History (${commits.length} commits)`} delay={0.35}>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <CommitTimeline commits={commits} />
            </div>
          </Section>
        )}

        {/* Back link */}
        <BlurFade inView delay={0.4}>
          <div className="pt-4 text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all projects
            </Link>
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
