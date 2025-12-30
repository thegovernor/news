import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    if (!expectedSecret) {
      return NextResponse.json(
        { message: 'SANITY_REVALIDATE_SECRET is not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, slug } = body

    // Revalidate based on document type
    if (_type === 'article') {
      // Revalidate home page
      revalidatePath('/')
      
      // Revalidate article listing pages
      revalidatePath('/articles')
      revalidatePath('/political-analysis')
      revalidatePath('/barid')
      revalidatePath('/sala-wadk')
      
      // Revalidate specific article page if slug is provided
      if (slug?.current) {
        // Determine which category this article belongs to
        // We'll revalidate all possible paths to be safe
        revalidatePath(`/articles/${slug.current}`)
        revalidatePath(`/political-analysis/${slug.current}`)
        revalidatePath(`/barid/${slug.current}`)
        revalidatePath(`/sala-wadk/${slug.current}`)
      }
    } else if (_type === 'headerMenu' || _type === 'footerMenu') {
      // Revalidate all pages since menus appear on all pages
      revalidatePath('/', 'layout')
    } else if (_type === 'about') {
      revalidatePath('/about')
    } else if (_type === 'contact') {
      revalidatePath('/contact')
    } else if (_type === 'rssFeed' || _type === 'tweet') {
      // Revalidate home page for RSS feeds and tweets
      revalidatePath('/')
    } else {
      // For any other content type, revalidate the home page
      revalidatePath('/')
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type: _type 
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}


