"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { RetroGrid } from "@/components/ui/retro-grid"
import { HyperText } from "@/components/ui/hyper-text"
import { CaseStudyCard } from "@/components/case-study-card"
import type { Project } from "@/lib/projects"

interface CaseStudiesContentProps {
  projects: Project[]
}

export function CaseStudiesContent({ projects }: CaseStudiesContentProps) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[40vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <RetroGrid
          className="opacity-20"
          angle={65}
          cellSize={60}
          darkLineColor="rgba(0,255,241,0.12)"
          lightLineColor="rgba(100,100,100,0.1)"
        />
        <Particles
          className="absolute inset-0"
          quantity={25}
          staticity={30}
          ease={80}
          color="#00FFF1"
          size={0.4}
        />

        <div className="relative z-10 max-w-2xl">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              <HyperText
                as="span"
                duration={1200}
                className="inline bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
                animateOnHover
              >
                Case Studies
              </HyperText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} duration={0.6}>
            <p className="mt-4 text-lg text-muted-foreground">
              Deep dives into the problems I&apos;ve solved — what was broken, how I
              approached it, and what changed.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No case studies yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <CaseStudyCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
