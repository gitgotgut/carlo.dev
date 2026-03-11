"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { RetroGrid } from "@/components/ui/retro-grid"
import { HyperText } from "@/components/ui/hyper-text"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Meteors } from "@/components/ui/meteors"
import { projects } from "@/lib/projects"

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center"
      >
        {/* Layered sci-fi background */}
        <RetroGrid
          className="opacity-40"
          angle={65}
          cellSize={60}
          darkLineColor="rgba(0,255,241,0.15)"
          lightLineColor="rgba(100,100,100,0.15)"
        />
        <Particles
          className="absolute inset-0"
          quantity={60}
          staticity={20}
          ease={80}
          color="#00FFF1"
          size={0.4}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Meteors number={12} minDuration={4} maxDuration={12} />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-3xl"
        >
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <HyperText
                as="span"
                duration={1200}
                className="inline bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-7xl py-0"
                animateOnHover
              >
                Carlo
              </HyperText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4} duration={0.6}>
            <div className="mt-6 text-lg text-muted-foreground sm:text-xl">
              <TypingAnimation
                as="p"
                words={[
                  "Full-stack developer crafting modern web experiences.",
                  "I build things that are fast, accessible, and delightful.",
                  "Turning ideas into performant, elegant code.",
                ]}
                duration={40}
                deleteSpeed={20}
                pauseDelay={2000}
                loop
                className="text-lg text-muted-foreground sm:text-xl leading-normal"
                cursorStyle="block"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.7} duration={0.6}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <BorderBeam size={40} duration={4} colorFrom="#00FFF1" colorTo="#ff00aa" />
                View My Work{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-border px-6 py-3 text-sm font-medium transition-all hover:bg-muted hover:shadow-md"
              >
                <BorderBeam size={40} duration={6} delay={2} colorFrom="#ff00aa" colorTo="#00FFF1" />
                About Me
              </Link>
            </div>
          </BlurFade>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-3 text-muted-foreground">
              A selection of things I&apos;ve been working on.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
          {featuredProjects.map((project, i) => (
            <BlurFade key={project.title} inView inViewMargin="-50px" delay={i * 0.15}>
              <TiltCard>
                <NeonGradientCard
                  borderSize={1}
                  borderRadius={16}
                  neonColors={{
                    firstColor: i === 0 ? "#00FFF1" : i === 1 ? "#ff00aa" : "#9c40ff",
                    secondColor: i === 0 ? "#9c40ff" : i === 1 ? "#00FFF1" : "#ff00aa",
                  }}
                >
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </NeonGradientCard>
              </TiltCard>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </section>

      {/* Latest Blog Posts */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Posts
            </h2>
            <p className="mt-3 text-muted-foreground">
              Thoughts on code, design, and everything in between.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Hello World",
              description: "Welcome to my blog — my first post about getting started.",
              date: "2024-12-01",
              slug: "hello-world",
            },
          ].map((post, i) => (
            <BlurFade key={post.slug} inView inViewMargin="-50px" delay={i * 0.15}>
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                  <BorderBeam size={60} duration={8} colorFrom="#00FFF1" colorTo="#9c40ff" />
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{post.date}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{post.description}</p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the blog{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </section>
    </div>
  )
}
