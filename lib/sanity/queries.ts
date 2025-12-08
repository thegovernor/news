import { client } from "@/sanity/lib/client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Parser from "rss-parser"

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

const RSS_FEEDS_QUERY = `*[_type == "rssFeed" && isActive == true] {
  _id,
  title,
  url,
  itemLimit,
  linkPattern,
  updateInterval
}`

export interface RSSFeedConfig {
  _id: string
  title: string
  url: string
  itemLimit?: number
  linkPattern?: string
  updateInterval?: number
}

export interface BreakingNews {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt?: string
  source?: string
  link?: string // Original RSS item link
  isRSS?: boolean // Flag to indicate if this is from RSS
}

const parser = new Parser({
  customFields: {
    item: ['link', 'guid'],
  },
})

async function parseRSSFeed(feedConfig: RSSFeedConfig): Promise<BreakingNews[]> {
  try {
    const feed = await parser.parseURL(feedConfig.url)
    const limit = feedConfig.itemLimit || 10
    
    if (!feed.items || feed.items.length === 0) {
      return []
    }

    return feed.items.slice(0, limit).map((item, index) => {
      // Extract slug from link or generate one
      let slug = item.link || item.guid || ''
      
      // If linkPattern is provided, try to extract slug from it
      // Otherwise, try to extract from URL or use a generated one
      if (feedConfig.linkPattern && slug) {
        // If pattern has {link}, we'll use the full link
        // Otherwise, try to extract slug from URL
        const urlMatch = slug.match(/\/([^\/]+)\/?$/)
        if (urlMatch) {
          slug = urlMatch[1]
        }
      } else if (slug) {
        // Extract slug from URL
        const urlMatch = slug.match(/\/([^\/]+)\/?$/)
        if (urlMatch) {
          slug = urlMatch[1]
        } else {
          // Fallback: generate slug from title
          slug = item.title
            ?.toLowerCase()
            .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
            .replace(/^-+|-+$/g, '') || `item-${index}`
        }
      } else {
        // Generate slug from title
        slug = item.title
          ?.toLowerCase()
          .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
          .replace(/^-+|-+$/g, '') || `item-${index}`
      }

      return {
        _id: `rss-${feedConfig._id}-${index}`,
        title: item.title || 'بدون عنوان',
        slug: {
          current: slug,
        },
        publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
        source: feedConfig.title,
        link: item.link || item.guid || '',
        isRSS: true,
      }
    })
  } catch (error) {
    console.error(`Error parsing RSS feed ${feedConfig.url}:`, error)
    return []
  }
}

export async function getBreakingNews(): Promise<BreakingNews[]> {
  try {
    // Fetch active RSS feed configurations
    const feedConfigs = await client.fetch<RSSFeedConfig[]>(RSS_FEEDS_QUERY)
    
    if (!feedConfigs || feedConfigs.length === 0) {
      return []
    }

    // Parse all RSS feeds in parallel
    const allFeeds = await Promise.all(
      feedConfigs.map(config => parseRSSFeed(config))
    )

    // Flatten and combine all items
    const allItems = allFeeds.flat()

    // Sort by publishedAt (most recent first) and return
    return allItems.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error("Error fetching breaking news from RSS:", error)
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

export interface MenuItem {
  title: string
  href: string
  order?: number
  isExternal?: boolean
}

export interface MenuLogo {
  image?: SanityImageSource
  text?: string
  href?: string
}

export interface HeaderMenu {
  _id: string
  title: string
  logo?: MenuLogo
  items: MenuItem[]
}

export interface FooterSectionItem {
  title: string
  href: string
  isExternal?: boolean
}

export interface FooterSection {
  title: string
  items: FooterSectionItem[]
}

export interface FooterMenu {
  _id: string
  title: string
  logo?: MenuLogo
  sections?: FooterSection[]
  copyright?: string
}

const HEADER_MENU_QUERY = `*[_type == "headerMenu"][0] {
  _id,
  title,
  logo {
    image,
    text,
    href
  },
  items[] | order(order asc) {
    title,
    href,
    order,
    isExternal
  }
}`

export async function getHeaderMenu(): Promise<HeaderMenu | null> {
  try {
    const result = await client.fetch<HeaderMenu | null>(HEADER_MENU_QUERY)
    return result || null
  } catch (error) {
    console.error("Error fetching header menu:", error)
    return null
  }
}

const FOOTER_MENU_QUERY = `*[_type == "footerMenu"][0] {
  _id,
  title,
  logo {
    image,
    text,
    href
  },
  sections[] {
    title,
    items[] {
      title,
      href,
      isExternal
    }
  },
  copyright
}`

export async function getFooterMenu(): Promise<FooterMenu | null> {
  try {
    const result = await client.fetch<FooterMenu | null>(FOOTER_MENU_QUERY)
    return result || null
  } catch (error) {
    console.error("Error fetching footer menu:", error)
    return null
  }
}

