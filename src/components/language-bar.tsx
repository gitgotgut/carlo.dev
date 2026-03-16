"use client"

import type { RepoLanguages } from "@/lib/github"

interface LanguageBarProps {
  languages: RepoLanguages
}

export function LanguageBar({ languages }: LanguageBarProps) {
  const total = Object.values(languages).reduce((sum, val) => sum + val, 0)
  const sorted = Object.entries(languages)
    .map(([lang, count]) => ({
      name: lang,
      count,
      percent: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count)

  const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-blue-400",
    Go: "bg-cyan-400",
    Rust: "bg-orange-600",
    Java: "bg-orange-500",
    C: "bg-slate-400",
    "C++": "bg-blue-600",
    HTML: "bg-orange-600",
    CSS: "bg-indigo-400",
    Markdown: "bg-stone-400",
    Shell: "bg-gray-600",
    default: "bg-purple-500",
  }

  return (
    <div className="space-y-3">
      <div className="flex h-3 gap-0.5 overflow-hidden rounded-full bg-border">
        {sorted.map((lang) => (
          <div
            key={lang.name}
            className={languageColors[lang.name] || languageColors.default}
            style={{ width: `${lang.percent}%` }}
            title={`${lang.name} ${lang.percent.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {sorted.map((lang) => (
          <div key={lang.name} className="text-xs">
            <span className="font-medium">{lang.name}</span>{" "}
            <span className="text-muted-foreground">
              {lang.percent.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
