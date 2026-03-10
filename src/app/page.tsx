"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
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
        {/* Animated background */}
        <Particles
          className="absolute inset-0"
          quantity={80}
          staticity={30}
          ease={70}
          color="#888888"
          size={0.5}
        />
        <AnimatedGridPattern
          className="absolute inset-0 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-3xl"
        >
          {/* Word-by-word reveal heading */}
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="animate-gradient bg-gradient-to-r from-primary via-primary/60 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                  Carlo
                </span>
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} duration={0.6}>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Full-stack developer crafting modern web experiences.
              <br />
              I build things that are fast, accessible, and delightful to use.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} duration={0.6}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                View My Work{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium transition-all hover:bg-muted hover:shadow-md"
              >
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
          {featuredProjects.map((project, i) => (
            <BlurFade key={project.title} inView inViewMargin="-50px" delay={i * 0.15}>
              <TiltCard>
                <Card className="h-full border transition-all hover:shadow-xl hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{post.description}</p>
                  </CardContent>
                </Card>
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
