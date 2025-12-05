"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}

export interface HeaderProps {
  categories?: Category[]
}

// Dummy categories data
const dummyCategories: Category[] = [
  {
    _id: "1",
    title: "السياسة",
    slug: { current: "politics" },
  },
  {
    _id: "2",
    title: "الرياضة",
    slug: { current: "sports" },
  },
  {
    _id: "3",
    title: "التكنولوجيا",
    slug: { current: "technology" },
  },
  {
    _id: "4",
    title: "الاقتصاد",
    slug: { current: "economy" },
  },
  {
    _id: "5",
    title: "الثقافة",
    slug: { current: "culture" },
  },
]

export function Header({ categories }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const displayCategories = categories || dummyCategories

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <span className="text-xl font-bold">أخبار</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              الرئيسية
            </Link>
            {displayCategories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category.title}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    الرئيسية
                  </Link>
                  {displayCategories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug.current}`}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.title}
                    </Link>
                  ))}
                  
                  {/* Mobile Search */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        type="search"
                        placeholder="بحث..."
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

