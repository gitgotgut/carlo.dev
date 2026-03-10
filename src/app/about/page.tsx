"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Python", "PostgreSQL", "REST APIs"],
  Tools: ["Git", "Docker", "VS Code", "Linux"],
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-20"
        >
          {/* Hero Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
                About Me
              </h1>
              <Separator className="w-12 bg-primary" />
            </div>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              I&apos;m a passionate full-stack developer with over 5 years of experience building
              modern web applications. I specialize in creating performant, user-friendly
              interfaces with a focus on clean, maintainable code. When I&apos;m not coding, you can
              find me contributing to open source projects or sharing knowledge with the
              developer community.
            </p>
          </motion.section>

          {/* Skills Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Skills & Expertise</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(skills).map(([category, items]) => (
                <Card key={category} className="border border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <Card
                  key={index}
                  className="border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md dark:hover:shadow-zinc-900"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{exp.role}</CardTitle>
                        <CardDescription>{exp.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {exp.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Get In Touch</h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              I&apos;m always interested in hearing about new opportunities and interesting projects.
              Feel free to reach out via email or connect with me on social media.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <Card className="border border-zinc-200 dark:border-zinc-800">
                <CardContent className="pt-6">
                  <a
                    href="mailto:hello@carlo.dev"
                    className="inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    <Mail className="h-5 w-5" />
                    <span>hello@carlo.dev</span>
                  </a>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-base">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200 bg-white transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5 text-black dark:text-white" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200 bg-white transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-black dark:text-white" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200 bg-white transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5 text-black dark:text-white" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  )
}
