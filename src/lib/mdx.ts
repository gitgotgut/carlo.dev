import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
  content: string
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    return getPostBySlug(slug)
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags ?? [],
    readingTime: stats.text,
    content,
  }
}
