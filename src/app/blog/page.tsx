import { getAllPosts } from "@/lib/mdx"
import { BlogCards } from "./blog-cards"
import { BlogHero } from "./blog-hero"

export const metadata = {
  title: "Blog | Carlo",
  description: "Thoughts on development, design, and building things for the web.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="flex flex-col">
      <BlogHero />
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <BlogCards posts={posts} />
        )}
      </section>
    </div>
  )
}
