"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/sanity/lib/image"
import type { Article } from "@/lib/sanity/queries"
import { Clock, User, Mail } from "lucide-react"

interface BaridListProps {
  articles: Article[]
}

export function BaridList({ articles }: BaridListProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Cross Lines Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Diagonal Lines */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.1) 20px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.1) 20px
              )
            `,
          }}
        />
        
        <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white">
              سلة ودك
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              مجموعة مختارة من أهم الأخبار والتقارير والتحديثات
            </p>
          </div>
        </div>
      </section>

      {/* Articles List Section */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">جميع المقالات</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
          </div>

          {/* Articles List */}
          {articles.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/barid/${article.slug.current}`}
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
                            {article.category.title}
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
                لا توجد مقالات في سلة ودك حالياً
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

