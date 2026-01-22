"use client"

import { Twitter } from "lucide-react"
import type { Tweet } from "@/lib/sanity/queries"
import { useEffect, useRef, useState } from "react"

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const itemWidth = container.offsetWidth
      const index = Math.round(scrollLeft / itemWidth)
      setCurrentIndex(index)
    }

    container.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [tweets.length])

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    const itemWidth = container.offsetWidth
    container.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    })
  }

  if (tweets.length === 0) {
    return null
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Modern Section Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl backdrop-blur-sm border border-primary/20 shadow-lg">
                <Twitter className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                اسحب لتصفح التغريدات
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-6" />
        </div>

        {/* Modern Scrollable Tweets Container */}
        <div className="relative">
          {/* Scrollable container with native CSS scroll-snap */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-6 pb-4 -mx-4 md:-mx-6 px-4 md:px-6"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {tweets.map((tweet) => {
              const tweetId = extractTweetId(tweet.url)
              return (
                <div
                  key={tweet._id}
                  className="group relative shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] snap-start"
                >
                  {/* Card with modern styling */}
                  <div className="relative h-full rounded-2xl overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative p-4 md:p-6">
                      {tweetId ? (
                        <div className="w-full overflow-hidden rounded-xl bg-background/50">
                          <iframe
                            src={getEmbedUrl(tweet.url)}
                            className="w-full border-0 rounded-xl"
                            style={{ 
                              width: "100%",
                              maxWidth: "100%",
                              border: "none",
                              display: "block",
                              minHeight: "500px",
                              backgroundColor: "transparent"
                            }}
                            title={`Tweet ${tweet._id}`}
                            scrolling="no"
                            frameBorder="0"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full p-8 md:p-12 text-center rounded-xl bg-muted/50 border border-dashed border-muted-foreground/20">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-full bg-muted">
                              <Twitter className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">
                              رابط التغريدة غير صالح
                            </p>
                            <a
                              href={tweet.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 mt-2"
                            >
                              عرض التغريدة على X
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Modern Progress Indicators */}
          {tweets.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {tweets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary shadow-lg shadow-primary/50"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to tweet ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
