"use client"

import { Card } from "@/components/ui/card"
import { Twitter } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Tweet } from "@/lib/sanity/queries"

interface TweetsProps {
  tweets?: Tweet[]
  title?: string
}

// Extract tweet ID from Twitter/X URL
function extractTweetId(url: string): string | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/)
  return match ? match[1] : null
}

// Generate Twitter embed URL for iframe
function getEmbedUrl(url: string): string {
  const tweetId = extractTweetId(url)
  if (tweetId) {
    return `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=light`
  }
  return url
}

export function Tweets({ tweets = [], title = "من X" }: TweetsProps) {
  if (tweets.length === 0) {
    return null
  }

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Twitter className="w-5 h-5 md:w-6 md:h-6 text-primary fill-current" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Tweets Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: tweets.length > 3,
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {tweets.map((tweet) => {
                const tweetId = extractTweetId(tweet.url)
                return (
                  <CarouselItem key={tweet._id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-visible border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card hover:border-primary/20 w-full">
                      <div className="w-full p-4">
                        {/* Twitter Embed Iframe */}
                        {tweetId ? (
                          <div className="w-full overflow-hidden rounded-lg">
                            <iframe
                              src={getEmbedUrl(tweet.url)}
                              className="w-full border-0"
                              style={{ 
                                width: "100%",
                                maxWidth: "100%",
                                border: "none",
                                display: "block",
                                minHeight: "500px"
                              }}
                              title={`Tweet ${tweet._id}`}
                              scrolling="no"
                              allowTransparency={true}
                              frameBorder="0"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-full p-4 text-center text-muted-foreground">
                            <p className="text-sm">رابط التغريدة غير صالح</p>
                            <a
                              href={tweet.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline mt-2 block"
                            >
                              عرض التغريدة على X
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            {/* Mobile Navigation - Visible on mobile, positioned inside */}
            <CarouselPrevious className="md:hidden left-2 top-1/2 -translate-y-1/2 h-10 w-10 z-10 bg-background/80 backdrop-blur-sm border-2 shadow-lg" />
            <CarouselNext className="md:hidden right-2 top-1/2 -translate-y-1/2 h-10 w-10 z-10 bg-background/80 backdrop-blur-sm border-2 shadow-lg" />
            {/* Desktop Navigation - Positioned outside */}
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}