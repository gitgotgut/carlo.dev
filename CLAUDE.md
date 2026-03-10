# CLAUDE.md — carlo.dev

## Project
Personal portfolio & blog website for Carlo.

## Tech Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui + 21st.dev registry
- **Animations:** Framer Motion
- **Blog:** next-mdx-remote + gray-matter + reading-time (MDX files in `content/posts/`)
- **Deployment:** GitHub

## Commands
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint
npx tsc --noEmit   # Type check
```

## Project Structure
```
src/app/              # App Router pages
src/components/ui/    # shadcn/ui + 21st.dev components
src/components/       # Custom components (nav, footer, etc.)
src/lib/              # Utilities (mdx.ts, projects.ts)
content/posts/        # MDX blog posts (frontmatter: title, date, description, tags)
public/images/        # Static assets
```

## Conventions
- Use `@/*` import alias for `src/`
- Components: PascalCase filenames, named exports
- Pages: default exports
- Conventional commits (feat:, fix:, chore:, docs:)
- Feature branches → PRs to main
- All new code must pass `npm run lint && npx tsc --noEmit`

## Style Rules
- Tailwind utility classes, avoid custom CSS
- Use shadcn/ui primitives before building custom components
- Dark mode via `next-themes` + Tailwind `dark:` variant
- Responsive-first: mobile → tablet → desktop
- Animations via Framer Motion, keep subtle and performant
