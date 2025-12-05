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

