"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/sanity/lib/image"
import { client } from "@/sanity/lib/client"
import { useEffect, useState } from "react"
import type { Article } from "@/lib/sanity/queries"
import { Clock, User } from "lucide-react"

interface HeroProps {
  articles?: Article[]
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

export function Hero({ articles: initialArticles }: HeroProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles || [])
  const [loading, setLoading] = useState(!initialArticles)

  useEffect(() => {
    if (!initialArticles) {
      const fetchArticles = async () => {
        try {
          const data = await client.fetch<Article[]>(FEATURED_ARTICLES_QUERY)
          setArticles(data)
        } catch (error) {
          console.error("Error fetching featured articles:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchArticles()
    }
  }, [initialArticles])

  if (loading) {
    return (
      <section className="w-full py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="animate-pulse">
                <div className="aspect-video w-full bg-muted" />
              </Card>
            </div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video w-full bg-muted" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              لا توجد أخبار مميزة حالياً
            </p>
          </div>
        </div>
      </section>
    )
  }

  const [featuredArticle, ...otherArticles] = articles
  const sidebarArticles = otherArticles

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 lg:items-stretch">
          {/* Main Featured Article - Wide Column */}
          {featuredArticle && (
            <div className="lg:col-span-2 flex">
              <Link href={`/article/${featuredArticle.slug.current}`} className="flex-1 flex flex-col w-full">
                <Card className="group flex-1 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-none flex flex-col min-h-full">
                  <div className="relative w-full flex-1 overflow-hidden min-h-[300px] lg:min-h-0">
                    <Image
                      src={urlFor(featuredArticle.mainImage)
                        .width(1200)
                        .height(750)
                        .url()}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Content Overlay with Glassmorphism */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 xl:p-10">
                      <div className="max-w-2xl backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
                          <Badge 
                            variant="secondary" 
                            className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 font-medium text-xs md:text-sm shadow-lg"
                          >
                            {featuredArticle.category.title}
                          </Badge>
                          <div className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-white/95 backdrop-blur-sm">
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{featuredArticle.writer.name}</span>
                          </div>
                          <div className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-white/95 backdrop-blur-sm">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            <span>
                              {new Date(featuredArticle.publishedAt).toLocaleDateString("ar-SA", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-3 leading-tight line-clamp-2 md:line-clamp-3 text-white drop-shadow-lg">
                          {featuredArticle.title}
                        </h1>
                        
                        {featuredArticle.excerpt && (
                          <p className="text-xs md:text-sm lg:text-base text-white/95 line-clamp-2 hidden md:block drop-shadow-md">
                            {featuredArticle.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Sidebar - Scrollable Featured Articles Column */}
          {sidebarArticles.length > 0 && (
            <div className="lg:col-span-1">
              {/* Mobile: Horizontal Scroll */}
              <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                  {sidebarArticles.map((article) => (
                    <Link
                      key={article._id}
                      href={`/article/${article.slug.current}`}
                      className="block w-[280px] flex-shrink-0"
                    >
                      <Card className="group overflow-hidden border-0 transition-all duration-300 cursor-pointer hover:shadow-lg rounded-none h-full">
                        <div className="relative aspect-video w-full overflow-hidden mb-3">
                          <Image
                            src={urlFor(article.mainImage)
                              .width(400)
                              .height(300)
                              .url()}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-3 md:p-4">
                          <Badge 
                            variant="outline" 
                            className="mb-2 text-xs"
                          >
                            {article.category.title}
                          </Badge>
                          <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="truncate">{article.writer.name}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop: Vertical Scrollable Stack */}
              <div className="hidden lg:block overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide space-y-0 pr-2">
                {sidebarArticles.map((article, index) => (
                  <Link
                    key={article._id}
                    href={`/article/${article.slug.current}`}
                    className="block py-1"
                  >
                    <Card className="group overflow-hidden border-0 transition-all duration-300 cursor-pointer hover:shadow-lg rounded-none">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Image */}
                        <div className="relative w-full sm:w-32 sm:flex-shrink-0 aspect-video sm:aspect-square overflow-hidden">
                          <Image
                            src={urlFor(article.mainImage)
                              .width(400)
                              .height(300)
                              .url()}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Content */}
                        <CardContent className="p-3 md:p-4 flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <Badge 
                              variant="outline" 
                              className="mb-2 text-xs"
                            >
                              {article.category.title}
                            </Badge>
                            <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                              {article.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="truncate">{article.writer.name}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(article.publishedAt).toLocaleDateString("ar-SA", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
