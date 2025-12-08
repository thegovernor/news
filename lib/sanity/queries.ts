import { client } from "@/sanity/lib/client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface Article {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImageSource
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

const ARTICLES_QUERY = `*[_type == "article" && category->title == "مقالات"] | order(publishedAt desc) [0...3] {
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

export interface Tweet {
  _id: string
  url: string
  order?: number
  isActive?: boolean
}

const TWEETS_QUERY = `*[_type == "tweet" && isActive == true] | order(order asc) {
  _id,
  url,
  order,
  isActive
}`

export async function getTweets(): Promise<Tweet[]> {
  try {
    const result = await client.fetch<Tweet[]>(TWEETS_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching tweets:", error)
    return []
  }
}

const POLITICAL_ANALYSIS_ARTICLES_QUERY = `*[_type == "article" && category->title == "تحليلات سياسية"] | order(publishedAt desc) {
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

export async function getPoliticalAnalysisArticles(): Promise<Article[]> {
  try {
    const result = await client.fetch<Article[]>(POLITICAL_ANALYSIS_ARTICLES_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching political analysis articles:", error)
    return []
  }
}

const POLITICAL_ANALYSIS_ARTICLES_LIMITED_QUERY = `*[_type == "article" && category->title == "تحليلات سياسية"] | order(publishedAt desc) [0...6] {
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

export async function getPoliticalAnalysisArticlesLimited(): Promise<Article[]> {
  try {
    const result = await client.fetch<Article[]>(POLITICAL_ANALYSIS_ARTICLES_LIMITED_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching political analysis articles:", error)
    return []
  }
}

export interface ArticleDetail extends Article {
  body: unknown // Portable text content (array of blocks)
  tags?: string[]
}

const POLITICAL_ANALYSIS_ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && category->title == "تحليلات سياسية" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  body,
  tags,
  category-> {
    title,
    slug
  },
  writer-> {
    name,
    slug
  }
}`

export async function getPoliticalAnalysisArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  try {
    // Clean the slug - remove any trailing characters and normalize
    const cleanSlug = slug.trim().replace(/[ىي]$/g, '').replace(/[ىي][ىي]$/g, '')
    console.log("Original slug:", slug)
    console.log("Clean slug:", cleanSlug)
    
    // Try with original slug first
    let result = await client.fetch<ArticleDetail | null>(POLITICAL_ANALYSIS_ARTICLE_BY_SLUG_QUERY, { slug })
    
    // If not found, try with cleaned slug
    if (!result && cleanSlug !== slug) {
      console.log("Trying with cleaned slug:", cleanSlug)
      result = await client.fetch<ArticleDetail | null>(POLITICAL_ANALYSIS_ARTICLE_BY_SLUG_QUERY, { slug: cleanSlug })
    }
    
    console.log("Query result:", result ? "Found" : "Not found")
    
    // Debug: List all slugs for this category
    if (!result) {
      const allSlugs = await client.fetch<Array<{ slug: { current: string }, title: string }>>(
        `*[_type == "article" && category->title == "تحليلات سياسية"] { slug, title }`
      )
      console.log("Available slugs:", allSlugs.map(a => ({ slug: a.slug.current, title: a.title })))
    }
    
    return result || null
  } catch (error) {
    console.error("Error fetching political analysis article:", error)
    return null
  }
}

const ALL_ARTICLES_QUERY = `*[_type == "article" && category->title == "مقالات"] | order(publishedAt desc) {
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

export async function getAllArticles(): Promise<Article[]> {
  try {
    const result = await client.fetch<Article[]>(ALL_ARTICLES_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && category->title == "مقالات" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  body,
  tags,
  category-> {
    title,
    slug
  },
  writer-> {
    name,
    slug
  }
}`

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  try {
    // Clean the slug - remove any trailing characters and normalize
    const cleanSlug = slug.trim().replace(/[ىي]$/g, '').replace(/[ىي][ىي]$/g, '')
    
    // Try with original slug first
    let result = await client.fetch<ArticleDetail | null>(ARTICLE_BY_SLUG_QUERY, { slug })
    
    // If not found, try with cleaned slug
    if (!result && cleanSlug !== slug) {
      result = await client.fetch<ArticleDetail | null>(ARTICLE_BY_SLUG_QUERY, { slug: cleanSlug })
    }
    
    return result || null
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

const BARID_ARTICLES_QUERY = `*[_type == "article" && category->title == "سلة ودك"] | order(publishedAt desc) {
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

export async function getBaridArticles(): Promise<Article[]> {
  try {
    const result = await client.fetch<Article[]>(BARID_ARTICLES_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching barid articles:", error)
    return []
  }
}

const BARID_ARTICLES_LIMITED_QUERY = `*[_type == "article" && category->title == "سلة ودك"] | order(publishedAt desc) [0...3] {
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

export async function getBaridArticlesLimited(): Promise<Article[]> {
  try {
    const result = await client.fetch<Article[]>(BARID_ARTICLES_LIMITED_QUERY)
    return result || []
  } catch (error) {
    console.error("Error fetching barid articles:", error)
    return []
  }
}

const BARID_ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && category->title == "سلة ودك" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  body,
  tags,
  category-> {
    title,
    slug
  },
  writer-> {
    name,
    slug
  }
}`

export async function getBaridArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  try {
    // Clean the slug - remove any trailing characters and normalize
    const cleanSlug = slug.trim().replace(/[ىي]$/g, '').replace(/[ىي][ىي]$/g, '')
    
    // Try with original slug first
    let result = await client.fetch<ArticleDetail | null>(BARID_ARTICLE_BY_SLUG_QUERY, { slug })
    
    // If not found, try with cleaned slug
    if (!result && cleanSlug !== slug) {
      result = await client.fetch<ArticleDetail | null>(BARID_ARTICLE_BY_SLUG_QUERY, { slug: cleanSlug })
    }
    
    return result || null
  } catch (error) {
    console.error("Error fetching barid article:", error)
    return null
  }
}

export interface AboutContent {
  _id: string
  title: string
  mainImage?: SanityImageSource
  content: unknown // Portable text content
  mission?: {
    vision?: string
    mission?: string
  }
  values?: Array<{
    title: string
    description: string
    icon?: string
  }>
  team?: Array<{
    name: string
    role: string
    bio?: string
    image?: SanityImageSource
  }>
}

const ABOUT_QUERY = `*[_type == "about"][0] {
  _id,
  title,
  mainImage,
  content,
  mission,
  values,
  team[] {
    name,
    role,
    bio,
    image
  }
}`

export async function getAbout(): Promise<AboutContent | null> {
  try {
    const result = await client.fetch<AboutContent | null>(ABOUT_QUERY)
    return result || null
  } catch (error) {
    console.error("Error fetching about content:", error)
    return null
  }
}

export interface ContactContent {
  _id: string
  title: string
  description?: string
  email?: string
  phone?: string
  address?: string
  workingHours?: {
    weekdays?: string
    weekend?: string
  }
  social?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  googleMaps?: {
    embedUrl?: string
    link?: string
  }
}

const CONTACT_QUERY = `*[_type == "contact"][0] {
  _id,
  title,
  description,
  email,
  phone,
  address,
  workingHours,
  social,
  googleMaps
}`

export async function getContact(): Promise<ContactContent | null> {
  try {
    const result = await client.fetch<ContactContent | null>(CONTACT_QUERY)
    return result || null
  } catch (error) {
    console.error("Error fetching contact content:", error)
    return null
  }
}

