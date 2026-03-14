import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"

export const metadata = {
  title: "About Me | Carlo",
  description: "Backend and IT management experience meeting software design education.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <Particles
          className="absolute inset-0"
          quantity={20}
          staticity={30}
          ease={80}
          color="#00FFF1"
          size={0.4}
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <BlurFade delay={0.1} duration={0.5}>
            <Link
              href="/"
              className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </BlurFade>

          <BlurFade delay={0.15} duration={0.5}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} duration={0.5}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Building products that bridge business needs and technical excellence.
            </p>
          </BlurFade>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl space-y-12 px-4 py-12">
        <BlurFade inView inViewMargin="-50px" delay={0}>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Background</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                I started my career in business operations coordinating large-scale
                projects, analyzing partnerships with data-driven tools, managing workflows
                across finance and analytics. That foundation taught me how organizations
                actually work: how decisions get made, where friction lives, what metrics
                matter.
              </p>
              <p>
                In parallel, I pursued a formal education in{" "}
                <strong className="text-foreground">
                  software design and IT management
                </strong>
                . Not just coding, but the principles of designing systems that scale: how
                to think about requirements, how to structure development processes, how
                architecture decisions ripple through an organization.
              </p>
              <p>
                The combination matters. I can talk to a finance team about their invoice
                reconciliation pain points, understand the underlying system constraints,
                and design a solution that actually ships.
              </p>
            </div>
          </section>
        </BlurFade>

        <BlurFade inView inViewMargin="-50px" delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">What I Do</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                I manage IT projects and build products that solve real problems for
                existing teams. Current work: automating manual processes, integrating AI
                into workflows, aligning tech initiatives with business objectives.
              </p>
              <p>
                I also build for myself&mdash;tools that explore how business logic, software
                design, and AI can work together. Things like{" "}
                <Link
                  href="/projects/devteam"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  DevTeam
                </Link>{" "}
                and{" "}
                <Link
                  href="/projects/hugo-subscription-tracker"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Hugo
                </Link>
                . I value shipping fast, staying authentic, and learning from what gets
                used.
              </p>
            </div>
          </section>
        </BlurFade>

        <BlurFade inView inViewMargin="-50px" delay={0.1}>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Expertise</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card/50 p-4">
                <h3 className="font-semibold text-foreground">Management &amp; Strategy</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>IT project management</li>
                  <li>Business-technology alignment</li>
                  <li>Product roadmapping</li>
                  <li>Process optimization</li>
                  <li>Data analytics (SQL, Tableau)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card/50 p-4">
                <h3 className="font-semibold text-foreground">Software &amp; Design</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Full-stack development (Next.js, TypeScript)</li>
                  <li>System design &amp; architecture</li>
                  <li>Agile development practices</li>
                  <li>AI integration (Claude API, LLM orchestration)</li>
                  <li>User-focused design thinking</li>
                </ul>
              </div>
            </div>
          </section>
        </BlurFade>

        <BlurFade inView inViewMargin="-50px" delay={0.15}>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Philosophy</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Build for a real problem.</strong> Not
                every idea needs code. I think in terms of impact.
              </p>
              <p>
                <strong className="text-foreground">Stay authentic.</strong> No filler.
                Projects and writing should be genuine.
              </p>
              <p>
                <strong className="text-foreground">Rigor compounds.</strong> Whether
                it&apos;s a thesis or a production system, careful decisions matter. Shortcuts
                do too.
              </p>
            </div>
          </section>
        </BlurFade>

        <BlurFade inView inViewMargin="-50px" delay={0.2}>
          <section className="rounded-lg border border-border bg-card/50 p-6">
            <h2 className="text-2xl font-bold tracking-tight">Get in Touch</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="mailto:carlo@carlo.dev"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://github.com/gitgotgut"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/carl-oscar-wentzlau-martinsen/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all hover:bg-muted"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </section>
        </BlurFade>

        <BlurFade inView delay={0.25}>
          <div className="pt-4 text-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
