"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

// Section menu items from page.tsx
const sectionMenuItems = [
  { id: "hero", title: "الرئيسية", href: "/#hero" },
  { id: "political-analysis", title: "التحليل السياسي", href: "/political-analysis" },
  { id: "articles", title: "المقالات", href: "/articles" },
  { id: "barid", title: "سلة ودك", href: "/barid" },
]

// Additional menu items
const additionalMenuItems = [
  { id: "about", title: "من نحن", href: "/about" },
  { id: "contact", title: "اتصل بنا", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

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
            {sectionMenuItems.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {section.title}
              </Link>
            ))}
            {additionalMenuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.title}
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
                  {sectionMenuItems.map((section) => (
                    <Link
                      key={section.id}
                      href={section.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {section.title}
                    </Link>
                  ))}
                  {additionalMenuItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
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

