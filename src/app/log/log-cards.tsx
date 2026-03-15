"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "@/components/ui/border-beam"
import { BlurFade } from "@/components/ui/blur-fade"
import type { Post } from "@/lib/mdx"

export function LogCards({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6">
      {posts.map((post, index) => (
        <BlurFade key={post.slug} inView inViewMargin="-50px" delay={index * 0.1}>
          <Link href={`/log/${post.slug}`}>
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
              <BorderBeam size={80} duration={8} colorFrom="#00FFF1" colorTo="#9c40ff" />
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  )
}
