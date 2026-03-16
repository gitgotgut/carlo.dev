"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion"
import type { MotionValue } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { AuroraText } from "@/components/ui/aurora-text"
import { MorphingText } from "@/components/ui/morphing-text"
import { TextReveal } from "@/components/ui/text-reveal"
import { MagicCard } from "@/components/ui/magic-card"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import { projects } from "@/lib/projects"

interface LatestPost {
  title: string
  description: string
  date: string
  slug: string
}

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

/* ── Floating blob that moves on scroll ── */
function FloatingBlob({
  className,
  scrollProgress,
  yRange,
  xRange,
}: {
  className: string
  scrollProgress: MotionValue<number>
  yRange: [number, number]
  xRange: [number, number]
}) {
  const y = useTransform(scrollProgress, [0, 1], yRange)
  const x = useTransform(scrollProgress, [0, 1], xRange)
  return (
    <motion.div
      style={{ y, x }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  )
}

/* ── Card with subtle 3D tilt on hover ── */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  })

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
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

export function LandingContent({
  latestPosts,
}: {
  latestPosts: LatestPost[]
}) {
  /* ── Full-page scroll progress for blob movement ── */
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  })

  /* ── Hero-specific scroll for parallax fade-out ── */
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])
  const heroY = useTransform(heroScroll, [0, 1], [0, 150])

  return (
    <div ref={pageRef} className="relative flex flex-col overflow-x-clip">
      {/* ── Floating gradient blobs that travel with scroll ── */}
      <FloatingBlob
        scrollProgress={scrollYProgress}
        yRange={[-100, 600]}
        xRange={[0, 120]}
        className="left-[-10%] top-[5%] h-[500px] w-[500px] bg-purple-500/20 dark:bg-purple-500/10"
      />
      <FloatingBlob
        scrollProgress={scrollYProgress}
        yRange={[0, 900]}
        xRange={[0, -80]}
        className="right-[-8%] top-[15%] h-[400px] w-[400px] bg-blue-400/20 dark:bg-blue-400/10"
      />
      <FloatingBlob
        scrollProgress={scrollYProgress}
        yRange={[200, 1200]}
        xRange={[-40, 60]}
        className="left-[10%] top-[40%] h-[350px] w-[350px] bg-rose-400/15 dark:bg-rose-400/8"
      />
      <FloatingBlob
        scrollProgress={scrollYProgress}
        yRange={[100, 1400]}
        xRange={[50, -100]}
        className="right-[5%] top-[60%] h-[300px] w-[300px] bg-amber-300/15 dark:bg-amber-300/8"
      />

      {/* ══════════════════════════════════════════════
          HERO — Full viewport, parallax fade-out
          ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100vh] flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-3xl"
        >
          <BlurFade delay={0.1} duration={0.7}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <AuroraText
                colors={["#7c3aed", "#3b82f6", "#ec4899", "#f59e0b"]}
                speed={1}
                className="text-5xl font-bold sm:text-6xl lg:text-7xl"
              >
                Carlo
              </AuroraText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4} duration={0.7}>
            <div className="mt-8">
              <MorphingText
                texts={[
                  "Design thinker.",
                  "IT strategist.",
                  "Problem solver.",
                  "Builder.",
                ]}
                className="text-muted-foreground"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.8} duration={0.7}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:scale-105 hover:shadow-xl"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-all hover:bg-muted hover:scale-105"
              >
                About Me
              </Link>
            </div>
          </BlurFade>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(heroScroll, [0, 0.15], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
            className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1"
          >
            <motion.div className="mx-auto h-2 w-1 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          SCROLL TEXT REVEAL — Statement section
          ══════════════════════════════════════════════ */}
      <section className="relative z-10">
        <TextReveal>
          I bridge business problems and technical solutions through design — building tools that solve real problems for real teams.
        </TextReveal>
      </section>

      {/* ══════════════════════════════════════════════
          VELOCITY SCROLL — Kinetic divider
          ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-12 opacity-[0.08]">
        <ScrollVelocityContainer>
          <ScrollVelocityRow
            baseVelocity={2}
            className="text-7xl font-bold tracking-tight sm:text-8xl"
          >
            <span className="mx-4">Projects &middot; Design &middot; Code &middot;</span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PROJECTS — MagicCard with tilt
          ══════════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-3 text-muted-foreground">
              A selection of things I&apos;ve been working on.
            </p>
          </div>
        </BlurFade>

        <div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {featuredProjects.map((project, i) => (
            <BlurFade
              key={project.title}
              inView
              inViewMargin="-50px"
              delay={i * 0.12}
            >
              <TiltCard>
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <MagicCard
                    className="h-full cursor-pointer rounded-2xl border border-border/50 p-6"
                    gradientSize={250}
                    gradientFrom="#7c3aed"
                    gradientTo="#3b82f6"
                    gradientOpacity={0.15}
                  >
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </MagicCard>
                </Link>
              </TiltCard>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </section>

      {/* ══════════════════════════════════════════════
          LATEST LOG ENTRIES
          ══════════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <BlurFade inView inViewMargin="-100px" delay={0}>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Latest Log Entries
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tracking what I learn, build, and think about.
              </p>
            </div>
          </BlurFade>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, i) => (
              <BlurFade
                key={post.slug}
                inView
                inViewMargin="-50px"
                delay={i * 0.12}
              >
                <Link href={`/log/${post.slug}`}>
                  <MagicCard
                    className="h-full cursor-pointer rounded-2xl border border-border/50 p-6"
                    gradientSize={200}
                    gradientFrom="#ec4899"
                    gradientTo="#f59e0b"
                    gradientOpacity={0.12}
                  >
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </MagicCard>
                </Link>
              </BlurFade>
            ))}
          </div>

          <BlurFade inView delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                href="/log"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Read the log
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </BlurFade>
        </section>
      )}
    </div>
  )
}
