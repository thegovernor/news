"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/sanity/lib/image"
import type { Article, Category } from "@/lib/sanity/queries"
import { Clock, User, TrendingUp } from "lucide-react"
import { getCategoryString } from "@/lib/utils/article"

interface PoliticalAnalysisArticlesListProps {
  articles: Article[]
  category?: Category | null
}

export function PoliticalAnalysisArticlesList({ articles, category }: PoliticalAnalysisArticlesListProps) {
  return (
    <>
      {/* Hero Section */}
      {category?.image ? (
        <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden">
          <Image
            src={urlFor(category.image).width(1920).height(1080).url()}
            alt={category.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-center relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white drop-shadow-lg">
                {category.title}
              </h1>
              {category.description && (
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-gradient-to-br from-primary/90 via-primary/95 to-primary overflow-hidden">
          {/* Kuwait flag colors overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#007A3D]/20 via-transparent to-[#CE1126]/20"></div>
          
          {/* Geometric Square Pattern */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Decorative Squares */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rotate-45"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-12"></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-white/20 -rotate-45"></div>
            <div className="absolute bottom-20 right-1/3 w-28 h-28 border-2 border-white/20 rotate-12"></div>
            <div className="absolute top-1/3 left-1/3 w-16 h-16 border-2 border-white/20"></div>
          </div>
          
          {/* Subtle Grid Dots */}
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          
          <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-center relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white drop-shadow-lg">
                {category?.title || "تحليلات سياسية"}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                {category?.description || "تحليلات شاملة ومتعمقة للأحداث السياسية المحلية والإقليمية والدولية"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Articles List Section */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">جميع التحليلات</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
          </div>

          {/* Articles List */}
          {articles.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/political-analysis/${article.slug.current}`}
                  className="block group"
                >
                  <Card className="overflow-hidden border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Image */}
                      <div className="relative w-full md:w-64 lg:w-80 flex-shrink-0 aspect-video md:aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={urlFor(article.mainImage)
                            .width(800)
                            .height(600)
                            .url()}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 256px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge 
                            variant="secondary" 
                            className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 font-medium text-xs shadow-lg"
                          >
                            {getCategoryString(article.category)}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {article.title}
                          </h3>
                          
                          {article.excerpt && (
                            <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 overflow-hidden">
                              {article.excerpt}
                            </p>
                          )}
                        </div>

                        {/* Footer with Author and Date */}
                        <div className="flex items-center justify-between gap-4 pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span className="truncate">{article.writer.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(article.publishedAt).toLocaleDateString("ar-SA", {
                                year: "numeric",
                                month: "long",
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
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                لا توجد مقالات في تحليلات سياسية حالياً
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

