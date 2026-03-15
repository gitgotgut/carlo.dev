"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { RetroGrid } from "@/components/ui/retro-grid"
import { HyperText } from "@/components/ui/hyper-text"

export function LogHero() {
  return (
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
              className="inline bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent text-5xl sm:text-6xl py-0"
              animateOnHover
            >
              Log
            </HyperText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} duration={0.6}>
          <p className="mt-4 text-lg text-muted-foreground">
            Tracking what I learn, build, and think about.
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
