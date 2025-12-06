import { client } from "@/sanity/lib/client"

export interface Article {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: any
  excerpt?: string
  publishedAt: string
  category: {
    title: string
    slug: {
      current: string
    }
  }
  writer: {
    name: string
    slug: {
      current: string
    }
  }
}

const FEATURED_ARTICLES_QUERY = `*[_type == "article" && featured == true] | order(publishedAt desc) [0...20] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  category-> {
    title,
    slug
  },
  writer-> {
    name,
    slug
  }
}`

export async function getFeaturedArticles(): Promise<Article[]> {
  return await client.fetch<Article[]>(FEATURED_ARTICLES_QUERY)
}

const BREAKING_NEWS_QUERY = `*[_type == "article" && breakingNews == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt
}`

export interface BreakingNews {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
}

export async function getBreakingNews(): Promise<BreakingNews[]> {
  try {
    const result = await client.fetch<BreakingNews[]>(BREAKING_NEWS_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return []
  }
}

const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) [0...5] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  category-> {
    title,
    slug
  },
  writer-> {
    name,
    slug
  }
}`

export async function getArticles(): Promise<Article[]> {
  try {
    const result = await client.fetch<Article[]>(ARTICLES_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

