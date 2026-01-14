"use client"

import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import type { TermsOfUseContent } from "@/lib/sanity/queries"
import { FileText, Calendar } from "lucide-react"

interface TermsOfUseContentProps {
  termsOfUse: TermsOfUseContent
}

// Portable Text components for rendering
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || "Terms of use image"}
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

export function TermsOfUseContent({ termsOfUse }: TermsOfUseContentProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      {termsOfUse.mainImage && (
        <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden">
          <Image
            src={urlFor(termsOfUse.mainImage).width(1920).height(1080).url()}
            alt={termsOfUse.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg">
                  <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 drop-shadow-lg">
                {termsOfUse.title}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
        {!termsOfUse.mainImage && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {termsOfUse.title}
            </h1>
          </div>
        )}

        {/* Last Updated */}
        {termsOfUse.lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-4 border-b">
            <Calendar className="w-4 h-4" />
            <span>
              آخر تحديث:{" "}
              {new Date(termsOfUse.lastUpdated).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {termsOfUse.content && (
            <PortableText value={termsOfUse.content} components={portableTextComponents} />
          )}
        </div>
      </div>
    </div>
  )
}
