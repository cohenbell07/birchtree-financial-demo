import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  content: string
  status?: string // "draft" or "published"
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPosts = fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug: data.slug || fileName.replace(/\.mdx$/, ""),
          title: data.title || "Untitled",
          description: data.description || "",
          publishedAt: data.publishedAt || new Date().toISOString(),
          tags: data.tags || [],
          content,
          status: data.status || "published",
        }
      })
      .filter((post) => {
        // Only show published posts on public blog page
        // Drafts are only visible in admin
        return post.status !== "draft"
      })
      .sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })

    return allPosts
  } catch (error) {
    console.warn("[Blog] Error reading posts directory:", error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return null
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.find((name) => {
      if (!name.endsWith(".mdx")) return false
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)
      return (data.slug || name.replace(/\.mdx$/, "")) === slug
    })

    if (!fileName) {
      return null
    }

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: data.slug || fileName.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      description: data.description || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      tags: data.tags || [],
      content,
      status: data.status || "published",
    }
  } catch (error) {
    console.warn(`[Blog] Error reading post ${slug}:`, error)
    return null
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

