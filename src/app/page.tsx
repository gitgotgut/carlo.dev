import { getAllPosts } from "@/lib/mdx"
import { LandingContent } from "./landing-content"

export default function Home() {
  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 3).map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    slug: post.slug,
  }))

  return <LandingContent latestPosts={latestPosts} />
}
