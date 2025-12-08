"use client"

import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import type { AboutContent } from "@/lib/sanity/queries"
import { 
  Users, 
  Target, 
  Heart,
  Shield,
  Star,
  Lightbulb,
  Rocket,
  Leaf,
  Handshake,
  Book,
  Scale,
  Globe,
  Trophy,
  Eye,
  Award,
  Sparkles,
  UserCircle,
  TrendingUp,
  Gem,
  Zap
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AboutContentProps {
  about: AboutContent
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Users,
  Heart,
  Shield,
  Star,
  Lightbulb,
  Rocket,
  Leaf,
  Handshake,
  Book,
  Scale,
  Globe,
  Trophy,
  Eye,
  Award,
  Sparkles,
  UserCircle,
  TrendingUp,
  Gem,
  Zap,
}

// Portable Text components for rendering
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || "About image"}
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
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-lg md:text-xl font-bold mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-base md:text-lg leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-r-4 border-primary pr-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
  },
}

export function AboutContent({ about }: AboutContentProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      {about.mainImage && (
        <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden">
          <Image
            src={urlFor(about.mainImage).width(1920).height(1080).url()}
            alt={about.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              {about.title}
            </h1>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
        {!about.mainImage && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
            {about.title}
          </h1>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
          {about.content && <PortableText value={about.content} components={portableTextComponents} />}
        </div>

        {/* Mission & Vision */}
        {about.mission && (about.mission.vision || about.mission.mission) && (
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">رؤيتنا ورسالتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.mission.vision && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-bold">الرؤية</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{about.mission.vision}</p>
                  </CardContent>
                </Card>
              )}
              {about.mission.mission && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-bold">الرسالة</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{about.mission.mission}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Values */}
        {about.values && about.values.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.values.map((value, index) => {
                const IconComponent = value.icon && iconMap[value.icon] ? iconMap[value.icon] : Heart
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold">{value.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* Team */}
        {about.team && about.team.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">فريقنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    {member.image && (
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(member.image).width(256).height(256).url()}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

