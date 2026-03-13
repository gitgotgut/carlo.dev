"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { RetroGrid } from "@/components/ui/retro-grid"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { HyperText } from "@/components/ui/hyper-text"
import { Terminal, AnimatedSpan, TypingAnimation as TerminalTyping } from "@/components/ui/terminal"

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Python", "PostgreSQL", "REST APIs"],
  Tools: ["Git", "Docker", "VS Code", "Linux"],
}

const skillColors: Record<string, { firstColor: string; secondColor: string }> = {
  Frontend: { firstColor: "#00FFF1", secondColor: "#9c40ff" },
  Backend: { firstColor: "#ff00aa", secondColor: "#00FFF1" },
  Tools: { firstColor: "#9c40ff", secondColor: "#ff00aa" },
}

const experience = [
  {
    year: "2023 - Present",
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description:
      "Led development of modern web applications using React and Next.js. Mentored junior developers and established best practices for the team.",
  },
  {
    year: "2021 - 2023",
    role: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    description:
      "Developed and maintained full-stack applications with Node.js backend and React frontend. Improved application performance by 40%.",
  },
  {
    year: "2019 - 2021",
    role: "Junior Developer",
    company: "Web Ventures",
    description:
      "Started career building responsive websites and learning modern web technologies. Collaborated with designers to implement pixel-perfect designs.",
  },
]

const socialLinks = [
  { href: "https://github.com/gitgotgut", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/carlo", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/carlo", label: "X", icon: Twitter },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with background */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <RetroGrid
          className="opacity-20"
          angle={65}
          cellSize={60}
          darkLineColor="rgba(0,255,241,0.12)"
          lightLineColor="rgba(100,100,100,0.1)"
        />
        <Particles
          className="absolute inset-0"
          quantity={30}
          staticity={30}
          ease={80}
          color="#00FFF1"
          size={0.4}
        />

        <div className="relative z-10 max-w-2xl">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              About{" "}
              <HyperText
                as="span"
                duration={1200}
                className="inline bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent text-5xl sm:text-6xl py-0"
                animateOnHover
              >
                Me
              </HyperText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} duration={0.6}>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I&apos;m a passionate full-stack developer with over 5 years of experience building
              modern web applications. I specialize in creating performant, user-friendly
              interfaces with a focus on clean, maintainable code.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Skills & Expertise
          </h2>
        </BlurFade>

        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(skills).map(([category, items], i) => (
            <BlurFade key={category} inView inViewMargin="-50px" delay={i * 0.15}>
              <NeonGradientCard
                borderSize={1}
                borderRadius={16}
                neonColors={skillColors[category]}
              >
                <h3 className="text-lg font-semibold">{category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </NeonGradientCard>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Terminal Section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            System Info
          </h2>
        </BlurFade>

        <BlurFade inView inViewMargin="-50px" delay={0.15}>
          <div className="mx-auto max-w-xl">
            <Terminal>
              <TerminalTyping>&gt; carlo --version</TerminalTyping>
              <AnimatedSpan delay={600} className="text-green-500">
                <span>carlo.dev v2.0.0</span>
              </AnimatedSpan>
              <TerminalTyping delay={1200}>&gt; carlo --stack</TerminalTyping>
              <AnimatedSpan delay={1800} className="text-cyan-400">
                <span>  Frontend : React, Next.js, TypeScript, Tailwind</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2100} className="text-cyan-400">
                <span>  Backend  : Node.js, Python, PostgreSQL, REST</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2400} className="text-cyan-400">
                <span>  Tools    : Git, Docker, VS Code, Linux</span>
              </AnimatedSpan>
              <TerminalTyping delay={3000}>&gt; carlo --status</TerminalTyping>
              <AnimatedSpan delay={3600} className="text-green-500">
                <span>  Status: Available for new projects</span>
              </AnimatedSpan>
            </Terminal>
          </div>
        </BlurFade>
      </section>

      {/* Experience Section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Experience
          </h2>
        </BlurFade>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <BlurFade key={index} inView inViewMargin="-50px" delay={index * 0.1}>
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
                <BorderBeam size={80} duration={8} colorFrom="#00FFF1" colorTo="#9c40ff" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0 border-cyan-500/30 text-cyan-400">
                    {exp.year}
                  </Badge>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <BlurFade inView inViewMargin="-100px" delay={0}>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
            I&apos;m always interested in hearing about new opportunities and interesting projects.
          </p>
        </BlurFade>

        <BlurFade inView inViewMargin="-50px" delay={0.15}>
          <div className="mx-auto max-w-md space-y-6">
            {/* Email CTA */}
            <a
              href="mailto:hello@carlo.dev"
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-4 text-primary-foreground transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <BorderBeam size={40} duration={4} colorFrom="#00FFF1" colorTo="#ff00aa" />
              <Mail className="h-5 w-5" />
              <span className="font-medium">hello@carlo.dev</span>
            </a>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  )
}
