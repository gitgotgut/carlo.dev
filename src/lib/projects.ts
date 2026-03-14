export interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
  github?: string
  live?: string
  featured?: boolean
  showcase?: {
    vision: string
    built: string
    learnings: string
    commitNarrative: string
    standout?: string
  }
}

export const projects: Project[] = [
  {
    title: "e-daic-thesis",
    description:
      "Master's thesis reproducing and extending a language-only depression detection pipeline using the E-DAIC-WOZ dataset — 7 controlled experiments across prompting strategies, LLMs, and regression models.",
    tags: ["Python", "Jupyter", "NLP", "Transformers", "scikit-learn"],
    github: "https://github.com/gitgotgut/e-daic-thesis",
    featured: true,
    showcase: {
      vision:
        "Mental health screening is bottlenecked by clinical access. This thesis explored whether language alone — interview transcripts processed by LLMs — can reliably predict depression severity (PHQ-8 scores), and which parts of the existing pipeline actually matter.",
      built:
        "A modular experiment framework with 7 controlled experiments: reproducing the Sadeghi et al. baseline, then systematically varying prompting strategy (Chain-of-Thought vs standard), LLM (GPT-3.5 vs GPT-4-Turbo), transcript source (Whisper vs manual), regression model (SVR, Random Forest, Gradient Boosting, KNN, Bayesian Ridge), fine-tuning strategy, and class imbalance handling. Each experiment is isolated with its own models, features, and execution logic.",
      learnings:
        "Reproducibility in ML research is harder than it sounds — small pipeline decisions (prompt wording, transcript quality) shift results significantly. Chain-of-Thought prompting didn't reliably outperform simpler approaches, which challenged initial assumptions. The biggest lesson: methodological rigor matters more than model sophistication.",
      commitNarrative:
        "The commit history shows a compressed development arc: initial commit in April 2025, then a burst of uploads in June 2025 as the thesis deadline approached — multiple rounds of restructuring the repo (deleting and re-uploading directories) suggest rapid iteration on organization and final results. This is a thesis project pattern: long local development, then a push to get everything into version control at the end.",
      standout:
        "Built 7 controlled experiments that each isolate a single variable in the pipeline, making it possible to attribute performance changes to specific decisions rather than confounding factors.",
    },
  },
  {
    title: "DevTeam",
    description:
      "A multi-agent orchestrator that simulates a virtual dev team (PM, Coordinator, Backend Dev, Frontend Dev, QA) using manual prompt-handoff — no API keys, no network calls, pure stdlib Python.",
    tags: ["Python", "AI Agents", "CLI", "Prompt Engineering"],
    github: "https://github.com/gitgotgut/DevTeam",
    featured: true,
    showcase: {
      vision:
        "Most AI agent frameworks require API keys, complex infrastructure, and opaque orchestration. DevTeam takes the opposite approach: a portable, zero-dependency agent pack where you are the runtime. It structures the workflow of a full dev team into sequential prompt handoffs that you manually run through Claude.",
      built:
        "A Python CLI (stdlib only) that orchestrates 5 agent roles: PM writes specs, Coordinator creates plans, Backend/Frontend Devs implement, QA tests. The system generates role-specific prompts from templates, and you copy them into Claude, paste the response back, and advance to the next stage. Includes approval gates for sensitive operations (auth, payments, schema migrations).",
      learnings:
        "The most useful AI tooling isn't always the most automated. Manual prompt-handoff gives you full control and visibility into each stage — you see exactly what the AI is working with and can course-correct before compounding errors. The constraint of 'stdlib only' forced clean architecture.",
      commitNarrative:
        "Single-commit project from February 2025 — the entire agent pack (CLI, prompts, templates, scripts) landed in one shot. This suggests the project was developed locally and pushed as a complete working system rather than built incrementally on GitHub.",
      standout:
        "The design workflow integration with Pencil (export designs → specs → tokens → agents reference them automatically) bridges the gap between visual design and AI-assisted development without any manual translation step.",
    },
  },
  {
    title: "Hugo (SubscriptionTracker)",
    description:
      "Full-stack subscription management SaaS — Gmail/Outlook AI import, multi-currency tracking, household sharing, insurance analysis, and spending insights. Built using the DevTeam agent-pack.",
    tags: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Claude API"],
    github: "https://github.com/gitgotgut/SubscriptionTracker",
    featured: true,
    showcase: {
      vision:
        "Subscription fatigue is a real problem — people lose track of what they're paying for, miss trial conversions, and can't easily see total recurring spend across currencies. Hugo was built to solve this with AI-powered automation: scan your inbox, extract subscriptions, and surface insights you wouldn't catch manually.",
      built:
        "A Next.js 14 app with Prisma/PostgreSQL, NextAuth v5, and a Tailwind + shadcn UI. Core features: subscription CRUD with history tracking, Gmail and Outlook OAuth integrations that scan 6 months of inbox and use Claude Haiku to extract recurring charges, multi-currency display with live exchange rates, household sharing via email invites (JWT + Resend), cancel calculator with direct cancellation links for ~80 services, insurance policy management with AI document analysis, spending trend charts, and email renewal alerts via Vercel Cron. Full i18n (English + Danish). Rebranded mid-development from Subtrack to Hugo with a Slate Blue + Terracotta design system.",
      learnings:
        "Building a product end-to-end with an AI agent-pack (DevTeam) revealed that the orchestration overhead is worth it — having PM specs before coding prevented scope creep, and QA prompts caught bugs that manual testing missed. On the technical side: OAuth token management across two email providers (Google + Microsoft) is the kind of plumbing that takes 3x longer than expected. The AI inbox scanning worked surprisingly well — Claude Haiku's extraction accuracy was high enough to ship without a human review step.",
      commitNarrative:
        "Intense 2-week sprint from Feb 25 to Mar 10, 2026 with 27 commits. Day 1: MVP scaffold with full CRUD, auth, multi-currency, household sharing, and 17 passing tests. Days 2-3: Gmail integration, feature landing pages, spending insights, trial alerts. Days 4-5: Outlook integration, FAQ/pricing/about pages, login redesign, brand rename to Hugo. Week 2: insurance module, AI document analysis, full Danish i18n, brand redesign (Proposal C), Confluence documentation, and CLAUDE.md conventions. The commit messages show a disciplined feature-per-commit cadence with co-authored Claude attribution throughout.",
      standout:
        "The project is a live proof-of-concept for the DevTeam agent-pack — it was scaffolded using that orchestrator, making it both a product and a case study of AI-assisted development. The Gmail/Outlook AI import pipeline (scan inbox → Claude extracts subscriptions → review modal → import) is the kind of feature that sounds simple but required careful OAuth, email parsing, and AI prompt engineering.",
    },
  },
  {
    title: "carlo.dev",
    description:
      "This portfolio site — built with Next.js, Tailwind CSS v4, and sci-fi themed MagicUI animations. Fully open source.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/gitgotgut/carlo.dev",
    featured: true,
    showcase: {
      vision:
        "A personal site that reflects how I actually think about building things: clean architecture, considered design, and willingness to experiment with interaction details. Not a template — built from scratch to serve as both portfolio and creative playground.",
      built:
        "Next.js App Router site with MDX blog system, shadcn/ui components, and a layered sci-fi visual treatment (RetroGrid, HyperText scramble, neon gradient cards, particle backgrounds). Server/client component split for data fetching + animations. Responsive, dark-mode-first.",
      learnings:
        "Animation density is a real design problem — the first pass had too many effects competing for attention (meteors, particles, grids, beams). The audit commit that toned things down was more valuable than the one that added them. Also: splitting server and client components in Next.js for data fetching + animation is a pattern worth standardizing.",
      commitNarrative:
        "Fast 3-day build: initial commit and full portfolio on day 1 (March 10), MagicUI animation layers on day 1-2, sci-fi theme refinement on day 2, then a production audit on day 3 that cleaned up placeholder content, added real links, and reduced visual noise. The trajectory shows build → embellish → edit down, which is a healthy creative process.",
      standout:
        "The production audit commit is the most interesting — it removed placeholder links, connected real data, and deliberately reduced animation density. The willingness to delete what you just built is underrated.",
    },
  },
]
