"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail } from "lucide-react"

interface BaridItem {
  _id: string
  title: string
  slug: string
  image: string
  author: string
  publishedAt: string
  excerpt?: string
}

// Dummy data for barid (max 3 items)
const DUMMY_BARID: BaridItem[] = [
  {
    _id: "1",
    title: "سلة ودك: آخر الأخبار والتحديثات من العالم",
    slug: "barid-world-news-updates",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
    author: "أحمد خالد",
    publishedAt: new Date().toISOString(),
    excerpt: "مجموعة من أهم الأخبار والتحديثات من مختلف أنحاء العالم"
  },
  {
    _id: "2",
    title: "سلة ودك: أخبار التكنولوجيا والابتكارات الجديدة",
    slug: "barid-technology-innovations",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    author: "فاطمة علي",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    excerpt: "أحدث التطورات في عالم التكنولوجيا والابتكارات الحديثة"
  },
  {
    _id: "3",
    title: "سلة ودك: تقارير اقتصادية ومالية مهمة",
    slug: "barid-economic-financial-reports",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    author: "محمد سعيد",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    excerpt: "تقارير شاملة عن آخر التطورات الاقتصادية والمالية"
  },
]

interface BaridProps {
  items?: BaridItem[]
  title?: string
}

export function Barid({ 
  items = DUMMY_BARID,
  title = "سلة ودك"
}: BaridProps) {
  // Limit items to max 3
  const displayItems = items.slice(0, 3)

  return (
    <section className="w-full py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayItems.map((item) => (
            <Link
              key={item._id}
              href={`/article/${item.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-primary/20">
                {/* Image Container */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 font-medium text-xs shadow-lg"
                    >
                      سلة ودك
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  {item.excerpt && (
                    <p className="text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}

                  {/* Footer with Author and Date */}
                  <div className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="truncate">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(item.publishedAt).toLocaleDateString("ar-SA", {
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
      </div>
    </section>
  )
}

