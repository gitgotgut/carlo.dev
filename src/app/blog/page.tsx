import { getAllPosts } from "@/lib/mdx"
import { BlogCards } from "./blog-cards"

export const metadata = {
  title: "Blog",
  description: "Thoughts on development, design, and building things for the web.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on development, design, and building things for the web.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <BlogCards posts={posts} />
      )}
    </main>
  )
}
