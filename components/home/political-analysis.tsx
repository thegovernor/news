import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/sanity/lib/image"
import type { Article } from "@/lib/sanity/queries"
import { Clock, TrendingUp, User } from "lucide-react"
import { getCategoryString } from "@/lib/utils/article"

interface PoliticalAnalysisProps {
  articles?: Article[]
  title?: string
}

export function PoliticalAnalysis({ 
  articles = [],
  title = "التحليل السياسي"
}: PoliticalAnalysisProps) {
  return (
    <section className="w-full py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Grid of Articles */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/political-analysis/${article.slug.current}`}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-primary/20">
                  {/* Image Container */}
                  <div className="relative w-full aspect-video overflow-hidden bg-muted">
                    {article.mainImage ? (
                      <Image
                        src={urlFor(article.mainImage)
                          .width(800)
                          .height(600)
                          .url()}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <TrendingUp className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
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
                  <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
                    <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Footer with Author and Date */}
                    <div className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="w-3 h-3" />
                        <span className="truncate">{article.writer.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
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
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              لا توجد تحليلات سياسية حالياً
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
