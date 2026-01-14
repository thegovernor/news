import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

// Category title to path mapping
const CATEGORY_PATH_MAP: Record<string, string> = {
  'مقالات': '/articles',
  'تحليلات سياسية': '/political-analysis',
  'بريد ودك': '/barid',
  'سلة ودك': '/sala-wadk',
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    // Log for debugging (remove in production if needed)
    console.log('[Revalidate] Webhook called at:', new Date().toISOString())
    console.log('[Revalidate] Secret provided:', secret ? 'Yes' : 'No')
    console.log('[Revalidate] Expected secret configured:', expectedSecret ? 'Yes' : 'No')

    if (!expectedSecret) {
      console.error('[Revalidate] SANITY_REVALIDATE_SECRET is not configured')
      return NextResponse.json(
        { message: 'SANITY_REVALIDATE_SECRET is not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      console.error('[Revalidate] Invalid secret provided')
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, _id, slug } = body
    
    console.log('[Revalidate] Document type:', _type)
    console.log('[Revalidate] Document ID:', _id)
    console.log('[Revalidate] Slug:', slug?.current)

    // Revalidate based on document type
    if (_type === 'article') {
      // Revalidate cache tags for articles
      await revalidateTag('articles', 'max')
      await revalidateTag('featured-articles', 'max')
      await revalidateTag('political-analysis', 'max')
      await revalidateTag('barid', 'max')
      await revalidateTag('sala-wadk', 'max')
      
      // Always revalidate home page (shows featured articles)
      // Use 'page' type to ensure full page revalidation
      revalidatePath('/', 'page')
      
      // Always revalidate all article listing pages
      revalidatePath('/articles', 'page')
      revalidatePath('/political-analysis', 'page')
      revalidatePath('/barid', 'page')
      revalidatePath('/sala-wadk', 'page')
      
      // Also revalidate layout in case menus or global content changed
      revalidatePath('/', 'layout')
      
      // Fetch the article's category to determine the correct path
      let categoryPath = null
      if (_id) {
        try {
          const article = await client.fetch<{
            category?: { title?: string } | null
          }>(
            `*[_type == "article" && _id == $id][0] {
              category-> {
                title
              }
            }`,
            { id: _id }
          )
          
          if (article?.category?.title) {
            categoryPath = CATEGORY_PATH_MAP[article.category.title]
          }
        } catch (error) {
          console.error('Error fetching article category:', error)
          // Continue with revalidation even if category fetch fails
        }
      }
      
      // Revalidate specific article page if slug is provided
      if (slug?.current) {
        if (categoryPath) {
          // Revalidate the specific path based on category
          revalidatePath(`${categoryPath}/${slug.current}`, 'page')
        } else {
          // If we couldn't determine the category, revalidate all possible paths
          revalidatePath(`/articles/${slug.current}`, 'page')
          revalidatePath(`/political-analysis/${slug.current}`, 'page')
          revalidatePath(`/barid/${slug.current}`, 'page')
          revalidatePath(`/sala-wadk/${slug.current}`, 'page')
        }
      }
    } else if (_type === 'headerMenu' || _type === 'footerMenu') {
      // Revalidate all pages since menus appear on all pages
      revalidatePath('/', 'layout')
    } else if (_type === 'about') {
      revalidatePath('/about')
    } else if (_type === 'contact') {
      revalidatePath('/contact')
    } else if (_type === 'termsOfUse') {
      revalidatePath('/terms-of-use')
    } else if (_type === 'privacyPolicy') {
      revalidatePath('/privacy-policy')
    } else if (_type === 'rssFeed' || _type === 'tweet') {
      // Revalidate cache tags
      if (_type === 'rssFeed') {
        await revalidateTag('rss-feeds', 'max')
        await revalidateTag('breaking-news', 'max')
      }
      if (_type === 'tweet') {
        await revalidateTag('tweets', 'max')
      }
      // Revalidate home page for RSS feeds and tweets
      revalidatePath('/', 'page')
      revalidatePath('/', 'layout')
    } else {
      // For any other content type, revalidate the home page
      revalidatePath('/', 'page')
      revalidatePath('/', 'layout')
    }

    const response = { 
      revalidated: true, 
      now: Date.now(),
      type: _type,
      message: 'Content revalidated successfully',
      paths: _type === 'article' ? ['/', '/articles', '/political-analysis', '/barid', '/sala-wadk'] : ['/']
    }
    
    console.log('[Revalidate] Success:', JSON.stringify(response, null, 2))
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}




