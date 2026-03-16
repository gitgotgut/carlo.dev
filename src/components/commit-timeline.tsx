"use client"

import type { RepoCommit } from "@/lib/github"

interface CommitTimelineProps {
  commits: RepoCommit[]
}

export function CommitTimeline({ commits }: CommitTimelineProps) {
  return (
    <div className="space-y-3">
      {commits.map((commit, index) => (
        <div key={index} className="flex gap-3 text-sm">
          <div className="flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
            {index < commits.length - 1 && (
              <div className="h-6 w-0.5 bg-border" />
            )}
          </div>
          <div className="flex-1 pb-3">
            <time className="text-xs text-muted-foreground">
              {new Date(commit.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <p className="mt-1 text-muted-foreground">{commit.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
