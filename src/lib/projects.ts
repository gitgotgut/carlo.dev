export interface ThesisExperiment {
  id: number
  name: string
  description: string
  maedev: number
  rmsedev: number
  mae?: number
  rmse?: number
}

export interface ThesisData {
  title: string
  institution: string
  date: string
  researchQuestions: { id: string; question: string }[]
  pipeline: { step: string; detail: string }[]
  dataset: {
    name: string
    participants: number
    trainSize: number
    devSize: number
    testSize: number
    classDistribution: { label: string; pct: number }[]
  }
  experiments: ThesisExperiment[]
  keyFindings: string[]
  bestResult: {
    model: string
    mae: number
    rmse: number
    description: string
  }
}

export interface CaseStudy {
  problem: string
  approach: string
  outcome: string
  role: string
  metrics?: { label: string; value: string }[]
  context?: string
}

export interface Project {
  slug: string
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
  thesis?: ThesisData
  caseStudy?: CaseStudy
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((p) => p.caseStudy !== undefined)
}

export function getCaseStudyBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.caseStudy !== undefined)
}

export const projects: Project[] = [
  {
    slug: "e-daic-thesis",
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
    thesis: {
      title:
        "From Reproduction to Evaluation: A Language-Only Approach to Depression Detection Using Supervised Machine Learning",
      institution: "IT University of Copenhagen",
      date: "June 2025",
      researchQuestions: [
        {
          id: "RQ1",
          question:
            "To what extent can the pipeline proposed by Sadeghi et al. be reproduced using the E-DAIC dataset?",
        },
        {
          id: "RQ2",
          question:
            "Can the pipeline's predictive performance be improved by varying its components (e.g., prompting strategies, LLMs, transcript sources)?",
        },
        {
          id: "RQ3",
          question:
            "Which combination of regression model and logit source yields the best PHQ-8 prediction on the E-DAIC dataset?",
        },
        {
          id: "RQ4",
          question:
            "What new insights or limitations emerge from systematically evaluating these pipeline variations?",
        },
      ],
      pipeline: [
        { step: "Interview Audio", detail: "E-DAIC-WOZ clinical interviews" },
        { step: "Whisper ASR", detail: "Automatic speech-to-text transcription" },
        {
          step: "GPT Summarization",
          detail: "GPT-3.5-Turbo / GPT-4-Turbo feature extraction",
        },
        {
          step: "DepRoBERTa",
          detail: "Fine-tuned classification → logit features",
        },
        {
          step: "SVR Regression",
          detail: "Support Vector Regression → PHQ-8 score",
        },
      ],
      dataset: {
        name: "Extended DAIC-WOZ (E-DAIC)",
        participants: 275,
        trainSize: 163,
        devSize: 56,
        testSize: 56,
        classDistribution: [
          { label: "None (0–7)", pct: 63.0 },
          { label: "Moderate (7–13)", pct: 21.9 },
          { label: "Severe (14–24)", pct: 15.1 },
        ],
      },
      experiments: [
        {
          id: 1,
          name: "Baseline Reproduction",
          description: "Reproducing Sadeghi et al. pipeline with Polynomial SVR",
          maedev: 4.08,
          rmsedev: 5.30,
          mae: 5.07,
          rmse: 5.91,
        },
        {
          id: 2,
          name: "Feature & Kernel Benchmark",
          description:
            "Testing feature combinations (logits, embeddings) with Linear/Poly/RBF kernels",
          maedev: 3.64,
          rmsedev: 4.74,
        },
        {
          id: 3,
          name: "Original vs Whisper Transcripts",
          description:
            "Comparing manual transcripts against Whisper ASR transcripts",
          maedev: 3.52,
          rmsedev: 4.79,
          mae: 5.22,
          rmse: 5.62,
        },
        {
          id: 4,
          name: "Weighted Classification Loss",
          description:
            "Applying class weights to DepRoBERTa to address class imbalance",
          maedev: 4.12,
          rmsedev: 5.45,
        },
        {
          id: 5,
          name: "Chain-of-Thought Prompting",
          description:
            "Using CoT prompting for GPT summarization (MAE improved to 4.64 but p=0.15)",
          maedev: 3.76,
          rmsedev: 4.75,
          mae: 4.64,
          rmse: 5.71,
        },
        {
          id: 6,
          name: "GPT-4-Turbo Upgrade",
          description:
            "Replacing GPT-3.5-Turbo with GPT-4-Turbo for feature extraction",
          maedev: 3.53,
          rmsedev: 4.72,
          mae: 4.87,
          rmse: 5.62,
        },
        {
          id: 7,
          name: "Regression Model Benchmark",
          description:
            "Comparing SVR, Random Forest, Gradient Boosting, KNN, Bayesian Ridge",
          maedev: 3.71,
          rmsedev: 4.62,
          mae: 4.33,
          rmse: 5.42,
        },
      ],
      keyFindings: [
        "ALL models fail to detect Severe depression cases — 0% recall across every experiment, revealing a critical blind spot in language-only approaches.",
        "Bayesian Ridge + GPT-4-Turbo logits achieved the best result: MAE 4.33, RMSE 5.42 — a 14.6% improvement over the baseline.",
        "Chain-of-Thought prompting improved MAE to 4.64 but was not statistically significant (p=0.15).",
        "Whisper transcripts generalized better than original transcripts on the test set despite lower dev-set scores.",
        "Class weighting was ineffective — it worsened minority class performance rather than improving it.",
        "GPT-4-Turbo improved RMSE from 5.91 to 5.62 with Linear SVR, suggesting richer features help downstream regression.",
      ],
      bestResult: {
        model: "Bayesian Ridge + GPT-4-Turbo Logits",
        mae: 4.33,
        rmse: 5.42,
        description:
          "Combining Bayesian Ridge regression with GPT-4-Turbo logit features yielded the best PHQ-8 prediction, improving 14.6% over the Polynomial SVR baseline.",
      },
    },
    caseStudy: {
      problem:
        "Mental health screening is severely bottlenecked by clinical access — there aren't enough psychiatrists to assess everyone who needs screening. This thesis explored a specific research question: can language alone (interview transcripts + LLMs) reliably predict PHQ-8 depression severity scores, and which parts of an existing published pipeline actually matter?",
      approach:
        "Rather than proposing a novel architecture, I reproduced an existing published pipeline (Sadeghi et al.) as a verified baseline, then ran 7 controlled experiments that each isolate a single variable: prompting strategy, LLM choice, transcript source (Whisper vs manual), regression model, class weighting, and fine-tuning approach. Each experiment was isolated with its own models, features, and execution logic to prevent confounding.",
      outcome:
        "Identified that ALL models — regardless of configuration — fail to detect severe depression cases (0% recall), revealing a fundamental blind spot in language-only approaches to clinical screening. Best configuration (Bayesian Ridge + GPT-4-Turbo logits) achieved a 14.6% improvement over baseline (MAE 4.33, RMSE 5.42). Chain-of-Thought prompting improved MAE but was not statistically significant. Whisper transcripts generalized better than expert transcriptions on the test set.",
      role: "Solo researcher. Designed and implemented the full experiment framework in Python, reproduced the baseline from a published paper, ran all 7 experiments, analyzed results, and wrote the thesis. Advisors provided feedback on methodology; all implementation and analysis was mine.",
      metrics: [
        { label: "Experiments", value: "7" },
        { label: "Baseline improvement", value: "14.6%" },
        { label: "Dataset participants", value: "275" },
        { label: "Severe case recall", value: "0%" },
      ],
      context: "Solo research project · IT University of Copenhagen · 6 months",
    },
  },
  {
    slug: "devteam",
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
    caseStudy: {
      problem:
        "Most AI agent frameworks require API keys, cloud infrastructure, and opaque orchestration logic. For developers who want to use LLMs to simulate a dev team workflow but don't want vendor lock-in or hidden token costs, there was no portable, inspectable option. The problem is also conceptual: how do you structure multi-agent handoffs when you are the runtime?",
      approach:
        "Build a zero-dependency Python CLI (stdlib only) that structures a full dev team workflow into sequential, manually-executed prompt handoffs. Five roles (PM, Coordinator, Backend Dev, Frontend Dev, QA) each have templated prompts that reference previous agents' outputs. You copy prompts into Claude, paste the response back, and advance the stage. Approval gates are built in for sensitive operations. The constraint of stdlib-only forced clean architecture — no framework crutches.",
      outcome:
        "A working agent orchestration system used as the scaffold for Hugo (SubscriptionTracker) — a full-stack SaaS with 27 commits across 2 weeks. DevTeam's PM specs prevented scope creep; its QA prompts caught bugs that manual testing missed. The project demonstrated that the overhead of structured agent handoffs pays off in output quality, and that manual prompt execution is a feature (full visibility, easy course-correction) not a limitation.",
      role: "Sole designer and developer. Conceived the architecture, wrote all 5 agent prompt templates, built the CLI orchestration logic, and integrated the design workflow (Pencil export → design specs → agent context).",
      metrics: [
        { label: "Agent roles", value: "5" },
        { label: "Dependencies", value: "0" },
        { label: "Projects built with it", value: "1" },
      ],
      context: "Solo project · February 2025 · shipped as single complete system",
    },
  },
  {
    slug: "hugo-subscription-tracker",
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
    caseStudy: {
      problem:
        "People lose track of recurring subscriptions — across multiple currencies, email providers, and billing cycles. Existing tools either require manual data entry or don't handle multi-currency, household sharing, or insurance policies. The real problem: users don't know what they're paying for until the credit card statement arrives.",
      approach:
        "Full-stack Next.js SaaS built using DevTeam agent orchestration. PM specs defined scope before a line of code was written. Core bets: (1) AI inbox scanning using Claude Haiku to extract recurring charges from Gmail/Outlook, reducing onboarding friction to near-zero; (2) multi-currency with live exchange rates; (3) household sharing via JWT email invites. Rebranded mid-development (Subtrack → Hugo) after a design system decision to use Slate Blue + Terracotta.",
      outcome:
        "Full production-ready SaaS in a 2-week sprint: Gmail and Outlook OAuth integrations, AI subscription extraction with high enough accuracy to ship without a human review step, cancel calculator with direct links for ~80 services, insurance module with AI document analysis, full Danish i18n, Vercel Cron renewal alerts, and spending trend charts. 27 commits with a feature-per-commit cadence. Live proof-of-concept that DevTeam agent orchestration produces shippable code.",
      role: "Product owner, architect, and sole developer. Used DevTeam to scaffold specs and plans, then implemented everything: auth, database schema, two OAuth integrations, AI pipelines, i18n, design system, and deployment config.",
      metrics: [
        { label: "Commits", value: "27" },
        { label: "Sprint duration", value: "2 weeks" },
        { label: "Email providers integrated", value: "2" },
        { label: "Services with cancel links", value: "~80" },
      ],
      context: "Solo · Feb–Mar 2026 · AI-assisted with DevTeam orchestrator",
    },
  },
  {
    slug: "carlo-dev",
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
