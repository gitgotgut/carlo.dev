import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Carlo",
  description:
    "Full-stack developer specializing in React, Next.js, and TypeScript. Learn about my skills, experience, and what I bring to the table.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
