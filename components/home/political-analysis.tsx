"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp } from "lucide-react"

interface PoliticalAnalysisItem {
  _id: string
  title: string
  slug: string
  image: string
  author: string
  publishedAt: string
  excerpt?: string
}

// Dummy data for political analysis
const DUMMY_POLITICAL_ANALYSIS: PoliticalAnalysisItem[] = [
  {
    _id: "1",
    title: "التحليل السياسي: مستقبل الشرق الأوسط في ظل التطورات الجديدة",
    slug: "political-analysis-middle-east-future",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop",
    author: "د. أحمد محمد",
    publishedAt: new Date().toISOString(),
    excerpt: "تحليل شامل للتحولات السياسية والاقتصادية في المنطقة"
  },
  {
    _id: "2",
    title: "قراءة في المشهد السياسي: التغييرات الوزارية وآثارها",
    slug: "political-analysis-cabinet-changes",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    author: "محمد علي",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    excerpt: "تحليل عميق للتغييرات الوزارية الأخيرة وتأثيراتها المحتملة"
  },
  {
    _id: "3",
    title: "السياسة الخارجية: تحليل العلاقات الدولية الجديدة",
    slug: "political-analysis-international-relations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    author: "سارة أحمد",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    excerpt: "نظرة شاملة على تطور العلاقات الدولية والتحالفات الإقليمية"
  },
  {
    _id: "4",
    title: "الاقتصاد السياسي: قراءة في السياسات الاقتصادية المعاصرة",
    slug: "political-analysis-economic-policies",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    author: "خالد حسن",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    excerpt: "تحليل السياسات الاقتصادية وآثارها على المجتمع"
  },
  {
    _id: "5",
    title: "الانتخابات والتحول الديمقراطي: قراءة في المشهد السياسي",
    slug: "political-analysis-elections-democracy",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    author: "ليلى محمود",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    excerpt: "تحليل عملية الانتخابات والتحولات الديمقراطية في المنطقة"
  },
  {
    _id: "6",
    title: "السياسة والاجتماع: تأثير الحركات الاجتماعية على المشهد السياسي",
    slug: "political-analysis-social-movements",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    author: "عمر يوسف",
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    excerpt: "دراسة العلاقة بين الحركات الاجتماعية والتغيير السياسي"
  },
]

interface PoliticalAnalysisProps {
  items?: PoliticalAnalysisItem[]
  title?: string
}

export function PoliticalAnalysis({ 
  items = DUMMY_POLITICAL_ANALYSIS,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item) => (
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
                      تحليل سياسي
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
