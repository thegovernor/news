"use client"

import * as React from "react"
import Link from "next/link"
import { X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface BreakingNewsItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  link?: string // Original RSS item link
  isRSS?: boolean // Flag to indicate if this is from RSS
}

export interface BreakingNewsRibbonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: BreakingNewsItem[]
  dismissible?: boolean
  variant?: "default" | "urgent"
  rotationInterval?: number
}

export function BreakingNewsRibbon({
  items,
  dismissible = false,
  variant = "default",
  rotationInterval = 5000,
  className,
  ...props
}: BreakingNewsRibbonProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    if (items.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
        setIsTransitioning(false)
      }, 300) // Half of transition duration
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [items.length, rotationInterval])

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 transition-opacity duration-300",
        isTransitioning ? "opacity-0" : "opacity-100",
        "hover:opacity-90"
      )}
    >
      <Badge
        variant="destructive"
        className={cn(
          "flex items-center gap-1.5 shrink-0 font-bold text-xs md:text-sm px-2 md:px-3 py-1",
          variant === "urgent" && "animate-pulse"
        )}
      >
        <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
        <span>عاجل</span>
      </Badge>
      <span className="text-sm md:text-base font-semibold">
        {currentItem.title}
      </span>
    </div>
  )

  return (
    <div
      className={cn(
        "relative w-full bg-linear-to-r from-red-600 via-red-500 to-red-600 dark:from-red-700 dark:via-red-600 dark:to-red-700 text-white overflow-hidden",
        "border-b border-red-700 dark:border-red-800",
        "shadow-lg",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-2 md:py-3 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          {/* Breaking News Content */}
          <div className="flex-1">
            {currentItem.isRSS && currentItem.link ? (
              <a 
                href={currentItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <Link 
                href={`/article/${currentItem.slug.current}`} 
                className="block"
              >
                {content}
              </Link>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-6 w-6 md:h-7 md:w-7 text-white hover:bg-white/20 hover:text-white rounded-full"
              onClick={() => {
                // Handle dismiss if needed in the future
              }}
              aria-label="Dismiss breaking news"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Animated gradient overlay for urgency effect */}
      {variant === "urgent" && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
      )}
    </div>
  )
}

