import { getAllPosts } from "@/lib/mdx"
import { LogCards } from "./log-cards"
import { LogHero } from "./log-hero"

export const metadata = {
  title: "Log | Carlo",
  description: "Tracking what I learn, build, and think about.",
}

export default function LogPage() {
  const posts = getAllPosts()

  return (
    <div className="flex flex-col">
      <LogHero />
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No entries yet. Check back soon!</p>
        ) : (
          <LogCards posts={posts} />
        )}
      </section>
    </div>
  )
}
