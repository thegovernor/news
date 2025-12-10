"use client"

import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import type { ArticleDetail } from "@/lib/sanity/queries"
import { Clock, User, Mail, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getCategoryString } from "@/lib/utils/article"

interface BaridDetailProps {
  article: ArticleDetail
}

// Type for Portable Text image value
interface PortableTextImageValue {
  asset?: {
    _ref?: string
  }
  alt?: string
}

// Portable Text components for rendering
const portableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImageValue }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || "Article image"}
            width={1200}
            height={800}
            className="rounded-lg w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground mt-2 text-center">{value.alt}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg md:text-xl font-bold mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base md:text-lg leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-r-4 border-primary pr-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
      if (!value?.href) {
        return <>{children}</>
      }
      return (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

export function BaridDetail({ article }: BaridDetailProps) {
  return (
    <article className="w-full">
      {/* Article Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
        {/* Hero Image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] mb-8 md:mb-12 rounded-lg overflow-hidden">
          <Image
            src={urlFor(article.mainImage).width(1920).height(1080).url()}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {getCategoryString(article.category)}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{article.writer.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {article.body && <PortableText value={article.body} components={portableTextComponents} />}
        </div>

        {/* Back to List */}
        <div className="mt-12 pt-8 border-t">
          <Link
            href="/barid"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowRight className="w-4 h-4" />
            العودة إلى قائمة سلة ودك
          </Link>
        </div>
      </div>
    </article>
  )
}

